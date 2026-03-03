# Comprehensive EU Law MCP

> Structured access to EU treaties, regulations, directives, and CJEU case law — 275 records from 17 legislative acts and 13 landmark cases.

[![npm](https://img.shields.io/npm/v/@ansvar/comprehensive-eu-law-mcp)](https://www.npmjs.com/package/@ansvar/comprehensive-eu-law-mcp)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)
[![CI](https://github.com/Ansvar-Systems/comprehensive-eu-law-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/comprehensive-eu-law-mcp/actions/workflows/ci.yml)

## Quick Start

### Remote (Vercel)

Use the hosted endpoint — no installation needed:

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "comprehensive-eu-law": {
      "url": "https://comprehensive-eu-law-mcp.vercel.app/mcp"
    }
  }
}
```

**Cursor / VS Code** (`.cursor/mcp.json` or `.vscode/mcp.json`):
```json
{
  "servers": {
    "comprehensive-eu-law": {
      "url": "https://comprehensive-eu-law-mcp.vercel.app/mcp"
    }
  }
}
```

### Local (npm)

Run entirely on your machine:

```bash
npx @ansvar/comprehensive-eu-law-mcp
```

**Claude Desktop** (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "comprehensive-eu-law": {
      "command": "npx",
      "args": ["-y", "@ansvar/comprehensive-eu-law-mcp"]
    }
  }
}
```

## What's Included

| Source | Act Type | Count | Articles |
|--------|----------|------:|--------:|
| TEU | Treaty | 1 | Key provisions |
| TFEU | Treaty | 1 | Key provisions |
| EU Charter | Treaty | 1 | Key provisions |
| GDPR, AI Act, DORA, DMA, DSA, Data Act, CRA, eIDAS 2.0 | Regulation | 8 | Selected |
| NIS2, PSD2, CER, ePrivacy, AI Liability, Product Liability | Directive | 6 | Selected |
| CJEU landmark cases | Case law | 13 | — |
| NIS2 transposition | Tracking | 10 | — |

**Total:** 17 acts, 235 articles, 13 CJEU cases, 10 transposition records (312KB database)

## What's NOT Included

- Full article text for all regulations and directives (selected key provisions only)
- Comprehensive CJEU jurisprudence (13 landmark cases, not full database)
- Full transposition tracking (10 member states for NIS2 only)
- Delegated and implementing acts (RTS/ITS) — legal_basis cross-referencing not yet seeded

See [data/coverage.json](data/coverage.json) for full gap analysis and limitations.

## Available Tools

| Tool | Category | Description |
|------|----------|-------------|
| `search_eu_law` | Search | FTS5 search across all EU law articles |
| `get_article` | Lookup | Get a specific article by act and number |
| `get_regulation` | Lookup | Get regulation metadata with article count |
| `get_directive` | Lookup | Get directive metadata with transposition status |
| `get_case_law` | Lookup | Get a CJEU case by case number or ECLI |
| `search_case_law` | Search | Search cases by keyword, court, importance |
| `get_transposition_status` | Lookup | Check directive transposition by member state |
| `get_regulatory_technical_standard` | Lookup | Get delegated/implementing acts under a regulation |
| `get_commission_proposal` | Lookup | Reference pending legislative proposals |
| `build_legal_stance` | Analysis | Aggregate provisions and case law for a question |
| `validate_citation` | Meta | Validate an EU law citation |
| `list_sources` | Meta | List all sources with metadata |
| `about` | Meta | Server identity and stats |
| `check_data_freshness` | Meta | Database build date and record counts |

See [TOOLS.md](TOOLS.md) for full documentation with parameters and examples.

## Data Sources & Freshness

All data is sourced from official EU institutions:

| Source | Refresh Schedule | Last Refresh |
|--------|-----------------|-------------|
| EUR-Lex (treaties) | On change | 2026-02-28 |
| EUR-Lex (regulations) | Monthly | 2026-02-28 |
| EUR-Lex (directives) | Monthly | 2026-02-28 |
| CJEU (curia.europa.eu) | On change | 2026-02-28 |
| Transposition tracker | Quarterly | 2026-02-28 |

Check freshness programmatically with the `check_data_freshness` tool.

## Security

| Layer | Tool | Trigger |
|-------|------|---------|
| Static Analysis | CodeQL | Weekly + PR |
| Pattern Detection | Semgrep | PR |
| Dependency Scan | Trivy | Weekly |
| Secret Detection | Gitleaks | PR |
| Supply Chain | OSSF Scorecard | Weekly |
| Dependencies | Dependabot | Weekly |

## Disclaimer

**This is NOT legal advice.** This tool provides structured access to EU law data for informational and research purposes only. Treaty texts and regulations are official EU documents sourced from EUR-Lex. Case law summaries are editorial and not official translations. Transposition data is compiled editorially and may not reflect the latest notifications. Always verify against EUR-Lex for binding text. See [DISCLAIMER.md](DISCLAIMER.md).

## Ansvar MCP Network

This server is part of the **Ansvar MCP Network** — 150+ MCP servers providing structured access to global legislation, compliance frameworks, and cybersecurity standards.

| Category | Servers | Examples |
|----------|---------|---------|
| EU Regulations | 1 | 49 regulations, 2,693 articles |
| US Regulations | 1 | 15 federal + state laws |
| National Law | 108+ | All EU/EEA + 30 global jurisdictions |
| Security Frameworks | 1 | 261 frameworks, 1,451 controls |
| Domain Intelligence | 6+ | Financial regulation, cybersecurity law, health law |

Explore the full network at [ansvar.ai/mcp](https://ansvar.ai/mcp)

## Development

### Branch Strategy

```
feature-branch -> PR to dev -> verify on dev -> PR to main -> deploy
```

Never push directly to `main`. All changes land on `dev` first.

### Setup

```bash
git clone https://github.com/Ansvar-Systems/comprehensive-eu-law-mcp.git
cd comprehensive-eu-law-mcp
npm install
npm run build:db
npm run build
npm test
```

### Data Pipeline

```bash
npm run ingest          # Full live ingestion
npm run build:db        # Rebuild database from seed files
npm run freshness:check # Check source freshness
npm run coverage:verify # Verify coverage consistency
npm run test:contract   # Run golden contract tests
```

## License

[Apache License 2.0](LICENSE) — Code and tooling.

**Data licenses:** EU law texts from EUR-Lex are freely available under the principle of free access to law. CJEU case summaries are editorial. Verify redistribution terms with EUR-Lex for bulk replication. See [sources.yml](sources.yml) for details.
