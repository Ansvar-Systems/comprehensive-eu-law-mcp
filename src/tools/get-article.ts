import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface GetArticleInput {
  act: string;
  article: string;
}

export function getArticle(db: Database.Database, input: GetArticleInput) {
  // Find the act by short_title, title, or celex_number (case-insensitive)
  const act = db.prepare(`
    SELECT * FROM eu_acts
    WHERE LOWER(short_title) = LOWER(?)
       OR LOWER(title) = LOWER(?)
       OR LOWER(celex_number) = LOWER(?)
    LIMIT 1
  `).get(input.act, input.act, input.act) as any;

  if (!act) {
    throw new Error(`Act not found: "${input.act}". Try a short title like "GDPR", "TEU", "TFEU", or a CELEX number.`);
  }

  // Find the article
  const article = db.prepare(`
    SELECT * FROM articles
    WHERE act_id = ? AND (article_number = ? OR article_number = ?)
  `).get(act.id, input.article, `Article ${input.article}`) as any;

  if (!article) {
    // List available articles for guidance
    const available = db.prepare(`
      SELECT article_number FROM articles WHERE act_id = ? ORDER BY id LIMIT 20
    `).all(act.id) as any[];

    throw new Error(
      `Article ${input.article} not found in ${act.short_title || act.title}. ` +
      `Available articles include: ${available.map((a: any) => a.article_number).join(', ')}...`
    );
  }

  return {
    act: {
      id: act.id,
      title: act.title,
      short_title: act.short_title,
      celex_number: act.celex_number,
      act_type: act.act_type,
    },
    article: {
      article_number: article.article_number,
      title: article.title,
      content: article.content,
      part: article.part,
      chapter: article.chapter,
      section: article.section,
    },
    _citation: buildCitation(
      `${act.short_title || act.celex_number} Article ${article.article_number}`,
      `Article ${article.article_number} ${act.short_title || act.title}`,
      'get_article',
      { act: input.act, article: input.article },
      act.url,
      act.short_title ? [act.celex_number, act.title].filter(Boolean) : undefined,
    ),
    _meta: {
      disclaimer: 'EU law data compiled from EUR-Lex. Verify against EUR-Lex for binding text. Not legal advice.',
    },
  };
}
