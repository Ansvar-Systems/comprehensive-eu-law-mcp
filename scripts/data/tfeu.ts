// Treaty on the Functioning of the European Union (TFEU) — key articles
import type Database from 'better-sqlite3';

export function seedTFEU(db: Database.Database): void {
  console.log('  Seeding TFEU...');

  const insertAct = db.prepare(
    `INSERT INTO eu_acts (title, short_title, celex_number, act_type, official_journal_ref, adoption_date, entry_into_force_date, status, subject_matter, legal_basis, url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertArticle = db.prepare(
    `INSERT INTO articles (act_id, article_number, title, content, part, chapter, section)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  const actId = insertAct.run(
    'Consolidated version of the Treaty on the Functioning of the European Union',
    'TFEU', '12012E/TXT', 'treaty', 'OJ C 326, 26.10.2012',
    '1957-03-25', '1958-01-01', 'in_force',
    'Operational treaty of the EU defining competences, policies, and institutional procedures',
    null, 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A12012E%2FTXT'
  ).lastInsertRowid;

  const arts: Array<[string, string, string, string, string | null, string | null]> = [
    // Part One — Principles
    ['1', 'Organisation of the functioning of the Union', 'This Treaty organises the functioning of the Union and determines the areas of, delimitation of, and arrangements for exercising its competences.', 'Part One', null, null],
    ['2', 'Categories of competences', '1. When the Treaties confer on the Union exclusive competence in a specific area, only the Union may legislate and adopt legally binding acts, the Member States being able to do so themselves only if so empowered by the Union or for the implementation of Union acts.\n2. When the Treaties confer on the Union a competence shared with the Member States in a specific area, the Union and the Member States may legislate and adopt legally binding acts in that area.', 'Part One', null, null],
    ['3', 'Exclusive competences', 'The Union shall have exclusive competence in the following areas: (a) customs union; (b) the establishing of the competition rules necessary for the functioning of the internal market; (c) monetary policy for the Member States whose currency is the euro; (d) the conservation of marine biological resources under the common fisheries policy; (e) common commercial policy.', 'Part One', null, null],
    ['4', 'Shared competences', 'The Union shall share competence with the Member States where the Treaties confer on it a competence which does not relate to the areas referred to in Articles 3 and 6. Shared competence applies in: (a) internal market; (b) social policy; (c) economic, social and territorial cohesion; (d) agriculture and fisheries; (e) environment; (f) consumer protection; (g) transport; (h) trans-European networks; (i) energy; (j) area of freedom, security and justice; (k) common safety concerns in public health matters.', 'Part One', null, null],
    ['6', 'Supporting competences', 'The Union shall have competence to carry out actions to support, coordinate or supplement the actions of the Member States. The areas of such action shall, at European level, be: (a) protection and improvement of human health; (b) industry; (c) culture; (d) tourism; (e) education, vocational training, youth and sport; (f) civil protection; (g) administrative cooperation.', 'Part One', null, null],

    // Part Two — Non-discrimination and citizenship
    ['18', 'Non-discrimination on grounds of nationality', 'Within the scope of application of the Treaties, and without prejudice to any special provisions contained therein, any discrimination on grounds of nationality shall be prohibited. The European Parliament and the Council may adopt rules designed to prohibit such discrimination.', 'Part Two', null, null],
    ['20', 'Citizenship of the Union', 'Citizenship of the Union is hereby established. Every person holding the nationality of a Member State shall be a citizen of the Union. Citizens of the Union shall enjoy the rights and be subject to the duties provided for in the Treaties.', 'Part Two', null, null],

    // Part Three — Free movement of goods
    ['26', 'Internal market', 'The Union shall adopt measures with the aim of establishing or ensuring the functioning of the internal market. The internal market shall comprise an area without internal frontiers in which the free movement of goods, persons, services and capital is ensured in accordance with the provisions of the Treaties.', 'Part Three', 'Title I', null],
    ['34', 'Prohibition of quantitative restrictions on imports', 'Quantitative restrictions on imports and all measures having equivalent effect shall be prohibited between Member States.', 'Part Three', 'Title II', null],
    ['36', 'Exceptions to free movement of goods', 'The provisions of Articles 34 and 35 shall not preclude prohibitions or restrictions on imports, exports or goods in transit justified on grounds of public morality, public policy or public security; the protection of health and life of humans, animals or plants; the protection of national treasures; or the protection of industrial and commercial property.', 'Part Three', 'Title II', null],

    // Free movement of workers
    ['45', 'Freedom of movement for workers', 'Freedom of movement for workers shall be secured within the Union. Such freedom of movement shall entail the abolition of any discrimination based on nationality between workers of the Member States as regards employment, remuneration and other conditions of work and employment.', 'Part Three', 'Title IV Ch 1', null],

    // Right of establishment
    ['49', 'Freedom of establishment', 'Within the framework of the provisions set out below, restrictions on the freedom of establishment of nationals of a Member State in the territory of another Member State shall be prohibited. Such prohibition shall also apply to restrictions on the setting-up of agencies, branches or subsidiaries by nationals of any Member State established in the territory of any Member State.', 'Part Three', 'Title IV Ch 2', null],

    // Services
    ['56', 'Freedom to provide services', 'Within the framework of the provisions set out below, restrictions on freedom to provide services within the Union shall be prohibited in respect of nationals of Member States who are established in a Member State other than that of the person for whom the services are intended.', 'Part Three', 'Title IV Ch 3', null],

    // Capital
    ['63', 'Free movement of capital', 'Within the framework of the provisions set out in this Chapter, all restrictions on the movement of capital between Member States and between Member States and third countries shall be prohibited. All restrictions on payments between Member States and between Member States and third countries shall be prohibited.', 'Part Three', 'Title IV Ch 4', null],

    // Competition
    ['101', 'Prohibition of anti-competitive agreements', '1. The following shall be prohibited as incompatible with the internal market: all agreements between undertakings, decisions by associations of undertakings and concerted practices which may affect trade between Member States and which have as their object or effect the prevention, restriction or distortion of competition within the internal market.\n2. Any agreements or decisions prohibited pursuant to this Article shall be automatically void.\n3. However, paragraph 1 may be declared inapplicable in the case of any agreement which contributes to improving the production or distribution of goods or to promoting technical or economic progress, while allowing consumers a fair share of the resulting benefit.', 'Part Three', 'Title VII Ch 1', 'Section 1'],
    ['102', 'Abuse of dominant position', 'Any abuse by one or more undertakings of a dominant position within the internal market or in a substantial part of it shall be prohibited as incompatible with the internal market in so far as it may affect trade between Member States. Such abuse may consist in: (a) imposing unfair purchase or selling prices; (b) limiting production, markets or technical development; (c) applying dissimilar conditions to equivalent transactions; (d) making contracts subject to supplementary obligations.', 'Part Three', 'Title VII Ch 1', 'Section 1'],
    ['107', 'State aid', '1. Save as otherwise provided in the Treaties, any aid granted by a Member State or through State resources in any form whatsoever which distorts or threatens to distort competition by favouring certain undertakings or the production of certain goods shall, in so far as it affects trade between Member States, be incompatible with the internal market.\n2. The following shall be compatible with the internal market: (a) aid having a social character, granted to individual consumers; (b) aid to make good the damage caused by natural disasters or exceptional occurrences; (c) aid to areas of Germany affected by division.\n3. The following may be considered compatible: (a) aid to promote development of areas with abnormally low standard of living; (b) aid to promote execution of a project of common European interest; (c) aid to facilitate development of certain economic activities or areas.', 'Part Three', 'Title VII Ch 1', 'Section 2'],

    // Approximation of laws
    ['114', 'Harmonisation for internal market', 'The European Parliament and the Council shall, acting in accordance with the ordinary legislative procedure, adopt the measures for the approximation of the provisions laid down by law, regulation or administrative action in Member States which have as their object the establishment and functioning of the internal market.', 'Part Three', 'Title VII Ch 3', null],

    // Environment
    ['191', 'Environmental policy', 'Union policy on the environment shall contribute to pursuit of the following objectives: preserving, protecting and improving the quality of the environment; protecting human health; prudent and rational utilisation of natural resources; promoting measures at international level to deal with regional or worldwide environmental problems, and in particular combating climate change.', 'Part Three', 'Title XX', null],
    ['192', 'Environmental legislation procedure', 'The European Parliament and the Council, acting in accordance with the ordinary legislative procedure, shall decide what action is to be taken by the Union in order to achieve the objectives referred to in Article 191.', 'Part Three', 'Title XX', null],
    ['193', 'National protective measures', 'The protective measures adopted pursuant to Article 192 shall not prevent any Member State from maintaining or introducing more stringent protective measures. Such measures must be compatible with the Treaties.', 'Part Three', 'Title XX', null],

    // Energy
    ['194', 'Energy policy', 'In the context of the establishment and functioning of the internal market and with regard for the need to preserve and improve the environment, Union policy on energy shall aim, in a spirit of solidarity between Member States, to: (a) ensure the functioning of the energy market; (b) ensure security of energy supply in the Union; (c) promote energy efficiency and energy saving and the development of new and renewable forms of energy; and (d) promote the interconnection of energy networks.', 'Part Three', 'Title XXI', null],

    // Common commercial policy
    ['207', 'Common commercial policy', 'The common commercial policy shall be based on uniform principles, particularly with regard to changes in tariff rates, the conclusion of tariff and trade agreements relating to trade in goods and services, and the commercial aspects of intellectual property, foreign direct investment, the achievement of uniformity in measures of liberalisation, export policy and measures to protect trade.', 'Part Three', 'Title II', null],

    // Institutional provisions
    ['288', 'Legal acts of the Union', 'To exercise the Union\'s competences, the institutions shall adopt regulations, directives, decisions, recommendations and opinions. A regulation shall have general application. It shall be binding in its entirety and directly applicable in all Member States. A directive shall be binding, as to the result to be achieved, upon each Member State to which it is addressed, but shall leave to the national authorities the choice of form and methods. A decision shall be binding in its entirety. A decision which specifies those to whom it is addressed shall be binding only on them. Recommendations and opinions shall have no binding force.', 'Part Six', 'Title I Ch 2', 'Section 1'],
    ['289', 'Legislative procedures', '1. The ordinary legislative procedure shall consist in the joint adoption by the European Parliament and the Council of a regulation, directive or decision on a proposal from the Commission.\n2. In the specific cases provided for by the Treaties, the adoption of a regulation, directive or decision by the European Parliament with the participation of the Council, or by the latter with the participation of the European Parliament, shall constitute a special legislative procedure.\n3. Legal acts adopted by legislative procedure shall constitute legislative acts.', 'Part Six', 'Title I Ch 2', 'Section 1'],
    ['290', 'Delegated acts', '1. A legislative act may delegate to the Commission the power to adopt non-legislative acts of general application to supplement or amend certain non-essential elements of the legislative act. The objectives, content, scope and duration of the delegation of power shall be explicitly defined in the legislative acts.', 'Part Six', 'Title I Ch 2', 'Section 1'],
    ['291', 'Implementing acts', '1. Member States shall adopt all measures of national law necessary to implement legally binding Union acts.\n2. Where uniform conditions for implementing legally binding Union acts are needed, those acts shall confer implementing powers on the Commission, or, in duly justified specific cases and in the cases provided for in Articles 24 and 26 TEU, on the Council.', 'Part Six', 'Title I Ch 2', 'Section 1'],

    // CJEU
    ['258', 'Infringement proceedings by Commission', 'If the Commission considers that a Member State has failed to fulfil an obligation under the Treaties, it shall deliver a reasoned opinion on the matter after giving the State concerned the opportunity to submit its observations. If the State concerned does not comply with the opinion within the period laid down by the Commission, the latter may bring the matter before the Court of Justice.', 'Part Six', 'Title I Ch 1', 'Section 5'],
    ['263', 'Action for annulment', 'The Court of Justice of the European Union shall review the legality of legislative acts, of acts of the Council, of the Commission and of the European Central Bank, other than recommendations and opinions, and of acts of the European Parliament and of the European Council intended to produce legal effects vis-a-vis third parties.', 'Part Six', 'Title I Ch 1', 'Section 5'],
    ['267', 'Preliminary ruling procedure', 'The Court of Justice of the European Union shall have jurisdiction to give preliminary rulings concerning: (a) the interpretation of the Treaties; (b) the validity and interpretation of acts of the institutions, bodies, offices or agencies of the Union. Where such a question is raised before any court or tribunal of a Member State, that court or tribunal may request the Court of Justice to give a ruling thereon. Where any such question is raised in a case pending before a court or tribunal against whose decisions there is no judicial remedy under national law, that court or tribunal shall bring the matter before the Court of Justice.', 'Part Six', 'Title I Ch 1', 'Section 5'],

    // Financial provisions
    ['310', 'Union budget principles', 'All items of revenue and expenditure of the Union shall be included in estimates to be drawn up for each financial year and shall be shown in the budget. The revenue and expenditure shown in the budget shall be in balance.', 'Part Six', 'Title II', null],
    ['325', 'Combating fraud', 'The Union and the Member States shall counter fraud and any other illegal activities affecting the financial interests of the Union through measures to be taken in accordance with this Article, which shall act as a deterrent and be such as to afford effective protection in the Member States, and in all the Union\'s institutions, bodies, offices and agencies.', 'Part Six', 'Title II', null],

    // Enhanced cooperation
    ['326', 'Enhanced cooperation', 'Any enhanced cooperation shall comply with the Treaties and Union law. Such cooperation shall not undermine the internal market or economic, social and territorial cohesion. It shall not constitute a barrier to or discrimination in trade between Member States, nor shall it distort competition between them.', 'Part Six', 'Title III', null],

    // Non-contractual liability
    ['340', 'Non-contractual liability of the Union', 'In the case of non-contractual liability, the Union shall, in accordance with the general principles common to the laws of the Member States, make good any damage caused by its institutions or by its servants in the performance of their duties.', 'Part Seven', null, null],

    // Flexibility clause
    ['352', 'Flexibility clause', 'If action by the Union should prove necessary, within the framework of the policies defined in the Treaties, to attain one of the objectives set out in the Treaties, and the Treaties have not provided the necessary powers, the Council, acting unanimously on a proposal from the Commission and after obtaining the consent of the European Parliament, shall adopt the appropriate measures.', 'Part Seven', null, null],
  ];

  for (const [num, title, content, part, chapter, section] of arts) {
    insertArticle.run(actId, num, title, content, part, chapter, section);
  }

  console.log('    TFEU: 1 act, 35 articles');
}
