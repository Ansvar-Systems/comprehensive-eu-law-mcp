export function listSources(db) {
    const actsByType = db.prepare(`
    SELECT act_type, COUNT(*) as count FROM eu_acts GROUP BY act_type ORDER BY act_type
  `).all();
    const articleCount = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
    const caseCount = db.prepare('SELECT COUNT(*) as c FROM case_law').get().c;
    const transpositionCount = db.prepare('SELECT COUNT(*) as c FROM transposition_status').get().c;
    const metadata = db.prepare('SELECT * FROM db_metadata').all();
    const acts = db.prepare(`
    SELECT id, title, short_title, act_type, celex_number,
           (SELECT COUNT(*) FROM articles WHERE act_id = eu_acts.id) as article_count
    FROM eu_acts ORDER BY act_type, short_title
  `).all();
    return {
        acts_by_type: actsByType,
        totals: {
            acts: acts.length,
            articles: articleCount,
            cases: caseCount,
            transposition_records: transpositionCount,
        },
        acts,
        metadata,
    };
}
