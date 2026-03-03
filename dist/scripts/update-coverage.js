#!/usr/bin/env tsx
/**
 * Update data/coverage.json with current database statistics.
 * Stub: prints current counts without modifying coverage.json.
 */
import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'database.db');
const db = new Database(dbPath, { readonly: true });
const acts = db.prepare('SELECT COUNT(*) as c FROM eu_acts').get().c;
const articles = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
const cases = db.prepare('SELECT COUNT(*) as c FROM case_law').get().c;
const transposition = db.prepare('SELECT COUNT(*) as c FROM transposition_status').get().c;
console.log(`[coverage:update] Acts: ${acts}, Articles: ${articles}, Cases: ${cases}, Transposition: ${transposition}`);
console.log('[coverage:update] Total:', acts + articles + cases + transposition);
console.log('[coverage:update] Stub — manual update of data/coverage.json required for now.');
db.close();
process.exit(0);
