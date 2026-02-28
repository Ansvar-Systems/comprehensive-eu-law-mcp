export function validateCitation(db, input) {
    const citation = input.citation.trim();
    // Try to parse as case number (e.g., "C-311/18")
    const caseMatch = citation.match(/^(C-\d+\/\d+|T-\d+\/\d+)/i);
    if (caseMatch) {
        const caseNumber = caseMatch[1].toUpperCase();
        const caseRow = db.prepare('SELECT case_number, ecli, case_name, court, judgment_date FROM case_law WHERE UPPER(case_number) = ?').get(caseNumber);
        return {
            valid: !!caseRow,
            type: 'case_law',
            parsed: { case_number: caseNumber },
            match: caseRow || null,
            formatted: {
                standard: caseRow ? `Case ${caseRow.case_number}, ${caseRow.case_name}` : null,
                ecli: caseRow?.ecli || null,
            },
            warnings: caseRow ? [] : [`Case ${caseNumber} not found in database.`],
        };
    }
    // Try to parse as article citation (e.g., "Article 5(1) GDPR", "Art. 101 TFEU")
    const articleMatch = citation.match(/(?:Article|Art\.?)\s*(\d+)(?:\((\d+)\))?\s+(.+)/i);
    if (articleMatch) {
        const articleNum = articleMatch[1];
        const paragraph = articleMatch[2] || null;
        const actName = articleMatch[3].trim();
        // Find the act
        const act = db.prepare(`
      SELECT id, title, short_title, celex_number, act_type, status FROM eu_acts
      WHERE LOWER(short_title) = LOWER(?) OR LOWER(title) LIKE LOWER(?)
      LIMIT 1
    `).get(actName, `%${actName}%`);
        if (!act) {
            return {
                valid: false,
                type: 'legislation',
                parsed: { article: articleNum, paragraph, act: actName },
                match: null,
                formatted: null,
                warnings: [`Act "${actName}" not found in database.`],
            };
        }
        // Find the article
        const article = db.prepare(`
      SELECT article_number, title, content FROM articles
      WHERE act_id = ? AND article_number = ?
    `).get(act.id, articleNum);
        const warnings = [];
        if (act.status === 'repealed') {
            warnings.push(`${act.short_title || act.title} has been repealed.`);
        }
        if (!article) {
            warnings.push(`Article ${articleNum} not found in ${act.short_title || act.title}.`);
        }
        return {
            valid: !!article,
            type: 'legislation',
            parsed: { article: articleNum, paragraph, act: actName },
            match: article ? {
                act: { title: act.title, short_title: act.short_title, celex_number: act.celex_number },
                article: { article_number: article.article_number, title: article.title },
            } : null,
            formatted: article ? {
                standard: `Article ${articleNum}${paragraph ? `(${paragraph})` : ''}, ${act.short_title || act.title}`,
                celex: act.celex_number ? `Article ${articleNum}, ${act.celex_number}` : null,
            } : null,
            warnings,
        };
    }
    return {
        valid: false,
        type: 'unknown',
        parsed: null,
        match: null,
        formatted: null,
        warnings: [
            `Could not parse citation: "${citation}". Expected formats: "Article 5 GDPR", "Art. 101 TFEU", "C-311/18".`,
        ],
    };
}
