const AbstractRepository = require("./AbstractRepository");

class ItemRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "item" as configuration
    super({ table: "Item" });
  }

  // The C of CRUD - Create operation

  async createItem({ title, user_id }) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, user_id) VALUES (?, ?)`,
      [title, user_id]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async readItem(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [items] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return items[0];
  }

  async readAllItems() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [items] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return items;
  }

  // The U of CRUD - Update operation

  async updateItem(id, { title, user_id }) {
    // Execute the SQL UPDATE query to modify an item in the "item" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, user_id = ? WHERE id = ?`,
      [title, user_id, id]
    );

    // Return true if the item was updated successfully, false otherwise
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation

  async deleteItem(id) {
    // Execute the SQL DELETE query to remove an item from the "item" table
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return true if the item was deleted successfully, false otherwise
    return result.affectedRows;
  }
}

module.exports = ItemRepository;
