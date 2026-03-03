#!/usr/bin/env tsx
/**
 * Verify data/coverage.json matches actual database contents.
 * Checks that total_items in coverage.json matches DB record counts.
 */
import { readFileSync } from 'fs';
import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'database.db');
const coveragePath = join(__dirname, '..', 'data', 'coverage.json');

const db = new Database(dbPath, { readonly: true });
const coverage = JSON.parse(readFileSync(coveragePath, 'utf8'));

const acts = (db.prepare('SELECT COUNT(*) as c FROM eu_acts').get() as any).c;
const articles = (db.prepare('SELECT COUNT(*) as c FROM articles').get() as any).c;
const cases = (db.prepare('SELECT COUNT(*) as c FROM case_law').get() as any).c;
const transposition = (db.prepare('SELECT COUNT(*) as c FROM transposition_status').get() as any).c;
const total = acts + articles + cases + transposition;

const claimedTotal = coverage.summary?.total_items ?? 0;

console.log(`[coverage:verify] DB total: ${total}, Coverage claims: ${claimedTotal}`);

if (total !== claimedTotal) {
  console.error(`[coverage:verify] MISMATCH — DB has ${total} records, coverage.json claims ${claimedTotal}`);
  process.exit(1);
}

console.log('[coverage:verify] Coverage data is consistent.');
db.close();
process.exit(0);
