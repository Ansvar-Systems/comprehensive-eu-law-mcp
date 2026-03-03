export function getTranspositionStatus(db, input) {
    const metadata = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get();
    const act = db.prepare(`
    SELECT * FROM eu_acts
    WHERE (LOWER(short_title) = LOWER(?) OR LOWER(title) LIKE LOWER(?))
      AND act_type = 'directive'
    LIMIT 1
  `).get(input.directive, `%${input.directive}%`);
    if (!act) {
        throw new Error(`Directive not found: "${input.directive}".`);
    }
    let sql = `
    SELECT member_state, status, national_measure, notification_date, notes
    FROM transposition_status
    WHERE directive_id = ?
  `;
    const params = [act.id];
    if (input.member_state) {
        sql += ` AND UPPER(member_state) = UPPER(?)`;
        params.push(input.member_state);
    }
    sql += ` ORDER BY member_state`;
    const results = db.prepare(sql).all(...params);
    return {
        directive: {
            title: act.title,
            short_title: act.short_title,
            celex_number: act.celex_number,
            transposition_deadline: act.entry_into_force_date,
        },
        member_state_filter: input.member_state || 'all',
        count: results.length,
        results,
        _meta: {
            disclaimer: 'Transposition data is editorial and may not reflect latest notifications. Verify with EUR-Lex national transposition measures. Not legal advice.',
            data_source: 'Ansvar Comprehensive EU Law Database',
            data_age: metadata?.value ?? 'unknown',
        },
    };
}
