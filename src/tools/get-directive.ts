import type Database from 'better-sqlite3';

interface GetDirectiveInput {
  identifier: string;
}

export function getDirective(db: Database.Database, input: GetDirectiveInput) {
  const metadata = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as any;
  const act = db.prepare(`
    SELECT * FROM eu_acts
    WHERE (LOWER(short_title) = LOWER(?) OR LOWER(title) LIKE LOWER(?) OR LOWER(celex_number) = LOWER(?))
      AND act_type = 'directive'
    LIMIT 1
  `).get(input.identifier, `%${input.identifier}%`, input.identifier) as any;

  if (!act) {
    const candidates = db.prepare(`
      SELECT short_title, celex_number FROM eu_acts WHERE act_type = 'directive' ORDER BY short_title
    `).all() as any[];
    throw new Error(
      `Directive not found: "${input.identifier}". Available directives: ${candidates.map((c: any) => c.short_title || c.celex_number).join(', ')}`
    );
  }

  const articleCount = (db.prepare(
    'SELECT COUNT(*) as c FROM articles WHERE act_id = ?'
  ).get(act.id) as any).c;

  const transposition = db.prepare(`
    SELECT member_state, status, national_measure, notification_date, notes
    FROM transposition_status
    WHERE directive_id = ?
    ORDER BY member_state
  `).all(act.id);

  const transpositionSummary = {
    transposed: transposition.filter((t: any) => t.status === 'transposed').length,
    partial: transposition.filter((t: any) => t.status === 'partial').length,
    not_transposed: transposition.filter((t: any) => t.status === 'not_transposed').length,
    infringement: transposition.filter((t: any) => t.status === 'infringement').length,
    total: transposition.length,
  };

  return {
    directive: {
      id: act.id,
      title: act.title,
      short_title: act.short_title,
      celex_number: act.celex_number,
      official_journal_ref: act.official_journal_ref,
      adoption_date: act.adoption_date,
      entry_into_force_date: act.entry_into_force_date,
      status: act.status,
      subject_matter: act.subject_matter,
      legal_basis: act.legal_basis,
      url: act.url,
    },
    article_count: articleCount,
    transposition_summary: transpositionSummary,
    transposition_details: transposition,
    _meta: {
      disclaimer: 'EU law data compiled from EUR-Lex. Transposition data is editorial and may not reflect latest notifications. Verify with EUR-Lex. Not legal advice.',
      data_source: 'Ansvar Comprehensive EU Law Database',
      data_age: metadata?.value ?? 'unknown',
    },
  };
}
