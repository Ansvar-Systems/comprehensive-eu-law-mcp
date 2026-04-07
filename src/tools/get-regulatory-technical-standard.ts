import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface GetRTSInput {
  parent_regulation: string;
}

export function getRegulatoryTechnicalStandard(db: Database.Database, input: GetRTSInput) {
  // Find the parent regulation
  const parent = db.prepare(`
    SELECT * FROM eu_acts
    WHERE (LOWER(short_title) = LOWER(?) OR LOWER(title) LIKE LOWER(?))
      AND act_type = 'regulation'
    LIMIT 1
  `).get(input.parent_regulation, `%${input.parent_regulation}%`) as any;

  if (!parent) {
    throw new Error(`Parent regulation not found: "${input.parent_regulation}".`);
  }

  // Find delegated/implementing acts that reference this regulation
  const rts = db.prepare(`
    SELECT * FROM eu_acts
    WHERE LOWER(legal_basis) LIKE LOWER(?)
      AND act_type IN ('regulation', 'decision')
      AND id != ?
    ORDER BY adoption_date
  `).all(`%${parent.short_title || parent.celex_number}%`, parent.id);

  return {
    parent_regulation: {
      title: parent.title,
      short_title: parent.short_title,
      celex_number: parent.celex_number,
    },
    delegated_and_implementing_acts: rts,
    count: rts.length,
    _citation: buildCitation(
      `${parent.short_title || parent.celex_number} RTS/ITS`,
      `Delegated acts under ${parent.short_title || parent.title}`,
      'get_regulatory_technical_standard',
      { parent_regulation: input.parent_regulation },
    ),
    _meta: {
      disclaimer: 'RTS/ITS data compiled from EUR-Lex. This may not include all delegated acts. Verify with EUR-Lex. Not legal advice.',
    },
  };
}
