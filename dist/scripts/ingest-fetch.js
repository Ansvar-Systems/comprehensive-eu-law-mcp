#!/usr/bin/env tsx
/**
 * Fetch upstream data from EUR-Lex and CJEU sources.
 * Stub: writes .ingest-changed=false until live ingestion is implemented.
 */
import { writeFileSync } from 'fs';
console.log('[ingest:fetch] Checking EUR-Lex and CJEU upstream sources...');
console.log('[ingest:fetch] Stub — no live fetching implemented yet.');
writeFileSync('.ingest-changed', 'false');
writeFileSync('.ingest-summary', 'No upstream changes detected (stub).');
process.exit(0);
