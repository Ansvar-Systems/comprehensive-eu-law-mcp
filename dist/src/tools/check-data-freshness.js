export function checkDataFreshness(db) {
    const metadata = Object.fromEntries(db.prepare('SELECT key, value FROM db_metadata').all().map((r) => [r.key, r.value]));
    const actCount = db.prepare('SELECT COUNT(*) as c FROM eu_acts').get().c;
    const articleCount = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
    const caseCount = db.prepare('SELECT COUNT(*) as c FROM case_law').get().c;
    const transpositionCount = db.prepare('SELECT COUNT(*) as c FROM transposition_status').get().c;
    return {
        build_date: metadata['build_date'] || 'unknown',
        schema_version: metadata['schema_version'] || 'unknown',
        tier: metadata['tier'] || 'free',
        record_counts: {
            acts: actCount,
            articles: articleCount,
            cases: caseCount,
            transposition_records: transpositionCount,
            total: actCount + articleCount + caseCount + transpositionCount,
        },
        _meta: {
            disclaimer: 'EU law data compiled from EUR-Lex. Verify against EUR-Lex for binding text. Not legal advice.',
        },
    };
}
