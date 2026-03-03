# Coverage — Comprehensive EU Law MCP

> Last verified: 2026-02-28 | Database version: 0.1.0

## What's Included

| Source | Authority | Items | Last Refresh | Completeness | Refresh |
|--------|-----------|------:|-------------|-------------|---------|
| EU Treaties (TEU, TFEU, Charter) | European Union | 3 | 2026-02-28 | Partial | On change |
| EU Regulations (GDPR, AI Act, DORA, DMA, DSA, Data Act, CRA, eIDAS 2.0) | European Parliament and Council of the EU | 8 | 2026-02-28 | Partial | Monthly |
| EU Directives (NIS2, PSD2, CER, ePrivacy, AI Liability, Product Liability) | European Parliament and Council of the EU | 6 | 2026-02-28 | Partial | Monthly |
| CJEU Landmark Cases | Court of Justice of the European Union | 13 | 2026-02-28 | Partial | On change |

**Total:** 14 tools, 4 sources, 275 items, ~312 KB database

## What's NOT Included

| Gap | Reason | Planned? |
|-----|--------|----------|
| Regulations and directives include selected key articles, not complete texts | Full texts are lengthy; database focuses on provisions most relevant to cybersecurity and compliance | Yes (v0.2) |
| Only 13 landmark cases included, not comprehensive CJEU jurisprudence | CJEU database is large; initial version covers high-impact cases only | Yes (v0.2) |
| Transposition tracking covers 10 member states for NIS2 only | Transposition data is manually compiled from national sources | Yes (v0.2) |
| Delegated and implementing acts (RTS/ITS) data returns empty for most regulations | Delegated acts not yet seeded — requires legal_basis cross-referencing in eu_acts table | Yes (v0.2) |
| Case law entries are editorial summaries, not full judgment text | Full judgments are lengthy and require structured extraction from curia.europa.eu | No |

## Limitations

- Data is a **snapshot** — sources update independently, and there may be a delay between upstream changes and database refresh
- EU law texts are partial — selected provisions extracted for cybersecurity and compliance focus, not comprehensive legal documents
- CJEU case law contains editorial summaries only — not full judgment text
- Transposition tracking is incomplete — currently covers NIS2 in 10 member states only
- Provision granularity varies: some documents split to article level, others to section level
- This is a **reference tool, not professional legal advice** — verify critical analysis against official EUR-Lex or curia.europa.eu sources

## Data Freshness

| Source | Refresh Schedule | Last Refresh | Freshness Window |
|--------|-----------------|-------------|------------------|
| EU Treaties | On change | 2026-02-28 | — |
| EU Regulations | Monthly | 2026-02-28 | 30 days |
| EU Directives | Monthly | 2026-02-28 | 30 days |
| CJEU Cases | On change | 2026-02-28 | — |

To check freshness programmatically, call the `check_data_freshness` tool.

To trigger a manual refresh:
```
gh workflow run ingest.yml --repo Ansvar-Systems/comprehensive-eu-law-mcp -f force=true
```
