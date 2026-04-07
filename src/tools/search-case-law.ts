import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface SearchCaseLawInput {
  query: string;
  court?: string;
  min_importance?: number;
  limit?: number;
}

export function searchCaseLaw(db: Database.Database, input: SearchCaseLawInput) {
  const limit = Math.min(input.limit ?? 10, 50);
  const minImportance = input.min_importance ?? 1;

  let sql = `
    SELECT cl.*
    FROM case_law_fts fts
    JOIN case_law cl ON cl.id = fts.rowid
    WHERE case_law_fts MATCH ?
      AND cl.importance_score >= ?
  `;
  const params: (string | number)[] = [input.query, minImportance];

  if (input.court) {
    sql += ` AND cl.court = ?`;
    params.push(input.court);
  }

  sql += ` ORDER BY rank LIMIT ?`;
  params.push(limit);

  const rows = db.prepare(sql).all(...params) as any[];

  const results = rows.map((r) => ({
    ...r,
    _citation: buildCitation(
      r.case_number,
      `Case ${r.case_number} ${r.case_name || ''}`.trim(),
      'get_case_law',
      { case_number: r.case_number },
      undefined,
      r.ecli ? [r.ecli] : undefined,
    ),
  }));

  return {
    query: input.query,
    count: results.length,
    results,
    _meta: {
      disclaimer: 'Case law summaries are editorial. Verify full judgments on curia.europa.eu. Not legal advice.',
    },
  };
}
