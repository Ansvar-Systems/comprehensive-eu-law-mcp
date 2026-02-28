export function seedKeyRegulations(db) {
    console.log('  Seeding key EU regulations...');
    const insertAct = db.prepare(`INSERT INTO eu_acts (title, short_title, celex_number, act_type, official_journal_ref, adoption_date, entry_into_force_date, status, subject_matter, legal_basis, url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertArticle = db.prepare(`INSERT INTO articles (act_id, article_number, title, content, chapter)
     VALUES (?, ?, ?, ?, ?)`);
    // ---- GDPR (Regulation 2016/679) ----
    const { lastInsertRowid: gdprId } = insertAct.run('Regulation (EU) 2016/679 on the protection of natural persons with regard to the processing of personal data', 'GDPR', '32016R0679', 'regulation', 'OJ L 119, 4.5.2016', '2016-04-27', '2018-05-25', 'in_force', 'Data protection; privacy; personal data processing', 'TFEU Art. 16', 'https://eur-lex.europa.eu/eli/reg/2016/679/oj');
    const gdprArticles = [
        ['1', 'Subject matter and objectives', 'This Regulation lays down rules relating to the protection of natural persons with regard to the processing of personal data and rules relating to the free movement of personal data.', 'I'],
        ['2', 'Material scope', 'This Regulation applies to the processing of personal data wholly or partly by automated means and to the processing other than by automated means of personal data which form part of a filing system or are intended to form part of a filing system.', 'I'],
        ['4', 'Definitions', 'Definitions of personal data, processing, controller, processor, consent, personal data breach, and other key terms.', 'I'],
        ['5', 'Principles relating to processing', 'Personal data shall be: lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality; accountability.', 'II'],
        ['6', 'Lawfulness of processing', 'Processing shall be lawful only if and to the extent that at least one of six legal bases applies: consent, contract, legal obligation, vital interests, public interest, legitimate interests.', 'II'],
        ['7', 'Conditions for consent', 'Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented. The data subject shall have the right to withdraw consent at any time.', 'II'],
        ['9', 'Processing of special categories', 'Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health data, or sex life or sexual orientation data shall be prohibited, subject to listed exceptions.', 'II'],
        ['12', 'Transparent information', 'The controller shall take appropriate measures to provide information in a concise, transparent, intelligible and easily accessible form, using clear and plain language.', 'III'],
        ['13', 'Information to be provided where data collected from data subject', 'Where personal data are collected from the data subject, the controller shall provide: identity and contact details, purposes, legal basis, recipients, transfer intentions, retention period, and rights information.', 'III'],
        ['15', 'Right of access', 'The data subject shall have the right to obtain from the controller confirmation as to whether or not personal data concerning him or her are being processed, and where that is the case, access to the personal data.', 'III'],
        ['17', 'Right to erasure', 'The data subject shall have the right to obtain from the controller the erasure of personal data concerning him or her without undue delay where one of six grounds applies.', 'III'],
        ['20', 'Right to data portability', 'The data subject shall have the right to receive personal data concerning him or her in a structured, commonly used and machine-readable format and have the right to transmit those data to another controller.', 'III'],
        ['25', 'Data protection by design and by default', 'The controller shall implement appropriate technical and organisational measures designed to implement data-protection principles in an effective manner and to integrate the necessary safeguards into the processing.', 'IV'],
        ['28', 'Processor', 'Where processing is to be carried out on behalf of a controller, the controller shall use only processors providing sufficient guarantees to implement appropriate technical and organisational measures.', 'IV'],
        ['30', 'Records of processing activities', 'Each controller and, where applicable, the controller representative, shall maintain a record of processing activities under its responsibility.', 'IV'],
        ['32', 'Security of processing', 'The controller and processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk.', 'IV'],
        ['33', 'Notification of a personal data breach', 'In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority.', 'IV'],
        ['35', 'Data protection impact assessment', 'Where a type of processing is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall carry out an assessment of the impact of the envisaged processing operations on the protection of personal data.', 'IV'],
        ['44', 'General principle for transfers', 'Any transfer of personal data to a third country or an international organisation shall take place only if the conditions laid down in Chapter V are complied with.', 'V'],
        ['45', 'Transfers on the basis of an adequacy decision', 'A transfer of personal data to a third country or an international organisation may take place where the Commission has decided that the third country or international organisation ensures an adequate level of protection.', 'V'],
        ['46', 'Transfers subject to appropriate safeguards', 'A controller or processor may transfer personal data to a third country or an international organisation only if the controller or processor has provided appropriate safeguards and on condition that enforceable data subject rights and effective legal remedies are available.', 'V'],
        ['83', 'General conditions for imposing fines', 'Administrative fines of up to EUR 20,000,000 or up to 4% of the total worldwide annual turnover, whichever is higher, for infringements of specified provisions.', 'VIII'],
    ];
    for (const [num, title, content, chapter] of gdprArticles) {
        insertArticle.run(gdprId, num, title, content, chapter);
    }
    // ---- AI Act (Regulation 2024/1689) ----
    const { lastInsertRowid: aiActId } = insertAct.run('Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence', 'AI Act', '32024R1689', 'regulation', 'OJ L, 2024/1689, 12.7.2024', '2024-06-13', '2024-08-01', 'in_force', 'Artificial intelligence; AI systems; high-risk AI; prohibited AI practices', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj');
    const aiArticles = [
        ['1', 'Subject matter', 'This Regulation lays down harmonised rules for the placing on the market, the putting into service, and the use of AI systems in the Union.', 'I'],
        ['3', 'Definitions', 'Definitions of AI system, provider, deployer, high-risk AI system, general-purpose AI model, and other key terms.', 'I'],
        ['5', 'Prohibited AI practices', 'The following AI practices shall be prohibited: subliminal techniques, exploitation of vulnerabilities, social scoring, real-time remote biometric identification in public spaces (with exceptions).', 'II'],
        ['6', 'Classification rules for high-risk AI systems', 'An AI system shall be considered high-risk where it is a safety component of a product covered by Union harmonisation legislation listed in Annex I, or falls within the areas listed in Annex III.', 'III'],
        ['9', 'Risk management system', 'A risk management system shall be established, implemented, documented and maintained in relation to high-risk AI systems throughout the entire lifecycle.', 'III'],
        ['10', 'Data and data governance', 'High-risk AI systems which make use of techniques involving the training of AI models with data shall be developed on the basis of training, validation and testing data sets that meet quality criteria.', 'III'],
        ['13', 'Transparency and provision of information to deployers', 'High-risk AI systems shall be designed and developed in such a way as to ensure that their operation is sufficiently transparent to enable deployers to interpret a system output and use it appropriately.', 'III'],
        ['14', 'Human oversight', 'High-risk AI systems shall be designed and developed in such a way that they can be effectively overseen by natural persons during the period in which they are in use.', 'III'],
        ['15', 'Accuracy, robustness and cybersecurity', 'High-risk AI systems shall be designed and developed in such a way that they achieve an appropriate level of accuracy, robustness, and cybersecurity and that they perform consistently in those respects throughout their lifecycle.', 'III'],
        ['26', 'Obligations of deployers of high-risk AI systems', 'Deployers of high-risk AI systems shall take appropriate technical and organisational measures to ensure they use such systems in accordance with the instructions of use.', 'III'],
        ['50', 'Transparency obligations for certain AI systems', 'Providers shall ensure that AI systems intended to interact directly with natural persons are designed and developed in such a way that the natural person is informed that they are interacting with an AI system.', 'IV'],
        ['52', 'General-purpose AI models', 'Providers of general-purpose AI models shall provide technical documentation, comply with copyright directive, and publish a detailed summary of training data content.', 'V'],
        ['53', 'Obligations for providers of general-purpose AI models', 'Providers of general-purpose AI models shall draw up and keep up-to-date the technical documentation of the model and make it available to the AI Office and national competent authorities.', 'V'],
        ['99', 'Penalties', 'Member States shall lay down rules on penalties. Fines of up to EUR 35,000,000 or 7% of worldwide annual turnover for prohibited practices; up to EUR 15,000,000 or 3% for other obligations.', 'XII'],
    ];
    for (const [num, title, content, chapter] of aiArticles) {
        insertArticle.run(aiActId, num, title, content, chapter);
    }
    // ---- Digital Services Act (Regulation 2022/2065) ----
    const { lastInsertRowid: dsaId } = insertAct.run('Regulation (EU) 2022/2065 on a Single Market For Digital Services', 'DSA', '32022R2065', 'regulation', 'OJ L 277, 27.10.2022', '2022-10-19', '2024-02-17', 'in_force', 'Digital services; online platforms; intermediary liability; content moderation', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2022/2065/oj');
    const dsaArticles = [
        ['1', 'Subject matter', 'This Regulation lays down harmonised rules for a safe, predictable and trusted online environment for intermediary services.', 'I'],
        ['4', 'Mere conduit', 'The provider of an intermediary service consisting of the transmission of information shall not be liable for the information transmitted.', 'II'],
        ['5', 'Caching', 'The provider of an intermediary service consisting of the transmission of information provided by a recipient shall not be liable for the automatic, intermediate and temporary storage of information performed for the sole purpose of making more efficient onward transmission.', 'II'],
        ['6', 'Hosting', 'The provider of an intermediary service consisting of the storage of information provided by a recipient shall not be liable for information stored at the request of a recipient.', 'II'],
        ['14', 'Terms and conditions', 'Providers of intermediary services shall include in their terms and conditions information on restrictions in relation to use of their service.', 'III'],
        ['16', 'Notice and action mechanisms', 'Providers of hosting services shall put mechanisms in place to allow any individual or entity to notify them of the presence on their service of specific items of information that the individual or entity considers to be illegal content.', 'III'],
        ['22', 'Online interface design and organisation', 'Providers of online platforms shall not design, organise or operate their online interfaces in a way that deceives or manipulates the recipients of their service or in a way that otherwise materially distorts or impairs the ability of recipients to make free and informed decisions (dark patterns).', 'III'],
        ['27', 'Recommender system transparency', 'Providers of online platforms that use recommender systems shall set out in their terms and conditions the main parameters used in their recommender systems and any options for modification.', 'III'],
        ['34', 'Risk assessment', 'Very large online platforms and very large online search engines shall identify, analyse and assess any systemic risks in the Union stemming from the design or functioning of their service.', 'III'],
        ['40', 'Data access and scrutiny', 'Very large online platforms and very large online search engines shall provide the Digital Services Coordinator of establishment or the Commission access to data necessary to monitor and assess compliance.', 'III'],
        ['52', 'Penalties', 'Fines of up to 6% of annual worldwide turnover for infringements. Periodic penalty payments of up to 5% of average daily worldwide turnover.', 'IV'],
    ];
    for (const [num, title, content, chapter] of dsaArticles) {
        insertArticle.run(dsaId, num, title, content, chapter);
    }
    // ---- Digital Markets Act (Regulation 2022/1925) ----
    const { lastInsertRowid: dmaId } = insertAct.run('Regulation (EU) 2022/1925 on contestable and fair markets in the digital sector', 'DMA', '32022R1925', 'regulation', 'OJ L 265, 12.10.2022', '2022-09-14', '2023-05-02', 'in_force', 'Digital markets; gatekeepers; core platform services; interoperability', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2022/1925/oj');
    const dmaArticles = [
        ['1', 'Subject matter and scope', 'This Regulation lays down harmonised rules ensuring contestable and fair markets in the digital sector across the Union where gatekeepers are present.', 'I'],
        ['2', 'Definitions', 'Definitions of gatekeeper, core platform service, end user, business user, and other key terms.', 'I'],
        ['3', 'Designation of gatekeepers', 'An undertaking shall be designated as a gatekeeper if it has a significant impact on the internal market, operates a core platform service which serves as an important gateway for business users to reach end users, and enjoys an entrenched and durable position.', 'II'],
        ['5', 'Obligations for gatekeepers', 'The gatekeeper shall refrain from: combining personal data from different core platform services; preventing business users from offering different conditions; requiring business users to use identification or payment services; preventing end users from un-subscribing.', 'III'],
        ['6', 'Obligations for gatekeepers susceptible of being further specified', 'The gatekeeper shall not use non-publicly available data from business users; allow end users to un-install pre-installed software; allow installation of third-party app stores; not treat own services more favourably in ranking.', 'III'],
        ['7', 'Compliance with obligations for gatekeepers', 'The measures implemented by the gatekeeper to ensure compliance shall be effective in achieving the objective of the relevant obligation.', 'III'],
        ['18', 'Fines', 'Fines of up to 10% of total worldwide annual turnover, or up to 20% in case of repeated infringements.', 'V'],
    ];
    for (const [num, title, content, chapter] of dmaArticles) {
        insertArticle.run(dmaId, num, title, content, chapter);
    }
    // ---- Data Act (Regulation 2023/2854) ----
    const { lastInsertRowid: dataActId } = insertAct.run('Regulation (EU) 2023/2854 on harmonised rules on fair access to and use of data', 'Data Act', '32023R2854', 'regulation', 'OJ L, 2023/2854, 22.12.2023', '2023-12-13', '2025-09-12', 'in_force', 'Data access; data sharing; IoT data; cloud switching; data portability', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2023/2854/oj');
    const dataActArticles = [
        ['1', 'Subject matter and scope', 'This Regulation lays down harmonised rules on making data generated by the use of connected products or related services available to users; making data available to data recipients; making data available to public sector bodies; facilitating switching between data processing services.', 'I'],
        ['3', 'Obligation to make data accessible', 'Products shall be designed and manufactured, and related services shall be provided, in such a manner that data generated by their use are accessible to the user.', 'II'],
        ['4', 'Right of users to access and use data', 'Where data cannot be directly accessed by the user from the product, the data holder shall make available to the user the data generated by its use of a product or related service without undue delay.', 'II'],
        ['5', 'Right to share data with third parties', 'Upon request by a user, or by a party acting on behalf of a user, the data holder shall make available the data to a third party without undue delay.', 'II'],
        ['23', 'Right to switch', 'Providers of data processing services shall enable the customer to switch to another data processing service and shall remove commercial, technical, contractual and organisational obstacles that inhibit switching.', 'VI'],
    ];
    for (const [num, title, content, chapter] of dataActArticles) {
        insertArticle.run(dataActId, num, title, content, chapter);
    }
    // ---- DORA (Regulation 2022/2554) ----
    const { lastInsertRowid: doraId } = insertAct.run('Regulation (EU) 2022/2554 on digital operational resilience for the financial sector', 'DORA', '32022R2554', 'regulation', 'OJ L 333, 27.12.2022', '2022-12-14', '2025-01-17', 'in_force', 'Digital operational resilience; ICT risk management; financial sector cybersecurity; third-party risk', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2022/2554/oj');
    const doraArticles = [
        ['1', 'Subject matter', 'This Regulation lays down uniform requirements concerning the security of network and information systems supporting the business processes of financial entities.', 'I'],
        ['5', 'Governance and organisation', 'Financial entities shall have in place an internal governance and control framework that ensures an effective and prudent management of ICT risk.', 'II'],
        ['6', 'ICT risk management framework', 'Financial entities shall have a sound, comprehensive and well-documented ICT risk management framework as part of their overall risk management system.', 'II'],
        ['9', 'Protection and prevention', 'Financial entities shall continuously monitor and control the security and functioning of ICT systems and tools and shall minimise the impact of ICT risk through the deployment of appropriate ICT security tools, policies and procedures.', 'II'],
        ['17', 'ICT-related incident management process', 'Financial entities shall define, establish and implement an ICT-related incident management process to detect, manage and notify ICT-related incidents.', 'III'],
        ['19', 'Reporting of major ICT-related incidents', 'Financial entities shall report major ICT-related incidents to the relevant competent authority.', 'III'],
        ['24', 'General requirements for digital operational resilience testing', 'Financial entities shall establish, maintain and review a sound and comprehensive digital operational resilience testing programme as an integral part of the ICT risk management framework.', 'IV'],
        ['26', 'Advanced testing of ICT tools, systems and processes based on TLPT', 'Financial entities identified by competent authorities shall carry out threat-led penetration testing at least every 3 years.', 'IV'],
        ['28', 'General principles', 'Financial entities shall manage ICT third-party risk as an integral component of ICT risk within their ICT risk management framework.', 'V'],
        ['30', 'Key contractual provisions', 'Contractual arrangements on the use of ICT services shall include certain clauses on availability, integrity, security, data location, subcontracting, and exit strategies.', 'V'],
    ];
    for (const [num, title, content, chapter] of doraArticles) {
        insertArticle.run(doraId, num, title, content, chapter);
    }
    // ---- Cyber Resilience Act (Regulation 2024/2847) ----
    const { lastInsertRowid: craId } = insertAct.run('Regulation (EU) 2024/2847 on horizontal cybersecurity requirements for products with digital elements', 'CRA', '32024R2847', 'regulation', 'OJ L, 2024/2847, 20.11.2024', '2024-10-23', '2024-12-10', 'in_force', 'Cybersecurity; products with digital elements; vulnerability handling; software security', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2024/2847/oj');
    const craArticles = [
        ['1', 'Subject matter', 'This Regulation lays down cybersecurity requirements for the design, development, production, making available on the market and maintenance of products with digital elements.', 'I'],
        ['3', 'Definitions', 'Definitions of product with digital elements, software, hardware, remote data processing solution, vulnerability, and other key terms.', 'I'],
        ['6', 'Requirements for products with digital elements', 'Products with digital elements shall only be made available on the market if they meet the essential cybersecurity requirements set out in Annex I.', 'II'],
        ['10', 'Obligations of manufacturers', 'Manufacturers shall ensure that products with digital elements are designed, developed and produced in accordance with the essential cybersecurity requirements.', 'III'],
        ['11', 'Reporting obligations of manufacturers', 'A manufacturer shall notify any actively exploited vulnerability contained in the product with digital elements to ENISA and the national CSIRT within 24 hours of becoming aware.', 'III'],
        ['13', 'Obligations of importers', 'Importers shall only place on the market products with digital elements that meet the essential cybersecurity requirements.', 'III'],
    ];
    for (const [num, title, content, chapter] of craArticles) {
        insertArticle.run(craId, num, title, content, chapter);
    }
    // ---- eIDAS 2.0 (Regulation 2024/1183) ----
    const { lastInsertRowid: eidasId } = insertAct.run('Regulation (EU) 2024/1183 amending Regulation (EU) No 910/2014 as regards establishing the European Digital Identity Framework', 'eIDAS 2.0', '32024R1183', 'regulation', 'OJ L, 2024/1183, 30.4.2024', '2024-04-11', '2024-05-20', 'in_force', 'Electronic identification; trust services; European Digital Identity Wallet; digital identity', 'TFEU Art. 114', 'https://eur-lex.europa.eu/eli/reg/2024/1183/oj');
    const eidasArticles = [
        ['1', 'Subject matter', 'This Regulation amends Regulation (EU) No 910/2014 to establish the European Digital Identity Framework ensuring universal access to secure electronic identification and authentication.', 'I'],
        ['6a', 'European Digital Identity Wallets', 'Each Member State shall issue a European Digital Identity Wallet within 24 months. The wallet shall enable users to securely request, obtain, store, select, combine and share data for identification and authentication purposes.', 'II'],
        ['6b', 'Person identification data and electronic attestations of attributes', 'European Digital Identity Wallets shall enable the user to securely store person identification data and electronic attestations of attributes issued by Member States.', 'II'],
        ['6c', 'Relying parties', 'Relying parties shall be allowed to rely on European Digital Identity Wallets. They shall communicate their identity and intended purpose to the wallet.', 'II'],
        ['45', 'Requirements for qualified certificates for website authentication', 'Qualified certificates for website authentication shall meet the requirements laid down in Annex IV. Web browsers shall support and interoperate with qualified certificates for website authentication.', 'III'],
    ];
    for (const [num, title, content, chapter] of eidasArticles) {
        insertArticle.run(eidasId, num, title, content, chapter);
    }
    const actCount = db.prepare('SELECT COUNT(*) as c FROM eu_acts WHERE act_type = ?').get('regulation').c;
    console.log(`    Regulations loaded: ${actCount - 1} (excluding treaties)`);
}
