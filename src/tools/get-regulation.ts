import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface GetRegulationInput {
  identifier: string;
}

export function getRegulation(db: Database.Database, input: GetRegulationInput) {
  const act = db.prepare(`
    SELECT * FROM eu_acts
    WHERE (LOWER(short_title) = LOWER(?) OR LOWER(title) LIKE LOWER(?) OR LOWER(celex_number) = LOWER(?))
      AND act_type = 'regulation'
    LIMIT 1
  `).get(input.identifier, `%${input.identifier}%`, input.identifier) as any;

  if (!act) {
    // Try broader search
    const candidates = db.prepare(`
      SELECT short_title, celex_number FROM eu_acts WHERE act_type = 'regulation' ORDER BY short_title
    `).all() as any[];
    throw new Error(
      `Regulation not found: "${input.identifier}". Available regulations: ${candidates.map((c: any) => c.short_title || c.celex_number).join(', ')}`
    );
  }

  const articleCount = (db.prepare(
    'SELECT COUNT(*) as c FROM articles WHERE act_id = ?'
  ).get(act.id) as any).c;

  const keyArticles = db.prepare(`
    SELECT article_number, title FROM articles WHERE act_id = ? ORDER BY id LIMIT 30
  `).all(act.id);

  return {
    regulation: {
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
    articles: keyArticles,
    _citation: buildCitation(
      act.short_title || act.celex_number,
      act.short_title || act.title,
      'get_regulation',
      { identifier: input.identifier },
      act.url,
      [act.celex_number, act.title].filter(Boolean),
    ),
    _meta: {
      disclaimer: 'EU law data compiled from EUR-Lex. Verify against EUR-Lex for binding text. Not legal advice.',
    },
  };
}
