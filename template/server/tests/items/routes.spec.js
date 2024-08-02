// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/items/all route
describe("GET /api/items/all", () => {
  it("should fetch items successfully", async () => {
    // Mock items returned from the database
    const items = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [items]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/items/all");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(items);
  });

  it("should return 404 for no items found", async () => {
    // Mock empty items returned from the database
    const items = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [items]);

    // Send a GET request to the /api/items endpoint
    const response = await request(app).get("/api/items/all");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("No items found");
  });
});

// Test suite for the GET /api/items/item/:id route
describe("GET /api/items/item/:id", () => {
  it("should fetch a single item successfully", async () => {
    // Mock items returned from the database
    const items = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [items]);

    // Send a GET request to the /api/items/:id endpoint
    const response = await request(app).get(`/api/items/item/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(items[0]);
  });

  it("should return 404 for non-existent item", async () => {
    // Mock empty items returned from the database
    const items = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [items]);

    // Send a GET request to the /api/items/:id endpoint with an invalid ID
    const response = await request(app).get("/api/items/item/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Item not found");
  });
});

// Test suite for the PUT /api/items/item/:id route
describe("PUT /api/items/item/:id", () => {
  it("should update an item successfully", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a PUT request to the /api/items/:id endpoint with a test item
    const response = await request(app).put("/api/items/item/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Item updated successfully");
  });

  it("should return 404 for non-existent item", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 0 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a PUT request to the /api/items/:id endpoint with a test item
    const response = await request(app).put("/api/items/item/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Item not found");
  });
});

// Test suite for the POST /api/items/item route
// Doesn't pass: maybe something to change in app config :/
// Hint: enabling error log could help ;)
describe("POST /api/items/item", () => {
  it("should add a new item successfully", async () => {
    // Mock result of the database query
    const result = [{ insertId: 11 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a POST request to the /api/items endpoint with a test item
    const response = await request(app).post("/api/items/item");

    // Assertions
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Item added successfully");
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toBe(11);
  });
});

// Test suite for the DELETE /api/items/item/:id route
describe("DELETE /api/items/item/:id", () => {
  it("should delete an item successfully", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a DELETE request to the /api/items/:id endpoint
    const response = await request(app).delete("/api/items/item/2");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Item deleted successfully");
  });

  it("should return 404 for non-existent item", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 0 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a DELETE request to the /api/items/:id endpoint with an invalid ID
    const response = await request(app).delete("/api/items/item/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Item not found");
  });
});
