DROP TABLE IF EXISTS maps_contributors CASCADE;
CREATE TABLE maps_contributors (
  id SERIAL PRIMARY KEY,
  -- CONSTRAINT owner_id FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  time_created TIMESTAMP
);
