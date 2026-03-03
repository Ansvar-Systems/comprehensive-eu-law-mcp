#!/usr/bin/env tsx
/**
 * Check data freshness against configured thresholds.
 * Writes .freshness-stale (true/false) and .freshness-report.
 */
import { writeFileSync } from 'fs';
import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'data', 'database.db');
const db = new Database(dbPath, { readonly: true });
const metadata = Object.fromEntries(db.prepare('SELECT key, value FROM db_metadata').all().map((r) => [r.key, r.value]));
const buildDate = metadata['build_date'] || 'unknown';
const now = new Date();
const built = new Date(buildDate);
const daysSinceBuild = Math.floor((now.getTime() - built.getTime()) / (1000 * 60 * 60 * 24));
const staleThresholdDays = 90;
const isStale = daysSinceBuild > staleThresholdDays;
const report = [
    `# Freshness Report`,
    ``,
    `- Build date: ${buildDate}`,
    `- Days since build: ${daysSinceBuild}`,
    `- Threshold: ${staleThresholdDays} days`,
    `- Status: ${isStale ? 'STALE' : 'FRESH'}`,
].join('\n');
console.log(report);
writeFileSync('.freshness-stale', String(isStale));
writeFileSync('.freshness-report', report);
db.close();
process.exit(0);
