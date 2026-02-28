import { searchEuLaw } from './search-eu-law.js';
import { getArticle } from './get-article.js';
import { getRegulation } from './get-regulation.js';
import { getDirective } from './get-directive.js';
import { getCaseLaw } from './get-case-law.js';
import { listSources } from './list-sources.js';
import { about } from './about.js';
import { checkDataFreshness } from './check-data-freshness.js';
import { getTranspositionStatus } from './get-transposition-status.js';
import { getRegulatoryTechnicalStandard } from './get-regulatory-technical-standard.js';
import { getCommissionProposal } from './get-commission-proposal.js';
import { searchCaseLaw } from './search-case-law.js';
import { buildLegalStance } from './build-legal-stance.js';
import { validateCitation } from './validate-citation.js';
export const TOOL_DEFINITIONS = [
    {
        name: 'search_eu_law',
        description: 'Full-text search across all EU law articles (treaties, regulations, directives). Returns matching provisions ranked by relevance.',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Search query (e.g., "personal data processing", "state aid notification")' },
                act_type: { type: 'string', enum: ['treaty', 'regulation', 'directive', 'decision', 'recommendation'], description: 'Filter by act type' },
                act_id: { type: 'number', description: 'Filter to a specific act by internal ID' },
                limit: { type: 'number', description: 'Max results (default 10, max 50)' },
            },
            required: ['query'],
        },
    },
    {
        name: 'get_article',
        description: 'Get a specific article by act short title and article number (e.g., act="GDPR", article="5" returns Article 5 GDPR)',
        inputSchema: {
            type: 'object',
            properties: {
                act: { type: 'string', description: 'Act short title or CELEX number (e.g., "GDPR", "TEU", "TFEU", "AI Act")' },
                article: { type: 'string', description: 'Article number (e.g., "5", "101", "267")' },
            },
            required: ['act', 'article'],
        },
    },
    {
        name: 'get_regulation',
        description: 'Get EU regulation metadata with article count and key provisions overview',
        inputSchema: {
            type: 'object',
            properties: {
                identifier: { type: 'string', description: 'Short title or CELEX number (e.g., "GDPR", "AI Act", "DORA", "DMA")' },
            },
            required: ['identifier'],
        },
    },
    {
        name: 'get_directive',
        description: 'Get EU directive metadata with transposition status overview across member states',
        inputSchema: {
            type: 'object',
            properties: {
                identifier: { type: 'string', description: 'Short title or CELEX number (e.g., "NIS 2", "CSRD", "PSD2")' },
            },
            required: ['identifier'],
        },
    },
    {
        name: 'get_case_law',
        description: 'Get a CJEU or General Court case by case number or ECLI',
        inputSchema: {
            type: 'object',
            properties: {
                case_number: { type: 'string', description: 'Case number (e.g., "C-311/18") or ECLI identifier' },
            },
            required: ['case_number'],
        },
    },
    {
        name: 'list_sources',
        description: 'List all available data sources with record counts by category',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'about',
        description: 'Server metadata, data coverage, disclaimer, and freshness information',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'check_data_freshness',
        description: 'Check when the database was last built and what it covers',
        inputSchema: {
            type: 'object',
            properties: {},
        },
    },
    {
        name: 'get_transposition_status',
        description: 'Check directive transposition status for a specific member state or all member states',
        inputSchema: {
            type: 'object',
            properties: {
                directive: { type: 'string', description: 'Directive short title (e.g., "NIS 2", "Whistleblower Directive")' },
                member_state: { type: 'string', description: 'ISO 3166-1 alpha-2 country code (e.g., "DE", "FR"). Omit for all states.' },
            },
            required: ['directive'],
        },
    },
    {
        name: 'get_regulatory_technical_standard',
        description: 'Get delegated or implementing acts adopted under a parent regulation (e.g., DORA RTS, GDPR SCCs)',
        inputSchema: {
            type: 'object',
            properties: {
                parent_regulation: { type: 'string', description: 'Parent regulation short title (e.g., "DORA", "GDPR", "MiCA")' },
            },
            required: ['parent_regulation'],
        },
    },
    {
        name: 'get_commission_proposal',
        description: 'Reference pending legislative proposals with current procedural status',
        inputSchema: {
            type: 'object',
            properties: {
                identifier: { type: 'string', description: 'Proposal short title or subject (e.g., "ePrivacy", "Digital Euro", "EHDS")' },
            },
            required: ['identifier'],
        },
    },
    {
        name: 'search_case_law',
        description: 'Search CJEU cases by keyword, subject matter, or cited act',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Search query (e.g., "data transfer third country", "abuse dominant position")' },
                court: { type: 'string', enum: ['CJEU', 'General_Court'], description: 'Filter by court' },
                min_importance: { type: 'number', description: 'Minimum importance score (1-10, default 1)' },
                limit: { type: 'number', description: 'Max results (default 10, max 50)' },
            },
            required: ['query'],
        },
    },
    {
        name: 'build_legal_stance',
        description: 'Aggregate provisions and case law for a legal question, returning relevant articles and cases ranked by relevance',
        inputSchema: {
            type: 'object',
            properties: {
                query: { type: 'string', description: 'Legal question (e.g., "What are the conditions for lawful data transfer to the US?")' },
                limit: { type: 'number', description: 'Max results per category (default 5, max 20)' },
            },
            required: ['query'],
        },
    },
    {
        name: 'validate_citation',
        description: 'Validate an EU law citation against the database (e.g., "Article 5(1) GDPR", "Art. 101 TFEU")',
        inputSchema: {
            type: 'object',
            properties: {
                citation: { type: 'string', description: 'Citation to validate (e.g., "Article 5(1) GDPR", "Art. 267 TFEU", "C-311/18")' },
            },
            required: ['citation'],
        },
    },
];
export function handleToolCall(db, name, args) {
    switch (name) {
        case 'search_eu_law':
            return searchEuLaw(db, args);
        case 'get_article':
            return getArticle(db, args);
        case 'get_regulation':
            return getRegulation(db, args);
        case 'get_directive':
            return getDirective(db, args);
        case 'get_case_law':
            return getCaseLaw(db, args);
        case 'list_sources':
            return listSources(db);
        case 'about':
            return about(db);
        case 'check_data_freshness':
            return checkDataFreshness(db);
        case 'get_transposition_status':
            return getTranspositionStatus(db, args);
        case 'get_regulatory_technical_standard':
            return getRegulatoryTechnicalStandard(db, args);
        case 'get_commission_proposal':
            return getCommissionProposal(db, args);
        case 'search_case_law':
            return searchCaseLaw(db, args);
        case 'build_legal_stance':
            return buildLegalStance(db, args);
        case 'validate_citation':
            return validateCitation(db, args);
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
}
