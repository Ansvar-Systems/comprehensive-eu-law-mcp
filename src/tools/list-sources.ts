import type Database from 'better-sqlite3';

export function listSources(db: Database.Database) {
  const actsByType = db.prepare(`
    SELECT act_type, COUNT(*) as count FROM eu_acts GROUP BY act_type ORDER BY act_type
  `).all();

  const articleCount = (db.prepare('SELECT COUNT(*) as c FROM articles').get() as any).c;
  const caseCount = (db.prepare('SELECT COUNT(*) as c FROM case_law').get() as any).c;
  const transpositionCount = (db.prepare('SELECT COUNT(*) as c FROM transposition_status').get() as any).c;

  const metadata = db.prepare('SELECT * FROM db_metadata').all();

  const acts = db.prepare(`
    SELECT id, title, short_title, act_type, celex_number,
           (SELECT COUNT(*) FROM articles WHERE act_id = eu_acts.id) as article_count
    FROM eu_acts ORDER BY act_type, short_title
  `).all();

  const buildDate = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as any;

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
    _meta: {
      disclaimer: 'EU law data compiled from EUR-Lex. Verify against EUR-Lex for binding text. Not legal advice.',
      data_source: 'Ansvar Comprehensive EU Law Database',
      data_age: buildDate?.value ?? 'unknown',
    },
  };
}
