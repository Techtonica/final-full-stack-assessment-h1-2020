const pgp = require('pg-promise')();

/**
 * An object that has methods matching useful database queries.
 * Use `this.db` to access a connected pg-promise connection.
 * Make sure to return the promise!
 *
 * For examples of other queries, see
 * [pghttps://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
 */
class BooktonicaDatabase {
  /**
   * @param {String} name - name of database to connect to
   */
  constructor(name) {
    const connectionString = `postgres://localhost:5432/${name}`;
    console.log('Postgres DB => ', connectionString);
    this.db = pgp(connectionString);
  }

  sanityCheck() {
    console.log('\tTesting database connection...');
    return this.getBooksCount().then(count =>
      console.log(`\t✔️ Found ${count} books.`)
    );
  }

  getBooksCount() {
    return this.db.one('SELECT count(*) FROM books').then(r => r.count);
  }

  getLikeCounts() {
    return this.db.any(`
      SELECT l.book_id, 
        CAST(COUNT(l.book_id) AS INTEGER) AS like_count
        FROM likes l
        INNER JOIN books b ON b.id = l.book_id
        GROUP BY l.book_id
    `);
  }

  addLike(bookId, username) {
    return this.db
      .one(
        `
      INSERT INTO likes 
        (book_id, liked_by_user_id) 
          SELECT $1, u.id FROM users u WHERE u.username = $2
        RETURNING (id)
    `,
        [bookId, username]
      )
      .then(result => true);
  }

  getUser(username) {
    return this.db
      .any(
        `
      SELECT l.book_id 
        FROM likes l
        INNER JOIN users u ON u.id = l.liked_by_user_id
        WHERE u.username = $1
    `,
        username
      )
      .then(likeRows => {
        return this.db
          .one('SELECT * FROM users WHERE username = $1', username)
          .then(user => {
            const likedBookIds = likeRows.map(row => row.book_id);
            return {
              ...user,
              likedBookIds
            };
          });
      });
  }

  putUser(username) {
    return this.db
      .oneOrNone('SELECT * FROM users WHERE username = $1', username)
      .then(existingUser => {
        if (existingUser) {
          return false;
        }
        return this.db
          .none('INSERT INTO users (username) VALUES ($1)', username)
          .then(() => true);
      });
  }

  getAllUsers() {
    return this.db.any('SELECT * FROM USERS');
  }

  getAllBooks() {
    return this.db.any(
      `SELECT 
          b.id AS book_id,
          b.title,
          b.subtitle,
          b.summary,
          b.cover_image_url,
          to_char(b.publication_date, 'DD Mon YYYY') as publication_date, 
          a.name AS author_name,
          COUNT(b.id) AS like_count
        FROM books b 
          INNER JOIN authors a on a.id = b.author_id
          INNER JOIN likes l on l.book_id = b.id
        GROUP BY b.id, a.id
        ORDER BY b.publication_date DESC`
    );
  }
}

module.exports = BooktonicaDatabase;
