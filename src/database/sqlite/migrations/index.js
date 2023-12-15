const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');
const createMovieNotes = require('./createMovieNotes');
const createMovieTags = require('./createMovieTags');

async function migrationsRun() {
  const enableForeignKey = `PRAGMA foreign_keys = ON;`;
  const schemas = [createUsers, createMovieNotes, createMovieTags].join('');

  sqliteConnection()
    .then(db => {
      db.exec(enableForeignKey, err => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Foreign key support enabled.');
      });
      db.exec(schemas);
    })
    .catch(error => console.error(error));
}

module.exports = migrationsRun;
