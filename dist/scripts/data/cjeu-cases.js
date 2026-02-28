export function seedCJEUCases(db) {
    console.log('  Seeding CJEU case law...');
    const insertCase = db.prepare(`INSERT INTO case_law (case_number, ecli, case_name, court, judgment_date, subject_matter, keywords, headnotes, ruling_summary, cited_acts, importance_score)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const cases = [
        {
            n: 'C-311/18', ecli: 'ECLI:EU:C:2020:559', name: 'Schrems II',
            court: 'CJEU', date: '2020-07-16',
            subject: 'Data protection; international data transfers; EU-US Privacy Shield',
            kw: 'adequacy decision; standard contractual clauses; GDPR Article 46; Privacy Shield',
            head: 'The Court invalidated Commission Decision 2016/1250 on the adequacy of the EU-US Privacy Shield. Standard contractual clauses under Decision 2010/87/EU remain valid but controllers must verify adequate protection in the third country.',
            ruling: 'Privacy Shield invalidated. SCCs valid but require case-by-case assessment. Supervisory authorities must suspend transfers where protection is inadequate.',
            cited: 'GDPR; Charter Arts 7, 8, 47; Decision 2016/1250; Decision 2010/87/EU',
            score: 10
        },
        {
            n: 'C-362/14', ecli: 'ECLI:EU:C:2015:650', name: 'Schrems I',
            court: 'CJEU', date: '2015-10-06',
            subject: 'Data protection; Safe Harbor; adequacy decisions',
            kw: 'Safe Harbor; adequacy decision; national supervisory authorities; fundamental rights',
            head: 'The Court invalidated the Safe Harbor Decision. National supervisory authorities must be able to examine claims that a third country does not ensure adequate protection, even where the Commission has adopted an adequacy decision.',
            ruling: 'Safe Harbor Decision invalid. Supervisory authorities retain power to examine complaints about third-country data protection regardless of Commission adequacy decisions.',
            cited: 'Directive 95/46/EC; Charter Arts 7, 8, 47; Decision 2000/520/EC',
            score: 10
        },
        {
            n: 'C-131/12', ecli: 'ECLI:EU:C:2014:317', name: 'Google Spain (Right to be Forgotten)',
            court: 'CJEU', date: '2014-05-13',
            subject: 'Data protection; search engines; right to erasure; right to be forgotten',
            kw: 'search engine; right to be forgotten; de-listing; processing of personal data',
            head: 'A search engine operator is a controller of personal data processing when it indexes web pages containing personal data. Data subjects may request de-listing of search results that are inadequate, irrelevant or excessive.',
            ruling: 'Search engines are data controllers. Individuals have the right to request de-listing of search results linked to their name when the information is inadequate, irrelevant, or excessive.',
            cited: 'Directive 95/46/EC Arts 2, 4, 12, 14; Charter Arts 7, 8',
            score: 10
        },
        {
            n: 'C-293/12', ecli: 'ECLI:EU:C:2014:238', name: 'Digital Rights Ireland',
            court: 'CJEU', date: '2014-04-08',
            subject: 'Data retention; privacy; proportionality; fundamental rights',
            kw: 'data retention; proportionality; mass surveillance; telecommunications',
            head: 'The Court declared the Data Retention Directive invalid for disproportionate interference with the fundamental rights to respect for private life and to the protection of personal data.',
            ruling: 'Data Retention Directive 2006/24/EC declared invalid. Blanket data retention is disproportionate to the objective of fighting serious crime.',
            cited: 'Directive 2006/24/EC; Charter Arts 7, 8, 11, 52',
            score: 10
        },
        {
            n: 'C-623/17', ecli: 'ECLI:EU:C:2020:790', name: 'Privacy International',
            court: 'CJEU', date: '2020-10-06',
            subject: 'Data retention; national security; bulk data collection',
            kw: 'general and indiscriminate retention; national security; electronic communications',
            head: 'EU law precludes national legislation requiring providers of electronic communications services to carry out general and indiscriminate transmission and retention of traffic data and location data for purposes of national security.',
            ruling: 'General and indiscriminate data retention for national security is incompatible with EU law. Targeted retention and real-time collection may be permitted under strict conditions.',
            cited: 'Directive 2002/58/EC; Charter Arts 7, 8, 11, 52; TEU Art 4(2)',
            score: 9
        },
        {
            n: 'C-673/17', ecli: 'ECLI:EU:C:2019:801', name: 'Planet49 (Cookie Consent)',
            court: 'CJEU', date: '2019-10-01',
            subject: 'Cookies; consent; ePrivacy; data protection',
            kw: 'cookies; consent; pre-ticked checkboxes; ePrivacy Directive',
            head: 'Consent for the storage of cookies or similar technologies must be actively given. A pre-ticked checkbox does not constitute valid consent.',
            ruling: 'Pre-ticked checkboxes are not valid consent for cookies. Consent must be freely given, specific, informed, and an unambiguous indication of the data subject wishes.',
            cited: 'Directive 2002/58/EC Art 5(3); GDPR Art 6(1)(a); Directive 95/46/EC Art 2(h)',
            score: 8
        },
        {
            n: 'C-340/21', ecli: 'ECLI:EU:C:2023:986', name: 'Natsionalna agentsia za prihodite (Bulgarian DPA)',
            court: 'CJEU', date: '2023-12-14',
            subject: 'Data breach; compensation; GDPR enforcement',
            kw: 'data breach; non-material damage; fear; compensation; GDPR Article 82',
            head: 'The mere fear of a possible misuse of personal data following a cyber attack may constitute non-material damage under GDPR Article 82. The controller is not automatically liable for a data breach; the data subject must prove damage, infringement and causal link.',
            ruling: 'Fear of data misuse after a breach constitutes compensable non-material damage. Controllers are not automatically liable; they may demonstrate they are not responsible for the event causing the damage.',
            cited: 'GDPR Arts 5, 24, 32, 82',
            score: 8
        },
        {
            n: 'C-252/21', ecli: 'ECLI:EU:C:2023:537', name: 'Meta Platforms (Bundeskartellamt)',
            court: 'CJEU', date: '2023-07-04',
            subject: 'Competition law; data protection; dominant position; consent',
            kw: 'competition; GDPR; dominant position; data combination; consent',
            head: 'A competition authority may, in the exercise of its competences, find that the general terms of use of a company holding a dominant position relating to the processing of personal data are not consistent with the GDPR, where that finding is necessary to establish an abuse of a dominant position.',
            ruling: 'Competition authorities may assess GDPR compliance when investigating abuse of dominance. A dominant platform cannot condition service access on consent to data combination across services when no alternative is offered.',
            cited: 'GDPR Arts 6, 9; TFEU Art 102; Charter Arts 7, 8',
            score: 9
        },
        {
            n: 'C-40/17', ecli: 'ECLI:EU:C:2019:629', name: 'Fashion ID',
            court: 'CJEU', date: '2019-07-29',
            subject: 'Joint controllership; social plugins; Facebook Like button',
            kw: 'joint controller; social plugin; Like button; data collection; legitimate interest',
            head: 'A website operator embedding a social plugin that causes the browser to transmit personal data to the plugin provider is a joint controller with the plugin provider for the data collection and transmission stage.',
            ruling: 'Website operators embedding third-party social plugins are joint controllers for the collection and transmission of data. They must obtain valid consent or demonstrate legitimate interest for their part of the processing.',
            cited: 'Directive 95/46/EC Arts 2, 7, 10; GDPR Arts 4, 26',
            score: 8
        },
        {
            n: 'C-507/17', ecli: 'ECLI:EU:C:2019:772', name: 'Google v CNIL (Territorial Scope of De-referencing)',
            court: 'CJEU', date: '2019-09-24',
            subject: 'Right to de-referencing; territorial scope; search engines',
            kw: 'de-referencing; territorial scope; EU versions; global de-listing',
            head: 'EU law does not require a search engine operator to carry out de-referencing on all versions of its search engine. It must de-reference on all EU Member State versions and implement measures to ensure effective protection of EU data subject rights.',
            ruling: 'The right to de-referencing does not extend globally. De-referencing must apply across all EU/EEA versions of the search engine with geo-blocking measures to discourage circumvention.',
            cited: 'GDPR Art 17; Directive 95/46/EC; Charter Arts 7, 8, 11',
            score: 8
        },
        {
            n: 'C-26/13', ecli: 'ECLI:EU:C:2014:2370', name: 'Kasztner (Kone)',
            court: 'CJEU', date: '2014-06-05',
            subject: 'Competition law; cartel damages; umbrella pricing',
            kw: 'cartel; damages; umbrella pricing; causal link',
            head: 'EU competition law does not preclude an interpretation of national law that allows persons harmed by umbrella pricing to claim damages from cartel members.',
            ruling: 'Umbrella pricing claims are permissible under EU law. Cartel members may be liable for price increases charged by non-participants influenced by the cartel.',
            cited: 'TFEU Art 101',
            score: 7
        },
        {
            n: 'C-176/12', ecli: 'ECLI:EU:C:2014:2', name: 'Association de mediation sociale',
            court: 'CJEU', date: '2014-01-15',
            subject: 'Horizontal direct effect; Charter; information and consultation rights',
            kw: 'Charter Article 27; direct effect; horizontal application; workers rights',
            head: 'Article 27 of the Charter of Fundamental Rights on workers right to information and consultation cannot be invoked in disputes between private parties to disapply a national provision incompatible with a directive.',
            ruling: 'Charter Art 27 does not have horizontal direct effect. It cannot alone be used to set aside national legislation that conflicts with the directive on information and consultation of workers.',
            cited: 'Charter Art 27; Directive 2002/14/EC',
            score: 7
        },
        {
            n: 'C-236/09', ecli: 'ECLI:EU:C:2011:100', name: 'Association Belge des Consommateurs Test-Achats',
            court: 'CJEU', date: '2011-03-01',
            subject: 'Gender equality; insurance premiums; discrimination',
            kw: 'gender equality; insurance; discrimination; actuarial factors',
            head: 'Article 5(2) of Directive 2004/113/EC permitting Member States to allow proportionate differences in insurance premiums and benefits based on sex is invalid after a transitional period.',
            ruling: 'Use of sex as an actuarial factor in insurance pricing is invalid under the Charter and Gender Goods and Services Directive after 21 December 2012.',
            cited: 'Charter Arts 21, 23; Directive 2004/113/EC Art 5(2)',
            score: 7
        },
    ];
    for (const c of cases) {
        insertCase.run(c.n, c.ecli, c.name, c.court, c.date, c.subject, c.kw, c.head, c.ruling, c.cited, c.score);
    }
    console.log(`    CJEU cases: ${cases.length}`);
}
