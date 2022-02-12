DROP TABLE IF EXISTS maps_favourites CASCADE;
CREATE TABLE maps_favourites (
  id SERIAL PRIMARY KEY,
  -- CONSTRAINT owner_id FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  time_created TIMESTAMP
);
