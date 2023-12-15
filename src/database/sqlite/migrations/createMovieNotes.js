const createMovieNotes = `
CREATE TABLE IF NOT EXISTS movie_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR,
  description VARCHAR,
  rating INTEGER,
  user_id INTEGER,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
 );
`;

module.exports = createMovieNotes;
