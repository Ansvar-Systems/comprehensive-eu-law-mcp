import Database from 'better-sqlite3';
import { readFileSync, statSync, mkdirSync, existsSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { seedData } from './seed-data.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'database.db');
const SCHEMA_PATH = join(__dirname, 'schema.sql');
// Ensure data directory exists
const dataDir = dirname(DB_PATH);
if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
}
// Remove existing database
if (existsSync(DB_PATH)) {
    unlinkSync(DB_PATH);
}
console.log('Building Comprehensive EU Law MCP database...\n');
const db = new Database(DB_PATH);
// Execute schema
const schema = readFileSync(SCHEMA_PATH, 'utf-8');
db.exec(schema);
console.log('Schema created.');
// Seed data
seedData(db);
// Rebuild FTS indexes
console.log('\nRebuilding FTS indexes...');
db.exec("INSERT INTO articles_fts(articles_fts) VALUES('rebuild')");
db.exec("INSERT INTO case_law_fts(case_law_fts) VALUES('rebuild')");
console.log('FTS indexes rebuilt.');
// Insert metadata
const actCount = db.prepare('SELECT COUNT(*) as c FROM eu_acts').get().c;
const articleCount = db.prepare('SELECT COUNT(*) as c FROM articles').get().c;
const caseCount = db.prepare('SELECT COUNT(*) as c FROM case_law').get().c;
const transpositionCount = db.prepare('SELECT COUNT(*) as c FROM transposition_status').get().c;
const totalRecords = actCount + articleCount + caseCount + transpositionCount;
const insertMeta = db.prepare('INSERT OR REPLACE INTO db_metadata (key, value) VALUES (?, ?)');
insertMeta.run('tier', 'free');
insertMeta.run('schema_version', '1.0');
insertMeta.run('domain', 'comprehensive_eu_law');
insertMeta.run('record_count', String(totalRecords));
insertMeta.run('build_date', new Date().toISOString().split('T')[0]);
// Set journal mode to DELETE (required for WASM compatibility)
db.pragma('journal_mode = DELETE');
db.exec('VACUUM');
db.close();
// Report
const dbSize = statSync(DB_PATH).size;
const dbSizeMB = (dbSize / 1024 / 1024).toFixed(1);
console.log('\n=== Build Complete ===');
console.log(`EU Acts:          ${actCount}`);
console.log(`Articles:         ${articleCount}`);
console.log(`Case Law:         ${caseCount}`);
console.log(`Transposition:    ${transpositionCount}`);
console.log(`Total Records:    ${totalRecords}`);
console.log(`Database Size:    ${dbSizeMB} MB`);
console.log(`Strategy:         ${Number(dbSizeMB) < 200 ? 'A (Vercel Bundled)' : 'B (Runtime Download)'}`);
