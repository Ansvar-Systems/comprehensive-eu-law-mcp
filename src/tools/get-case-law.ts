import type Database from 'better-sqlite3';

interface GetCaseLawInput {
  case_number: string;
}

export function getCaseLaw(db: Database.Database, input: GetCaseLawInput) {
  const metadata = db.prepare("SELECT value FROM db_metadata WHERE key = 'build_date'").get() as any;
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
    _meta: {
      disclaimer: 'Case law summaries are editorial. Verify full judgments on curia.europa.eu. Not legal advice.',
      data_source: 'Ansvar Comprehensive EU Law Database',
      data_age: metadata?.value ?? 'unknown',
    },
  };
}
