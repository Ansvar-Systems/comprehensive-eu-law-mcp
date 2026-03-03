#!/usr/bin/env tsx
/**
 * Compare fetched data against current database to detect changes.
 * Stub: reads .ingest-changed from ingest-fetch step.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
const changed = existsSync('.ingest-changed')
    ? readFileSync('.ingest-changed', 'utf8').trim()
    : 'false';
console.log(`[ingest:diff] Changed: ${changed}`);
if (!existsSync('.ingest-summary')) {
    writeFileSync('.ingest-summary', 'No changes detected (stub).');
}
process.exit(0);
