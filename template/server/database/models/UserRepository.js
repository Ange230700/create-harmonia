const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  async createUser({ username, password }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (username, password) VALUES (?, ?)`,
      [username, password]
    );

    return result.insertId;
  }

  async readUser(id) {
    const [users] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return users[0];
  }

  async readAllUsers() {
    const [users] = await this.database.query(`SELECT * FROM ${this.table}`);

    return users;
  }

  async updateUser(id, { username, password }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET username = ?, password = ? WHERE id = ?`,
      [username, password, id]
    );

    return result.affectedRows > 0;
  }

  async deleteUser(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows > 0;
  }
}

module.exports = UserRepository;
