DROP TABLE IF EXISTS points CASCADE;
CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description VARCHAR(255),
  image_url VARCHAR(255),
  time_created TIMESTAMP DEFAULT NOW(),
  latitude INTEGER NOT NULL,
  longitude INTEGER NOT NULL
  -- creator
);
