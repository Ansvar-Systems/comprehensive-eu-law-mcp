# Comprehensive EU Law MCP Server

<!-- ANSVAR-CTA-BEGIN -->
> ### ▶ Try this MCP instantly via Ansvar Gateway
> **50 free queries/day · no card required · OAuth signup at [ansvar.eu/gateway](https://ansvar.eu/gateway)**
>
> One endpoint, one OAuth signup, access from any MCP-compatible client.

### Connect

**Claude Code** (one line):

```bash
claude mcp add ansvar --transport http https://gateway.ansvar.eu/mcp
```

**Claude Desktop / Cursor** — add to `claude_desktop_config.json` (or `mcp.json`):

```json
{
  "mcpServers": {
    "ansvar": {
      "type": "url",
      "url": "https://gateway.ansvar.eu/mcp"
    }
  }
}
```

**Claude.ai** — Settings → Connectors → Add custom connector → paste `https://gateway.ansvar.eu/mcp`

First request opens an OAuth flow at [ansvar.eu/gateway](https://ansvar.eu/gateway). After signup, your client is bound to your account; tier (free / premium / team / company) determines fan-out, quota, and which downstream MCPs are reachable.

---

## Self-host this MCP

You can also clone this repo and build the corpus yourself. The schema,
fetcher, and tool implementations all live here. What is not in the repo is
the pre-built database — TDM and standards-licensing constraints on the
upstream sources mean we host the corpus on Ansvar infrastructure rather
than redistribute it as a public artifact.

Build your own: run this repo's ingestion script (entry-point varies per
repo — typically `scripts/ingest.sh`, `npm run ingest`, or `make ingest`;
check the repo root).
<!-- ANSVAR-CTA-END -->


MCP server providing structured access to EU treaties, regulations, directives, and CJEU case law through the [Model Context Protocol](https://modelcontextprotocol.io).

Covers the TEU, TFEU, Charter of Fundamental Rights, 30+ key regulations (GDPR, AI Act, DORA, DMA, DSA, MiCA, etc.), 20+ key directives (NIS 2, CSRD, PSD2, etc.), and landmark CJEU cases. All data sourced from EUR-Lex and CJEU public databases.

## Quick Start

### Remote (Streamable HTTP — no install)

Connect directly to the hosted instance:

### Local (npx — runs on your machine)

Requires Node.js 18+.

## Tools

14 tools for searching and retrieving EU legislation and case law.

| Tool | Description |
|------|-------------|
| `search_eu_law` | Full-text search across all EU law articles (treaties, regulations, directives). Filter by act type or specific act. |
| `get_article` | Get a specific article by act short title and article number (e.g., act="GDPR", article="5"). |
| `get_regulation` | Get EU regulation metadata with article count and key provisions overview. |
| `get_directive` | Get EU directive metadata with transposition status overview across member states. |
| `get_case_law` | Get a CJEU or General Court case by case number or ECLI identifier. |
| `search_case_law` | Search CJEU cases by keyword, subject matter, or cited act. Filter by court and importance. |
| `get_transposition_status` | Check directive transposition status for a specific member state or all member states. |
| `get_regulatory_technical_standard` | Get delegated or implementing acts adopted under a parent regulation (e.g., DORA RTS, GDPR SCCs). |
| `get_commission_proposal` | Reference pending legislative proposals with current procedural status. |
| `build_legal_stance` | Aggregate provisions and case law for a legal question, returning relevant articles and cases ranked by relevance. |
| `validate_citation` | Validate an EU law citation against the database (e.g., "Article 5(1) GDPR", "Art. 101 TFEU"). |
| `list_sources` | List all available data sources with record counts by category. |
| `check_data_freshness` | Check when the database was last built and what it covers. |
| `about` | Server metadata, data coverage, disclaimer, and freshness information. |

## Data Coverage

### Treaties

- **Treaty on European Union (TEU)** — institutional framework, common foreign and security policy
- **Treaty on the Functioning of the European Union (TFEU)** — internal market, competition, free movement
- **Charter of Fundamental Rights** — rights, freedoms, and principles

### Key Regulations

GDPR, AI Act, DORA, DMA, DSA, MiCA, Data Act, Data Governance Act, Cyber Resilience Act, EMIR, EU Taxonomy, SFDR, and more.

### Key Directives

NIS 2, CSRD, PSD2, Whistleblower Directive, Trade Secrets Directive, Anti-Money Laundering Directives, and more.

### Case Law

Landmark CJEU and General Court cases with case numbers, ECLI identifiers, headnotes, ruling summaries, and importance scores.

### Transposition Tracking

Directive transposition status per member state, including national implementing measures and notification dates.

## Data Sources

All data is compiled from publicly available official EU sources:

- **EUR-Lex** — Official Journal of the EU, legislative texts, CELEX numbers
- **CJEU / InfoCuria** — Court of Justice case law and opinions
- **European Council / Commission** — legislative proposals and procedural status

Data is a point-in-time snapshot. Check `check_data_freshness` for the build date.

## Examples

### Search for GDPR data transfer rules

```
Tool: search_eu_law
Input: { "query": "personal data transfer third country", "act_type": "regulation" }
```

### Get a specific GDPR article

```
Tool: get_article
Input: { "act": "GDPR", "article": "45" }
```

### Check NIS 2 transposition in Germany

```
Tool: get_transposition_status
Input: { "directive": "NIS 2", "member_state": "DE" }
```

### Validate a citation

```
Tool: validate_citation
Input: { "citation": "Article 101 TFEU" }
```

### Build a legal stance

```
Tool: build_legal_stance
Input: { "query": "What are the conditions for lawful processing of personal data?" }
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run locally (stdio)
npm start

# Run in development mode
npm run dev

# Build the database from seed data
npm run build:db
```

### Testing with MCP Inspector

```bash
npx @anthropic/mcp-inspector node dist/index.js
```

## Architecture

- **Database:** Read-only SQLite with FTS5 full-text search indexes
- **Transport:** Stdio (local) and Streamable HTTP (remote)
- **Runtime:** Node.js 18+, TypeScript, `@modelcontextprotocol/sdk`
- **No external API calls at runtime** — all data served from the local database

## Disclaimer

This server provides reference information about EU legislation. It does **not** constitute legal advice. All legal information must be independently verified against official EUR-Lex publications before professional use. See [DISCLAIMER.md](DISCLAIMER.md).

## Privacy

This MCP server collects no user data. No telemetry, no tracking, no analytics. See [PRIVACY.md](PRIVACY.md).

## Security

For vulnerability reports, see [SECURITY.md](SECURITY.md). Do not open public issues for security matters.

## License

Apache License 2.0. See [LICENSE](LICENSE).

---

