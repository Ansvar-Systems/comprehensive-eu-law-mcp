import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import Database from 'better-sqlite3';
import path from 'path';
import { handleToolCall } from '../../src/tools/registry.js';

/**
 * Golden contract tests for comprehensive-eu-law-mcp.
 *
 * These tests run against the production database to verify that
 * all tools return correct results. They serve as a regression
 * safety net after data ingestion or schema changes.
 */
describe('Golden Contract Tests — Production Database', () => {
  let db: Database.Database;

  beforeAll(() => {
    const dbPath = path.resolve(__dirname, '../../data/database.db');
    db = new Database(dbPath, { readonly: true });
    db.pragma('foreign_keys = ON');
  });

  afterAll(() => {
    db.close();
  });

  // ── search (2) ──────────────────────────────────────────────────────

  it('search_eu_law returns results for "personal data"', () => {
    const result = handleToolCall(db, 'search_eu_law', { query: 'personal data' }) as any;
    expect(result.results).toBeDefined();
    expect(result.results.length).toBeGreaterThan(0);
    expect(result.count).toBeGreaterThan(0);
    expect(result._meta).toBeDefined();
    expect(result._meta.disclaimer).toBeTruthy();
    expect(result._meta.data_age).toBeTruthy();
  });

  it('search_eu_law filters by act_type regulation', () => {
    const result = handleToolCall(db, 'search_eu_law', {
      query: 'data',
      act_type: 'regulation',
    }) as any;
    expect(result.results.length).toBeGreaterThan(0);
    const allRegulations = result.results.every((r: any) => r.act_type === 'regulation');
    expect(allRegulations).toBe(true);
  });

  // ── data retrieval (3) ────────────────────────────────────────────

  it('list_sources returns all 17 acts', () => {
    const result = handleToolCall(db, 'list_sources', {}) as any;
    expect(result.acts).toBeDefined();
    expect(result.totals.acts).toBe(17);
    expect(result.totals.articles).toBe(235);
    expect(result.totals.cases).toBe(13);
    expect(result.totals.transposition_records).toBe(10);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  it('about returns valid format with name, version, stats', () => {
    const result = handleToolCall(db, 'about', {}) as any;
    expect(result.server).toBe('comprehensive-eu-law-mcp');
    expect(result.version).toBe('0.1.0');
    expect(result.coverage).toBeDefined();
    expect(result.coverage.total_acts).toBe(17);
    expect(result.coverage.total_articles).toBe(235);
    expect(result._meta).toBeDefined();
    expect(result._meta.disclaimer).toBeTruthy();
    expect(result._meta.data_age).toBeTruthy();
  });

  it('check_data_freshness returns build date and record counts', () => {
    const result = handleToolCall(db, 'check_data_freshness', {}) as any;
    expect(result.build_date).toBeTruthy();
    expect(result.build_date).not.toBe('unknown');
    expect(result.schema_version).toBe('1.0');
    expect(result.record_counts).toBeDefined();
    expect(result.record_counts.acts).toBe(17);
    expect(result.record_counts.articles).toBe(235);
    expect(result.record_counts.cases).toBe(13);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── article lookup (1) ────────────────────────────────────────────

  it('get_article retrieves Article 5 GDPR', () => {
    const result = handleToolCall(db, 'get_article', {
      act: 'GDPR',
      article: '5',
    }) as any;
    expect(result.article).toBeDefined();
    expect(result.article.article_number).toBe('5');
    expect(result.article.title).toBe('Principles relating to processing');
    expect(result.article.content).toBeTruthy();
    expect(result.act.short_title).toBe('GDPR');
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── regulation / directive (2) ────────────────────────────────────

  it('get_regulation retrieves GDPR metadata', () => {
    const result = handleToolCall(db, 'get_regulation', {
      identifier: 'GDPR',
    }) as any;
    expect(result.regulation).toBeDefined();
    expect(result.regulation.short_title).toBe('GDPR');
    expect(result.regulation.title).toBeTruthy();
    expect(result.article_count).toBeGreaterThan(0);
    expect(result.articles).toBeDefined();
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  it('get_directive retrieves NIS2 with transposition data', () => {
    const result = handleToolCall(db, 'get_directive', {
      identifier: 'NIS2',
    }) as any;
    expect(result.directive).toBeDefined();
    expect(result.directive.short_title).toBe('NIS2');
    expect(result.directive.title).toBeTruthy();
    expect(result.transposition_summary).toBeDefined();
    expect(result.transposition_summary.total).toBe(10);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── case law (1) ──────────────────────────────────────────────────

  it('get_case_law retrieves Schrems II (C-311/18)', () => {
    const result = handleToolCall(db, 'get_case_law', {
      case_number: 'C-311/18',
    }) as any;
    expect(result.case).toBeDefined();
    expect(result.case.case_number).toBe('C-311/18');
    expect(result.case.case_name).toBe('Schrems II');
    expect(result.case.court).toBe('CJEU');
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── transposition (1) ─────────────────────────────────────────────

  it('get_transposition_status returns NIS2 status for BE', () => {
    const result = handleToolCall(db, 'get_transposition_status', {
      directive: 'NIS2',
      member_state: 'BE',
    }) as any;
    expect(result.directive.short_title).toBe('NIS2');
    expect(result.member_state_filter).toBe('BE');
    expect(result.count).toBe(1);
    expect(result.results[0].status).toBe('transposed');
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── cross-reference (1) ───────────────────────────────────────────

  it('build_legal_stance aggregates provisions for a question', () => {
    const result = handleToolCall(db, 'build_legal_stance', {
      query: 'data protection',
    }) as any;
    expect(result.query).toBe('data protection');
    expect(result.legislation).toBeDefined();
    expect(result.legislation.count).toBeGreaterThan(0);
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });

  // ── negative tests (2) ────────────────────────────────────────────

  it('returns empty results for nonsensical search', () => {
    const result = handleToolCall(db, 'search_eu_law', {
      query: 'xyzzy9999qqq',
    }) as any;
    expect(result.results.length).toBe(0);
    expect(result.count).toBe(0);
  });

  it('throws for non-existent article', () => {
    expect(() => {
      handleToolCall(db, 'get_article', {
        act: 'GDPR',
        article: '999',
      });
    }).toThrow();
  });

  // ── validate_citation (1) ─────────────────────────────────────────

  it('validate_citation confirms Article 5 GDPR', () => {
    const result = handleToolCall(db, 'validate_citation', {
      citation: 'Article 5 GDPR',
    }) as any;
    expect(result.valid).toBe(true);
    expect(result.type).toBe('legislation');
    expect(result.parsed).toBeDefined();
    expect(result.match).toBeDefined();
    expect(result._meta).toBeDefined();
    expect(result._meta.data_age).toBeTruthy();
  });
});
