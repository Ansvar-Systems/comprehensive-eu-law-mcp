import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface BuildLegalStanceInput {
  query: string;
  limit?: number;
}

export function buildLegalStance(db: Database.Database, input: BuildLegalStanceInput) {
  const limit = Math.min(input.limit ?? 5, 20);

  // Search articles
  const articles = db.prepare(`
    SELECT a.article_number, a.title, a.content, a.part, a.chapter,
           ea.short_title, ea.title as act_title, ea.act_type, ea.celex_number
    FROM articles_fts fts
    JOIN articles a ON a.id = fts.rowid
    JOIN eu_acts ea ON ea.id = a.act_id
    WHERE articles_fts MATCH ?
    ORDER BY rank
    LIMIT ?
  `).all(input.query, limit);

  // Search case law
  const cases = db.prepare(`
    SELECT cl.case_number, cl.ecli, cl.case_name, cl.court, cl.judgment_date,
           cl.subject_matter, cl.headnotes, cl.ruling_summary, cl.importance_score
    FROM case_law_fts fts
    JOIN case_law cl ON cl.id = fts.rowid
    WHERE case_law_fts MATCH ?
    ORDER BY rank
    LIMIT ?
  `).all(input.query, limit);

  const citedArticles = (articles as any[]).map((a) => ({
    ...a,
    _citation: buildCitation(
      `${a.short_title || a.celex_number} Article ${a.article_number}`,
      `Article ${a.article_number} ${a.short_title || a.act_title}`,
      'get_article',
      { act: a.short_title || a.celex_number, article: a.article_number },
    ),
  }));

  const citedCases = (cases as any[]).map((c) => ({
    ...c,
    _citation: buildCitation(
      c.case_number,
      `Case ${c.case_number} ${c.case_name || ''}`.trim(),
      'get_case_law',
      { case_number: c.case_number },
      undefined,
      c.ecli ? [c.ecli] : undefined,
    ),
  }));

  return {
    query: input.query,
    legislation: {
      count: citedArticles.length,
      provisions: citedArticles,
    },
    case_law: {
      count: citedCases.length,
      cases: citedCases,
    },
    _meta: {
      disclaimer: 'EU law data compiled from EUR-Lex and CJEU public sources. Case law summaries are editorial. Verify against official sources. Not legal advice.',
    },
  };
}
