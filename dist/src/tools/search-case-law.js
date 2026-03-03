export function searchCaseLaw(db, input) {
    const metadata = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get();
    const limit = Math.min(input.limit ?? 10, 50);
    const minImportance = input.min_importance ?? 1;
    let sql = `
    SELECT cl.*
    FROM case_law_fts fts
    JOIN case_law cl ON cl.id = fts.rowid
    WHERE case_law_fts MATCH ?
      AND cl.importance_score >= ?
  `;
    const params = [input.query, minImportance];
    if (input.court) {
        sql += ` AND cl.court = ?`;
        params.push(input.court);
    }
    sql += ` ORDER BY rank LIMIT ?`;
    params.push(limit);
    const results = db.prepare(sql).all(...params);
    return {
        query: input.query,
        count: results.length,
        results,
        _meta: {
            disclaimer: 'Case law summaries are editorial. Verify full judgments on curia.europa.eu. Not legal advice.',
            data_source: 'Ansvar Comprehensive EU Law Database',
            data_age: metadata?.value ?? 'unknown',
        },
    };
}
