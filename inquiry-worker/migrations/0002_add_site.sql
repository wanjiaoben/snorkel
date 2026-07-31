ALTER TABLE inquiries ADD COLUMN site TEXT;

UPDATE inquiries
SET site = CASE source_site
  WHEN 'snorkel.nice.okinawa' THEN 'snorkel'
  WHEN 'fishing.nice.okinawa' THEN 'fishing'
  WHEN 'japanusedcars.nice.okinawa' THEN 'japanusedcars'
  ELSE 'unknown'
END
WHERE site IS NULL OR site = '';

CREATE INDEX IF NOT EXISTS idx_inquiries_site ON inquiries(site);
