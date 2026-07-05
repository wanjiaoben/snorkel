CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  source_site TEXT NOT NULL,
  requested_date TEXT,
  guests INTEGER,
  project TEXT,
  contact TEXT NOT NULL,
  remarks TEXT,
  language TEXT,
  status TEXT NOT NULL DEFAULT 'stored',
  email_status TEXT NOT NULL DEFAULT 'pending',
  email_error TEXT,
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_source_site ON inquiries(source_site);

CREATE TABLE IF NOT EXISTS inquiry_rate_limits (
  scope TEXT NOT NULL,
  bucket TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  reset_at INTEGER NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (scope, bucket)
);

CREATE INDEX IF NOT EXISTS idx_inquiry_rate_limits_reset ON inquiry_rate_limits(reset_at);
