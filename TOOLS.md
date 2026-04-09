# Tools — Comprehensive EU Law MCP

14 tools for searching and retrieving EU legislation, directives, regulations, treaties, and CJEU case law.

---

## 1. search_eu_law

Full-text search across all EU law articles (treaties, regulations, directives). Returns matching provisions ranked by relevance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Search query (e.g., "personal data processing", "state aid notification") |
| `act_type` | string | No | Filter by act type: `treaty`, `regulation`, `directive`, `decision`, `recommendation` |
| `act_id` | number | No | Filter to a specific act by internal ID |
| `limit` | number | No | Max results (default 10, max 50) |

**Returns:** Matching provisions ranked by relevance with document context and snippets.

---

## 2. get_article

Get a specific article by act short title and article number.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `act` | string | Yes | Act short title or CELEX number (e.g., "GDPR", "TEU", "TFEU", "AI Act") |
| `article` | string | Yes | Article number (e.g., "5", "101", "267") |

**Returns:** Full article text with document metadata.

**Example:** `act="GDPR", article="5"` returns Article 5 GDPR.

---

## 3. get_regulation

Get EU regulation metadata with article count and key provisions overview.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `identifier` | string | Yes | Short title or CELEX number (e.g., "GDPR", "AI Act", "DORA", "DMA") |

**Returns:** Regulation metadata, article count, and key provisions overview.

---

## 4. get_directive

Get EU directive metadata with transposition status overview across member states.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `identifier` | string | Yes | Short title or CELEX number (e.g., "NIS 2", "CSRD", "PSD2") |

**Returns:** Directive metadata and transposition status overview.

---

## 5. get_case_law

Get a CJEU or General Court case by case number or ECLI.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `case_number` | string | Yes | Case number (e.g., "C-311/18") or ECLI identifier |

**Returns:** Case metadata, judgment summary, and key holdings.

---

## 6. list_sources

List all available data sources with record counts by category.

**Returns:** Source authority, coverage scope, document/provision counts, and build date.

---

## 7. about

Server metadata, data coverage, disclaimer, and freshness information.

**Returns:** Document/provision counts, build date, source authority, and database version.

---

## 8. check_data_freshness

Check when the database was last built and what it covers.

**Returns:** Database build timestamp, coverage summary, and staleness warnings if applicable.

---

## 9. get_transposition_status

Check directive transposition status for a specific member state or all member states.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `directive` | string | Yes | Directive short title (e.g., "NIS 2", "Whistleblower Directive") |
| `member_state` | string | No | ISO 3166-1 alpha-2 country code (e.g., "DE", "FR"). Omit for all states. |

**Returns:** Transposition status per member state with implementation deadline and status.

---

## 10. get_regulatory_technical_standard

Get delegated or implementing acts adopted under a parent regulation (e.g., DORA RTS, GDPR SCCs).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parent_regulation` | string | Yes | Parent regulation short title (e.g., "DORA", "GDPR", "MiCA") |

**Returns:** List of delegated/implementing acts with titles and status.

---

## 11. get_commission_proposal

Reference pending legislative proposals with current procedural status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `identifier` | string | Yes | Proposal short title or subject (e.g., "ePrivacy", "Digital Euro", "EHDS") |

**Returns:** Proposal metadata, current procedural stage, and key provisions.

---

## 12. search_case_law

Search CJEU cases by keyword, subject matter, or cited act.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Search query (e.g., "data transfer third country", "abuse dominant position") |
| `court` | string | No | Filter by court: `CJEU`, `General_Court` |
| `min_importance` | number | No | Minimum importance score (1–10, default 1) |
| `limit` | number | No | Max results (default 10, max 50) |

**Returns:** Matching cases ranked by relevance with case summaries.

---

## 13. build_legal_stance

Aggregate provisions and case law for a legal question, returning relevant articles and cases ranked by relevance.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | Yes | Legal question (e.g., "What are the conditions for lawful data transfer to the US?") |
| `limit` | number | No | Max results per category (default 5, max 20) |

**Returns:** Aggregated relevant provisions and cases from multiple acts.

---

## 14. validate_citation

Validate an EU law citation against the database (zero-hallucination check).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `citation` | string | Yes | Citation to validate (e.g., "Article 5(1) GDPR", "Art. 267 TFEU", "C-311/18") |

**Returns:** Whether the cited act and article exist, with canonical reference if found.
