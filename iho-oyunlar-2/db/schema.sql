
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  title_tr TEXT NOT NULL,
  title_ar TEXT,
  description_tr TEXT
);
CREATE TABLE IF NOT EXISTS vocabulary (
  id TEXT PRIMARY KEY,
  ar TEXT NOT NULL,
  ar_clean TEXT NOT NULL,
  tr TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(id),
  pos TEXT,
  emoji TEXT,
  translit TEXT,
  examples_json TEXT,
  tags_json TEXT,
  source_pages_json TEXT,
  forms_json TEXT,
  note_tr TEXT,
  audio_key TEXT
);
CREATE INDEX IF NOT EXISTS idx_vocabulary_category ON vocabulary(category);
CREATE INDEX IF NOT EXISTS idx_vocabulary_ar_clean ON vocabulary(ar_clean);
CREATE TABLE IF NOT EXISTS patterns (
  id TEXT PRIMARY KEY,
  title_tr TEXT NOT NULL,
  title_ar TEXT,
  pattern_ar TEXT NOT NULL,
  pattern_tr TEXT,
  examples_json TEXT,
  slots_json TEXT,
  note_tr TEXT,
  source_pages_json TEXT,
  tags_json TEXT,
  audio_key TEXT
);
CREATE TABLE IF NOT EXISTS sentences (
  id TEXT PRIMARY KEY,
  ar TEXT NOT NULL,
  ar_clean TEXT NOT NULL,
  tr TEXT NOT NULL,
  pattern_id TEXT REFERENCES patterns(id),
  difficulty TEXT,
  source_pages_json TEXT,
  tags_json TEXT,
  tokens_json TEXT,
  audio_key TEXT
);
CREATE INDEX IF NOT EXISTS idx_sentences_pattern ON sentences(pattern_id);
CREATE TABLE IF NOT EXISTS dialogues (
  id TEXT PRIMARY KEY,
  title_tr TEXT NOT NULL,
  title_ar TEXT,
  context_tr TEXT,
  source_pages_json TEXT,
  tags_json TEXT
);
CREATE TABLE IF NOT EXISTS dialogue_lines (
  id TEXT PRIMARY KEY,
  dialogue_id TEXT NOT NULL REFERENCES dialogues(id) ON DELETE CASCADE,
  line_no INTEGER NOT NULL,
  speaker TEXT,
  ar TEXT NOT NULL,
  tr TEXT,
  audio_key TEXT,
  UNIQUE(dialogue_id, line_no)
);
CREATE TABLE IF NOT EXISTS price_sets (
  id TEXT PRIMARY KEY,
  title_tr TEXT,
  currency TEXT,
  source_pages_json TEXT,
  items_json TEXT
);
CREATE TABLE IF NOT EXISTS game_configs (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title_tr TEXT NOT NULL,
  title_ar TEXT,
  instructions_tr TEXT,
  config_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS game_banks (
  id TEXT PRIMARY KEY,
  bank_type TEXT NOT NULL,
  payload_json TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS audio_manifest (
  audio_key TEXT PRIMARY KEY,
  text_ar TEXT NOT NULL,
  type TEXT NOT NULL,
  path TEXT,
  extra_json TEXT
);
