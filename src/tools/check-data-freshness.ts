import type Database from 'better-sqlite3';

export function checkDataFreshness(db: Database.Database) {
  const metadata = Object.fromEntries(
    (db.prepare('SELECT key, value FROM db_metadata').all() as any[]).map(
      (r) => [r.key, r.value]
    )
  );

  const actCount = (db.prepare('SELECT COUNT(*) as c FROM eu_acts').get() as any).c;
  const articleCount = (db.prepare('SELECT COUNT(*) as c FROM articles').get() as any).c;
  const caseCount = (db.prepare('SELECT COUNT(*) as c FROM case_law').get() as any).c;
  const transpositionCount = (db.prepare('SELECT COUNT(*) as c FROM transposition_status').get() as any).c;

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
      data_source: 'Ansvar Comprehensive EU Law Database',
      data_age: metadata['build_date'] ?? 'unknown',
    },
  };
}
