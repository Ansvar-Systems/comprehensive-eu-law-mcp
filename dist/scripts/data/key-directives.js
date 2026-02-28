export function seedKeyDirectives(db) {
    console.log('  Seeding key EU directives...');
    const insertAct = db.prepare(`INSERT INTO eu_acts (title, short_title, celex_number, act_type, official_journal_ref, adoption_date, entry_into_force_date, status, subject_matter, legal_basis, url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertArticle = db.prepare(`INSERT INTO articles (act_id, article_number, title, content, chapter)
     VALUES (?, ?, ?, ?, ?)`);
    const insertTransposition = db.prepare(`INSERT INTO transposition_status (directive_id, member_state, status, national_measure, notification_date, notes)
     VALUES (?, ?, ?, ?, ?, ?)`);
    // ---- NIS2 Directive (2022/2555) ----
    const { lastInsertRowid: nis2Id } = insertAct.run('Directive (EU) 2022/2555 on measures for a high common level of cybersecurity across the Union', 'NIS2', '32022L2555', 'directive', 'OJ L 333, 27.12.2022', '2022-12-14', '2023-01-16', 'in_force', 'Cybersecurity; network and information systems; essential entities; important entities; incident reporting', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj');
    const nis2Articles = [
        ['1', 'Subject matter', 'This Directive lays down measures aimed at achieving a high common level of cybersecurity across the Union, with a view to improving the functioning of the internal market.', 'I'],
        ['2', 'Scope', 'This Directive applies to public and private entities that qualify as medium-sized enterprises or exceed medium-sized enterprise ceilings and that provide services or carry out activities within the Union in sectors set out in Annexes I and II.', 'I'],
        ['3', 'Essential and important entities', 'Entities in Annex I exceeding medium-sized enterprise ceilings are essential entities. Entities in Annexes I and II that are medium-sized enterprises are important entities.', 'I'],
        ['7', 'National cybersecurity strategy', 'Each Member State shall adopt a national cybersecurity strategy defining strategic objectives, governance framework, risk assessment, and measures for implementation.', 'II'],
        ['10', 'CSIRTs', 'Each Member State shall designate or establish one or more CSIRTs responsible for incident handling in accordance with a well-defined process.', 'II'],
        ['21', 'Cybersecurity risk-management measures', 'Member States shall ensure that essential and important entities take appropriate and proportionate technical, operational and organisational measures to manage risks posed to the security of network and information systems.', 'IV'],
        ['23', 'Reporting obligations', 'Member States shall ensure that essential and important entities notify, without undue delay, the competent authority of any significant incident. Early warning within 24 hours, incident notification within 72 hours, final report within one month.', 'IV'],
        ['32', 'Supervisory and enforcement measures in relation to essential entities', 'Competent authorities shall have the power to subject essential entities to on-site inspections, targeted security audits, and ad hoc audits.', 'VII'],
        ['34', 'Administrative fines', 'Essential entities: fines of up to EUR 10,000,000 or 2% of worldwide annual turnover. Important entities: fines of up to EUR 7,000,000 or 1.4% of worldwide annual turnover.', 'VII'],
    ];
    for (const [num, title, content, chapter] of nis2Articles) {
        insertArticle.run(nis2Id, num, title, content, chapter);
    }
    // Sample transposition status
    const nis2Transpositions = [
        ['BE', 'transposed', 'Law of 26 April 2024 establishing a framework for the cybersecurity of network and information systems', '2024-04-26', null],
        ['HR', 'transposed', 'Cybersecurity Act (Zakon o kibernetickoj sigurnosti), OG 14/2024', '2024-02-15', null],
        ['HU', 'transposed', 'Act XXIII of 2023 on Cybersecurity Certification and Supervision', '2024-01-01', null],
        ['IT', 'transposed', 'Legislative Decree No. 138 of 4 September 2024', '2024-10-16', null],
        ['LT', 'transposed', 'Cybersecurity Law (Kibernetinio saugumo istatymas)', '2024-10-01', null],
        ['DE', 'not_transposed', null, null, 'NIS2 Implementation Act (NIS2UmsuCG) pending legislative process as of early 2025'],
        ['FR', 'not_transposed', null, null, 'Transposition expected via a new law adapting the EU cyber package'],
        ['SE', 'not_transposed', null, null, 'Government inquiry SOU 2024:18 published; bill expected 2025'],
        ['ES', 'not_transposed', null, null, 'Draft Royal Decree-Law under preparation'],
        ['NL', 'not_transposed', null, null, 'Cybersecurity Act (Wet beveiliging netwerk- en informatiesystemen) under parliamentary review'],
    ];
    for (const [ms, status, measure, date, notes] of nis2Transpositions) {
        insertTransposition.run(nis2Id, ms, status, measure, date, notes);
    }
    // ---- CER Directive (2022/2557) ----
    const { lastInsertRowid: cerId } = insertAct.run('Directive (EU) 2022/2557 on the resilience of critical entities', 'CER', '32022L2557', 'directive', 'OJ L 333, 27.12.2022', '2022-12-14', '2023-01-16', 'in_force', 'Critical entities; resilience; essential services; risk assessment; physical security', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/dir/2022/2557/oj');
    const cerArticles = [
        ['1', 'Subject matter and scope', 'This Directive lays down obligations for Member States to adopt specific measures aimed at ensuring the provision in the internal market of services essential for the maintenance of vital societal functions or economic activities.', 'I'],
        ['4', 'Member State risk assessment', 'Member States shall carry out a risk assessment of all relevant natural and man-made risks.', 'II'],
        ['6', 'Identification of critical entities', 'Member States shall identify critical entities in the sectors: energy, transport, banking, financial market infrastructure, health, drinking water, waste water, digital infrastructure, public administration, space, food.', 'II'],
        ['12', 'Resilience of critical entities', 'Member States shall ensure that critical entities take appropriate and proportionate technical, security and organisational measures to ensure their resilience.', 'III'],
        ['13', 'Incident notification', 'Critical entities shall notify without undue delay the competent authority of incidents that significantly disrupt or have the potential to significantly disrupt the provision of essential services.', 'III'],
    ];
    for (const [num, title, content, chapter] of cerArticles) {
        insertArticle.run(cerId, num, title, content, chapter);
    }
    // ---- PSD2 Directive (2015/2366) ----
    const { lastInsertRowid: psd2Id } = insertAct.run('Directive (EU) 2015/2366 on payment services in the internal market', 'PSD2', '32015L2366', 'directive', 'OJ L 337, 23.12.2015', '2015-11-25', '2016-01-12', 'in_force', 'Payment services; open banking; strong customer authentication; third-party payment providers', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/dir/2015/2366/oj');
    const psd2Articles = [
        ['1', 'Subject matter', 'This Directive lays down rules concerning the provision of payment services in the internal market.', 'I'],
        ['4', 'Definitions', 'Definitions of payment service, payment institution, electronic money institution, payment account, payment transaction, and other key terms.', 'I'],
        ['66', 'Access to payment account for payment initiation service providers', 'Member States shall ensure that a payer has the right to make use of a payment initiation service provider to initiate a payment order.', 'IV'],
        ['67', 'Access to and use of payment account information', 'Member States shall ensure that an account holder has the right to make use of services enabling access to account information provided by account information service providers.', 'IV'],
        ['97', 'Authentication', 'Member States shall ensure that a payment service provider applies strong customer authentication where the payer initiates an electronic payment transaction or accesses its payment account online.', 'V'],
    ];
    for (const [num, title, content, chapter] of psd2Articles) {
        insertArticle.run(psd2Id, num, title, content, chapter);
    }
    // ---- E-Privacy Directive (2002/58/EC) ----
    const { lastInsertRowid: eprivacyId } = insertAct.run('Directive 2002/58/EC concerning the processing of personal data and the protection of privacy in the electronic communications sector', 'ePrivacy Directive', '32002L0058', 'directive', 'OJ L 201, 31.7.2002', '2002-07-12', '2002-07-31', 'in_force', 'Electronic communications; privacy; cookies; direct marketing; traffic data; location data', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/dir/2002/58/oj');
    const eprivacyArticles = [
        ['1', 'Scope and aim', 'This Directive provides for the harmonisation of the national provisions required to ensure an equivalent level of protection of fundamental rights and freedoms, in particular the right to privacy and confidentiality, with respect to the processing of personal data in the electronic communication sector.', 'I'],
        ['5', 'Confidentiality of the communications', 'Member States shall ensure the confidentiality of communications and the related traffic data by means of a public communications network and publicly available electronic communications services.', 'II'],
        ['6', 'Traffic data', 'Traffic data relating to subscribers and users processed and stored by the provider of a public communications network or service must be erased or made anonymous when it is no longer needed for the purpose of the transmission of a communication.', 'II'],
        ['13', 'Unsolicited communications', 'The use of automated calling and communication systems, facsimile machines or electronic mail for the purposes of direct marketing may be allowed only in respect of subscribers or users who have given their prior consent.', 'II'],
    ];
    for (const [num, title, content, chapter] of eprivacyArticles) {
        insertArticle.run(eprivacyId, num, title, content, chapter);
    }
    // ---- Product Liability Directive (2024/2853) ----
    const { lastInsertRowid: pldId } = insertAct.run('Directive (EU) 2024/2853 on liability for defective products', 'Product Liability Directive', '32024L2853', 'directive', 'OJ L, 2024/2853, 18.11.2024', '2024-10-23', '2024-12-08', 'in_force', 'Product liability; defective products; software liability; AI liability; manufacturer obligations', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/dir/2024/2853/oj');
    const pldArticles = [
        ['1', 'Subject matter', 'This Directive lays down common rules on the liability of economic operators for damage caused to natural persons by defective products.', 'I'],
        ['4', 'Definitions', 'Product includes software, AI systems, and digital manufacturing files. Defect includes defects in cybersecurity features.', 'I'],
        ['7', 'Defect', 'A product shall be considered defective where it does not provide the safety that a person is entitled to expect or that is required by Union or national safety rules.', 'II'],
        ['9', 'Liability of economic operators', 'The manufacturer shall be liable for damage caused by a defect in their product.', 'II'],
        ['10', 'Disclosure of evidence', 'National courts may order the defendant to disclose relevant evidence at its disposal when the claimant has presented facts and evidence sufficient to support the plausibility of the claim.', 'III'],
    ];
    for (const [num, title, content, chapter] of pldArticles) {
        insertArticle.run(pldId, num, title, content, chapter);
    }
    // ---- AI Liability Directive (Proposal COM/2022/496) ----
    const { lastInsertRowid: aildId } = insertAct.run('Proposal for a Directive on adapting non-contractual civil liability rules to artificial intelligence', 'AI Liability Directive', null, 'directive', null, null, null, 'proposed', 'AI liability; non-contractual liability; presumption of causality; disclosure of evidence', 'TFEU Art. 114', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022PC0496');
    const aildArticles = [
        ['1', 'Subject matter', 'This Directive lays down common rules on the disclosure of evidence and on the burden of proof in the context of claims for non-contractual fault-based civil liability for damage caused with the involvement of AI systems.', 'I'],
        ['3', 'Disclosure of evidence', 'National courts shall have the power to order the disclosure of relevant evidence from high-risk AI system providers or users.', 'II'],
        ['4', 'Rebuttable presumption of causal link', 'A causal link between the fault of the defendant and the output produced by the AI system or the failure of the AI system to produce an output shall be presumed where certain conditions are met.', 'II'],
    ];
    for (const [num, title, content, chapter] of aildArticles) {
        insertArticle.run(aildId, num, title, content, chapter);
    }
    const dirCount = db.prepare('SELECT COUNT(*) as c FROM eu_acts WHERE act_type = ?').get('directive').c;
    console.log(`    Directives loaded: ${dirCount}`);
    const transCount = db.prepare('SELECT COUNT(*) as c FROM transposition_status').get().c;
    console.log(`    Transposition records: ${transCount}`);
}
