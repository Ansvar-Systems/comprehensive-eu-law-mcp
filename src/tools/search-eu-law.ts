import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface SearchEuLawInput {
  query: string;
  act_type?: string;
  act_id?: number;
  limit?: number;
}

export function searchEuLaw(db: Database.Database, input: SearchEuLawInput) {
  const limit = Math.min(input.limit ?? 10, 50);

  let sql = `
    SELECT a.id, a.article_number, a.title, a.content, a.part, a.chapter, a.section,
           ea.id as act_id, ea.short_title, ea.title as act_title, ea.act_type, ea.celex_number
    FROM articles_fts fts
    JOIN articles a ON a.id = fts.rowid
    JOIN eu_acts ea ON ea.id = a.act_id
    WHERE articles_fts MATCH ?
  `;
  const params: (string | number)[] = [input.query];

  if (input.act_type) {
    sql += ` AND ea.act_type = ?`;
    params.push(input.act_type);
  }

  if (input.act_id) {
    sql += ` AND ea.id = ?`;
    params.push(input.act_id);
  }

  sql += ` ORDER BY rank LIMIT ?`;
  params.push(limit);

  const rows = db.prepare(sql).all(...params) as any[];

  const results = rows.map((r) => ({
    ...r,
    _citation: buildCitation(
      `${r.short_title || r.celex_number} Article ${r.article_number}`,
      `Article ${r.article_number} ${r.short_title || r.act_title}`,
      'get_article',
      { act: r.short_title || r.celex_number, article: r.article_number },
    ),
  }));

  return {
    query: input.query,
    count: results.length,
    results,
    _meta: {
      disclaimer: 'EU law data compiled from EUR-Lex. Verify against EUR-Lex for binding text. Not legal advice.',
    },
  };
}
