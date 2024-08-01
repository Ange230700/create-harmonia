// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const ItemRepository = require("../../database/models/ItemRepository");

// Test suite for ItemRepository
describe("ItemRepository", () => {
  // Test: Check if ItemRepository extends AbstractRepository
  test("ItemRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(ItemRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.item is an instance of ItemRepository
  test("tables.Item = new ItemRepository", async () => {
    // Assertions
    expect(tables.Item instanceof ItemRepository).toBe(true);
  });

  // Test: Check if createItem method inserts data into the 'Item' table
  test("createItem => INSERT INTO", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake item data
    const fakeItem = { title: "foo", user_id: 4 };

    // Call the create method of the item repository
    const returned = await tables.Item.createItem(fakeItem);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO Item (title, user_id) VALUES (?, ?)",
      [fakeItem.title, fakeItem.user_id]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readItem method selects data from the 'item' table based on id
  test("readItem => SELECT with id", async () => {
    // Mock rows returned from the database
    const items = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [items]);

    // Call the read method of the item repository
    const returned = await tables.Item.readItem(2);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM Item WHERE id = ?",
      [2]
    );
    expect(returned).toStrictEqual(items[0]);
  });

  // Test: Check if readAllItems method selects all data from the 'item' table
  test("readAllItems => SELECT", async () => {
    // Mock empty rows returned from the database
    const items = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [items]);

    // Call the readAll method of the item repository
    const returned = await tables.Item.readAllItems();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("SELECT * FROM Item");
    expect(returned).toStrictEqual(items);
  });

  // Test: Check if updateItem method updates data in the 'item' table based on id
  test("updateItem => UPDATE with id", async () => {
    // Mock result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake item data
    const fakeItem = { title: "foo", user_id: 1 };

    // Call the update method of the item repository
    const returned = await tables.Item.updateItem(1, fakeItem);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "UPDATE Item SET title = ?, user_id = ? WHERE id = ?",
      [fakeItem.title, fakeItem.user_id, 1]
    );
    expect(returned).toBe(true);
  });

  // Test: Check if deleteItem method removes data from the 'item' table based on id
  test("deleteItem => DELETE with id", async () => {
    // Mock result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Call the delete method of the item repository
    const returned = await tables.Item.deleteItem(2);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM Item WHERE id = ?",
      [2]
    );
    expect(returned).toBe(true);
  });
});
