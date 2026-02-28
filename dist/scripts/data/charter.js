export function seedCharter(db) {
    console.log('  Seeding Charter of Fundamental Rights...');
    const insertAct = db.prepare(`INSERT INTO eu_acts (title, short_title, celex_number, act_type, official_journal_ref, adoption_date, entry_into_force_date, status, subject_matter, legal_basis, url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const insertArticle = db.prepare(`INSERT INTO articles (act_id, article_number, title, content, chapter)
     VALUES (?, ?, ?, ?, ?)`);
    const { lastInsertRowid: actId } = insertAct.run('Charter of Fundamental Rights of the European Union', 'EU Charter', '12012P/TXT', 'treaty', 'OJ C 326, 26.10.2012', '2000-12-07', '2009-12-01', 'in_force', 'Fundamental rights; human dignity; freedoms; equality; solidarity; citizens rights; justice', null, 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012P/TXT');
    const articles = [
        ['1', 'Human dignity', 'Human dignity is inviolable. It must be respected and protected.', 'I - Dignity'],
        ['2', 'Right to life', 'Everyone has the right to life. No one shall be condemned to the death penalty or executed.', 'I - Dignity'],
        ['3', 'Right to the integrity of the person', 'Everyone has the right to respect for his or her physical and mental integrity. In the fields of medicine and biology: informed consent, prohibition of eugenic practices, prohibition on making the human body a source of financial gain, prohibition of reproductive cloning.', 'I - Dignity'],
        ['4', 'Prohibition of torture', 'No one shall be subjected to torture or to inhuman or degrading treatment or punishment.', 'I - Dignity'],
        ['5', 'Prohibition of slavery and forced labour', 'No one shall be held in slavery or servitude. No one shall be required to perform forced or compulsory labour. Trafficking in human beings is prohibited.', 'I - Dignity'],
        ['6', 'Right to liberty and security', 'Everyone has the right to liberty and security of person.', 'II - Freedoms'],
        ['7', 'Respect for private and family life', 'Everyone has the right to respect for his or her private and family life, home and communications.', 'II - Freedoms'],
        ['8', 'Protection of personal data', 'Everyone has the right to the protection of personal data concerning him or her. Such data must be processed fairly for specified purposes on the basis of consent or other legitimate basis laid down by law. Compliance shall be subject to control by an independent authority.', 'II - Freedoms'],
        ['11', 'Freedom of expression and information', 'Everyone has the right to freedom of expression. This right shall include freedom to hold opinions and to receive and impart information and ideas. Freedom and pluralism of the media shall be respected.', 'II - Freedoms'],
        ['12', 'Freedom of assembly and of association', 'Everyone has the right to freedom of peaceful assembly and freedom of association at all levels, in particular in political, trade union and civic matters.', 'II - Freedoms'],
        ['13', 'Freedom of the arts and sciences', 'The arts and scientific research shall be free of constraint. Academic freedom shall be respected.', 'II - Freedoms'],
        ['14', 'Right to education', 'Everyone has the right to education and to have access to vocational and continuing training.', 'II - Freedoms'],
        ['15', 'Freedom to choose an occupation', 'Everyone has the right to engage in work and to pursue a freely chosen or accepted occupation.', 'II - Freedoms'],
        ['16', 'Freedom to conduct a business', 'The freedom to conduct a business in accordance with Union law and national laws and practices is recognised.', 'II - Freedoms'],
        ['17', 'Right to property', 'Everyone has the right to own, use, dispose of and bequeath his or her lawfully acquired possessions. Intellectual property shall be protected.', 'II - Freedoms'],
        ['20', 'Equality before the law', 'Everyone is equal before the law.', 'III - Equality'],
        ['21', 'Non-discrimination', 'Any discrimination based on any ground such as sex, race, colour, ethnic or social origin, genetic features, language, religion or belief, political or any other opinion, membership of a national minority, property, birth, disability, age or sexual orientation shall be prohibited.', 'III - Equality'],
        ['23', 'Equality between women and men', 'Equality between women and men must be ensured in all areas, including employment, work and pay.', 'III - Equality'],
        ['27', 'Workers right to information and consultation', 'Workers or their representatives must, at the appropriate levels, be guaranteed information and consultation in good time, in the cases and under the conditions provided for by Union law and national laws and practices.', 'IV - Solidarity'],
        ['28', 'Right of collective bargaining and action', 'Workers and employers, or their respective organisations, have the right to negotiate and conclude collective agreements and to take collective action.', 'IV - Solidarity'],
        ['31', 'Fair and just working conditions', 'Every worker has the right to working conditions which respect his or her health, safety and dignity. Every worker has the right to limitation of maximum working hours, to daily and weekly rest periods and to an annual period of paid leave.', 'IV - Solidarity'],
        ['37', 'Environmental protection', 'A high level of environmental protection and improvement of the quality of the environment must be integrated into the policies of the Union and ensured in accordance with the principle of sustainable development.', 'IV - Solidarity'],
        ['38', 'Consumer protection', 'Union policies shall ensure a high level of consumer protection.', 'IV - Solidarity'],
        ['39', 'Right to vote in EP elections', 'Every citizen of the Union has the right to vote and to stand as a candidate at elections to the European Parliament.', 'V - Citizens Rights'],
        ['41', 'Right to good administration', 'Every person has the right to have his or her affairs handled impartially, fairly and within a reasonable time by the institutions, bodies, offices and agencies of the Union.', 'V - Citizens Rights'],
        ['42', 'Right of access to documents', 'Any citizen of the Union, and any natural or legal person residing or having its registered office in a Member State, has a right of access to documents of the institutions, bodies, offices and agencies of the Union.', 'V - Citizens Rights'],
        ['47', 'Right to an effective remedy and fair trial', 'Everyone whose rights and freedoms guaranteed by the law of the Union are violated has the right to an effective remedy before a tribunal.', 'VI - Justice'],
        ['48', 'Presumption of innocence and right of defence', 'Everyone who has been charged shall be presumed innocent until proved guilty according to law. Respect for the rights of the defence of anyone who has been charged shall be guaranteed.', 'VI - Justice'],
        ['49', 'Principles of legality and proportionality of offences and penalties', 'No one shall be held guilty of any offence on account of any act or omission which did not constitute an offence under national law or international law at the time when it was committed.', 'VI - Justice'],
        ['50', 'Right not to be tried or punished twice', 'No one shall be liable to be tried or punished again in proceedings for an offence for which he or she has already been finally acquitted or convicted within the Union in accordance with the law.', 'VI - Justice'],
        ['51', 'Field of application', 'The provisions of this Charter are addressed to the institutions, bodies, offices and agencies of the Union with due regard for the principle of subsidiarity and to the Member States only when they are implementing Union law.', 'VII - General Provisions'],
        ['52', 'Scope and interpretation of rights and principles', 'Any limitation on the exercise of the rights and freedoms recognised by this Charter must be provided for by law and respect the essence of those rights and freedoms. Subject to the principle of proportionality, limitations may be made only if they are necessary and genuinely meet objectives of general interest recognised by the Union or the need to protect the rights and freedoms of others.', 'VII - General Provisions'],
        ['53', 'Level of protection', 'Nothing in this Charter shall be interpreted as restricting or adversely affecting human rights and fundamental freedoms as recognised by Union law, international law and international agreements, and by the constitutions of the Member States.', 'VII - General Provisions'],
        ['54', 'Prohibition of abuse of rights', 'Nothing in this Charter shall be interpreted as implying any right to engage in any activity or to perform any act aimed at the destruction of any of the rights and freedoms recognised in this Charter or at their limitation to a greater extent than is provided for herein.', 'VII - General Provisions'],
    ];
    for (const [num, title, content, chapter] of articles) {
        insertArticle.run(actId, num, title, content, chapter);
    }
    console.log(`    Charter: ${articles.length} articles`);
}
