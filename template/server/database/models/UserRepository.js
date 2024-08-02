const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "User" });
  }

  async createUser({ email, password }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password) VALUES (?, ?)`,
      [email, password]
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

  async updateUser(id, { email, password }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ?, password = ? WHERE id = ?`,
      [email, password, id]
    );

    return result.affectedRows;
  }

  async deleteUser(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = UserRepository;
