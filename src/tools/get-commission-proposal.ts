import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface GetProposalInput {
  identifier: string;
}

export function getCommissionProposal(db: Database.Database, input: GetProposalInput) {
  // Search for acts with 'proposed' or 'pending' status
  const proposals = db.prepare(`
    SELECT * FROM eu_acts
    WHERE (LOWER(short_title) LIKE LOWER(?) OR LOWER(title) LIKE LOWER(?) OR LOWER(subject_matter) LIKE LOWER(?))
      AND (status = 'proposed' OR status = 'pending' OR status = 'in_negotiation')
    ORDER BY adoption_date DESC
  `).all(`%${input.identifier}%`, `%${input.identifier}%`, `%${input.identifier}%`);

  if (proposals.length === 0) {
    // Also check adopted acts that started as proposals
    const adopted = db.prepare(`
      SELECT * FROM eu_acts
      WHERE (LOWER(short_title) LIKE LOWER(?) OR LOWER(title) LIKE LOWER(?))
      ORDER BY adoption_date DESC
      LIMIT 5
    `).all(`%${input.identifier}%`, `%${input.identifier}%`);

    if (adopted.length > 0) {
      return {
        note: `No pending proposals found for "${input.identifier}". The following adopted acts match:`,
        adopted_acts: adopted,
        _meta: {
          disclaimer: 'Proposal status data is editorial. Check EUR-Lex and the Legislative Observatory for current procedural status. Not legal advice.',
        },
      };
    }

    throw new Error(`No proposals or acts found matching: "${input.identifier}".`);
  }

  return {
    query: input.identifier,
    count: proposals.length,
    proposals: (proposals as any[]).map((p) => ({
      ...p,
      _citation: buildCitation(
        p.short_title || p.celex_number || input.identifier,
        p.short_title || p.title,
        'get_commission_proposal',
        { identifier: input.identifier },
        p.url,
      ),
    })),
    _meta: {
      disclaimer: 'Proposal status data is editorial. Check EUR-Lex and the Legislative Observatory for current procedural status. Not legal advice.',
    },
  };
}
