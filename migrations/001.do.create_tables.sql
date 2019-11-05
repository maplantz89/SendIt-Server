CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL, 
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE climbs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER 
    REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  attempts INTEGER NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT now(), 
  location TEXT NOT NULL,
  video bytea,
  favorite BOOLEAN DEFAULT false,
  difficulty INTEGER CHECK (difficulty>=0 and difficulty <= 10)
);