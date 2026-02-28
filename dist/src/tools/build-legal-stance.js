export function buildLegalStance(db, input) {
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
    return {
        query: input.query,
        legislation: {
            count: articles.length,
            provisions: articles,
        },
        case_law: {
            count: cases.length,
            cases,
        },
        _meta: {
            disclaimer: 'EU law data compiled from EUR-Lex and CJEU public sources. Case law summaries are editorial. Verify against official sources. Not legal advice.',
        },
    };
}
