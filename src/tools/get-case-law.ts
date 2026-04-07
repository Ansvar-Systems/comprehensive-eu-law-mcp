import type Database from 'better-sqlite3';
import { buildCitation } from '../citation.js';

interface GetCaseLawInput {
  case_number: string;
}

export function getCaseLaw(db: Database.Database, input: GetCaseLawInput) {
  const caseRow = db.prepare(`
    SELECT * FROM case_law
    WHERE case_number = ? OR ecli = ? OR LOWER(case_number) = LOWER(?)
    LIMIT 1
  `).get(input.case_number, input.case_number, input.case_number) as any;

  if (!caseRow) {
    throw new Error(
      `Case not found: "${input.case_number}". Use a case number like "C-311/18" or an ECLI.`
    );
  }

  return {
    case: {
      case_number: caseRow.case_number,
      ecli: caseRow.ecli,
      case_name: caseRow.case_name,
      court: caseRow.court,
      judgment_date: caseRow.judgment_date,
      subject_matter: caseRow.subject_matter,
      keywords: caseRow.keywords,
      headnotes: caseRow.headnotes,
      ruling_summary: caseRow.ruling_summary,
      cited_acts: caseRow.cited_acts,
      importance_score: caseRow.importance_score,
    },
    _citation: buildCitation(
      caseRow.case_number,
      `Case ${caseRow.case_number} ${caseRow.case_name || ''}`.trim(),
      'get_case_law',
      { case_number: input.case_number },
      undefined,
      caseRow.ecli ? [caseRow.ecli] : undefined,
    ),
    _meta: {
      disclaimer: 'Case law summaries are editorial. Verify full judgments on curia.europa.eu. Not legal advice.',
    },
  };
}
