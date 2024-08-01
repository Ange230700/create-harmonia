// Import required dependencies
const { database, tables } = require("../config");

// Import repository classes
const AbstractRepository = require("../../database/models/AbstractRepository");
const UserRepository = require("../../database/models/UserRepository");

// Test suite for UserRepository
describe("UserRepository", () => {
  // Test: Check if UserRepository extends AbstractRepository
  test("UserRepository extends AbstractRepository", async () => {
    // Assertions
    expect(Object.getPrototypeOf(UserRepository)).toBe(AbstractRepository);
  });

  // Test: Check if tables.user is an instance of UserRepository
  test("tables.User = new UserRepository", async () => {
    // Assertions
    expect(tables.User instanceof UserRepository).toBe(true);
  });

  // Test: Check if createUser method inserts data into the 'User' table
  test("createUser => INSERT INTO", async () => {
    // Mock result of the database query
    const result = [{ insertId: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeUser = { username: "foo", password: "bar" };

    // Call the create method of the user repository
    const returned = await tables.User.createUser(fakeUser);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "INSERT INTO User (username, password) VALUES (?, ?)",
      [fakeUser.username, fakeUser.password]
    );
    expect(returned).toBe(result.insertId);
  });

  // Test: Check if readUser method selects data from the 'user' table based on id
  test("readUser => SELECT with id", async () => {
    // Mock rows returned from the database
    const users = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [users]);

    // Call the read method of the user repository
    const returned = await tables.User.readUser(4);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM User WHERE id = ?",
      [4]
    );
    expect(returned).toStrictEqual(users[0]);
  });

  // Test: Check if readAllUsers method selects data from the 'user' table based on username
  test("readUser => SELECT with username", async () => {
    // Mock rows returned from the database
    const users = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [users]);

    // Call the read method of the user repository
    const returned = await tables.User.readUser("foo");

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "SELECT * FROM User WHERE username = ?",
      ["foo"]
    );
    expect(returned).toStrictEqual(users[0]);
  });

  // Test: Check if readAllUsers method selects all data from the 'user' table
  test("readAllUsers => SELECT", async () => {
    // Mock empty rows returned from the database
    const users = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [users]);

    // Call the readAll method of the user repository
    const returned = await tables.User.readAllUsers();

    // Assertions
    expect(database.query).toHaveBeenCalledWith("SELECT * FROM User");
    expect(returned).toStrictEqual(users);
  });

  // Test: Check if updateUser method updates data in the 'user' table based on id
  test("updateUser => UPDATE with id", async () => {
    // Mock result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Fake user data
    const fakeUser = { username: "foo2", password: "bar" };

    // Call the update method of the user repository
    const returned = await tables.User.updateUser(7, fakeUser);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "UPDATE User SET username = ?, password = ? WHERE id = ?",
      [fakeUser.username, fakeUser.password, 7]
    );
    expect(returned).toBe(result.affectedRows);
  });

  // Test: Check if deleteUser method deletes data from the 'user' table based on id
  test("deleteUser => DELETE with id", async () => {
    // Mock result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [result]);

    // Call the delete method of the user repository
    const returned = await tables.User.deleteUser(4);

    // Assertions
    expect(database.query).toHaveBeenCalledWith(
      "DELETE FROM User WHERE id = ?",
      [4]
    );
    expect(returned).toBe(result.affectedRows);
  });
});
