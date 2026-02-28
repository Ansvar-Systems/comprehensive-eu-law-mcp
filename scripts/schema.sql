-- Comprehensive EU Law MCP Database Schema
-- Version 1.0

-- EU legislative acts (treaties, regulations, directives, decisions, recommendations)
CREATE TABLE eu_acts (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  short_title TEXT,
  celex_number TEXT,
  act_type TEXT NOT NULL CHECK (act_type IN ('treaty', 'regulation', 'directive', 'decision', 'recommendation')),
  official_journal_ref TEXT,
  adoption_date TEXT,
  entry_into_force_date TEXT,
  status TEXT DEFAULT 'in_force',
  subject_matter TEXT,
  legal_basis TEXT,
  url TEXT
);

-- Individual articles within acts
CREATE TABLE articles (
  id INTEGER PRIMARY KEY,
  act_id INTEGER NOT NULL REFERENCES eu_acts(id),
  article_number TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  part TEXT,
  chapter TEXT,
  section TEXT,
  paragraph TEXT
);

-- CJEU and General Court case law
CREATE TABLE case_law (
  id INTEGER PRIMARY KEY,
  case_number TEXT NOT NULL,
  ecli TEXT,
  case_name TEXT NOT NULL,
  court TEXT NOT NULL CHECK (court IN ('CJEU', 'General_Court')),
  judgment_date TEXT,
  subject_matter TEXT,
  keywords TEXT,
  headnotes TEXT,
  ruling_summary TEXT,
  cited_acts TEXT,
  importance_score INTEGER DEFAULT 5
);

-- Directive transposition tracking by member state
CREATE TABLE transposition_status (
  id INTEGER PRIMARY KEY,
  directive_id INTEGER NOT NULL REFERENCES eu_acts(id),
  member_state TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('transposed', 'partial', 'not_transposed', 'infringement')),
  national_measure TEXT,
  notification_date TEXT,
  notes TEXT
);

-- Database metadata
CREATE TABLE db_metadata (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Full-text search on articles
CREATE VIRTUAL TABLE articles_fts USING fts5(
  article_number, title, content,
  content='articles',
  content_rowid='id',
  tokenize='unicode61'
);

-- Full-text search on case law
CREATE VIRTUAL TABLE case_law_fts USING fts5(
  case_number, case_name, headnotes, ruling_summary,
  content='case_law',
  content_rowid='id',
  tokenize='unicode61'
);

-- Indexes for common queries
CREATE INDEX idx_acts_type ON eu_acts(act_type);
CREATE INDEX idx_acts_celex ON eu_acts(celex_number);
CREATE INDEX idx_acts_short_title ON eu_acts(short_title);
CREATE INDEX idx_acts_status ON eu_acts(status);
CREATE INDEX idx_articles_act_id ON articles(act_id);
CREATE INDEX idx_articles_number ON articles(article_number);
CREATE INDEX idx_articles_part ON articles(part);
CREATE INDEX idx_articles_chapter ON articles(chapter);
CREATE INDEX idx_case_law_number ON case_law(case_number);
CREATE INDEX idx_case_law_court ON case_law(court);
CREATE INDEX idx_case_law_ecli ON case_law(ecli);
CREATE INDEX idx_case_law_importance ON case_law(importance_score);
CREATE INDEX idx_transposition_directive ON transposition_status(directive_id);
CREATE INDEX idx_transposition_state ON transposition_status(member_state);
CREATE INDEX idx_transposition_status ON transposition_status(status);
