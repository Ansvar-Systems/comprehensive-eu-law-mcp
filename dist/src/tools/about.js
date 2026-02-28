export function about(db) {
    const metadata = Object.fromEntries(db.prepare('SELECT key, value FROM db_metadata').all().map((r) => [r.key, r.value]));
    const actCount = db.prepare('SELECT COUNT(*) as c FROM eu_acts').get().c;
    const articleCount = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
    const caseCount = db.prepare('SELECT COUNT(*) as c FROM case_law').get().c;
    return {
        server: 'comprehensive-eu-law-mcp',
        version: '0.1.0',
        description: 'Comprehensive EU Law MCP covering EU treaties, regulations, directives, and CJEU case law.',
        coverage: {
            treaties: 'TEU, TFEU, Charter of Fundamental Rights',
            regulations: '30+ key regulations (GDPR, AI Act, DORA, DMA, DSA, MiCA, etc.)',
            directives: '20+ key directives (NIS 2, CSRD, PSD2, etc.)',
            case_law: `${caseCount} CJEU landmark cases`,
            total_acts: actCount,
            total_articles: articleCount,
        },
        data_source: 'Ansvar Comprehensive EU Law Database (Phase 1)',
        freshness: metadata['build_date'] || 'unknown',
        _meta: {
            disclaimer: 'EU law data is compiled from EUR-Lex and CJEU public sources. Treaty texts and regulations are official EU documents. Case law summaries are editorial. Verify against EUR-Lex for binding text. Not legal advice.',
            data_source: 'Ansvar Comprehensive EU Law Database (Phase 1)',
            freshness: metadata['build_date'] || 'unknown',
        },
    };
}
