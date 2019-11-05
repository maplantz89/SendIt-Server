BEGIN;

TRUNCATE
  users,
  climbs
  RESTART IDENTITY CASCADE;

  INSERT INTO users(username, email, password)
  VALUES
  ('Martha', 'martha@gmail.com', 'password'),
  ('Aaron', 'aaron@gmail.com', 'hubbie'),
  ('Graham', 'graham@gmail.com', 'brother'),
  ('Mike', 'mike@gmail.com', 'friend'),
  ('Gary', 'gary@gmail.com', 'brother-in-law');

  INSERT INTO climbs(user_id, attempts, location, video, favorite, difficulty)
  VALUES 
  -- (1, 2, 'Mesa Rim', bytea('C:\1.png'), true, 'VB'),
  (2, 4, 'Vital Cbad', null, false, 3),
  (3, 2, 'Mesa Rim', null, true, 0),
  (1, 1, 'The Wall', null, false, 2),
  (5, 5, 'Mesa Rim', null, false, 4), 
  (2, 3, 'Mesa Rim', null, true, 1),
  (4, 2, 'Mesa Rim', null, true, 0),
  (1, 6, 'Mesa Rim', null, true, 4);

  COMMIT;