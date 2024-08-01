// Import required dependencies
const { app, request, database } = require("../config");

// Test suite for the GET /api/users/all route
describe("GET /api/users/all", () => {
  it("should fetch users successfully", async () => {
    // Mock empty users returned from the database
    const users = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [users]);

    // Send a GET request to the /api/users/all endpoint
    const response = await request(app).get("/api/users/all");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(users);
  });
});

// Test suite for the GET /api/users/user/:id route
describe("GET /api/users/user/:id", () => {
  it("should fetch a single user successfully", async () => {
    // Mock users returned from the database
    const users = [{}];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [users]);

    // Send a GET request to the /api/users/:id endpoint
    const response = await request(app).get(`/api/users/user/1`);

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(users[0]);
  });

  it("should return 404 for non-existent user", async () => {
    // Mock empty users returned from the database
    const users = [];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => [users]);

    // Send a GET request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).get("/api/users/user/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not found");
  });
});

// Test suite for the PUT /api/users/user/:id route
describe("PUT /api/users/user/:id", () => {
  it("should update a user successfully", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a PUT request to the /api/users/:id endpoint
    const response = await request(app).put("/api/users/user/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User updated successfully");
  });

  it("should return 404 for non-existent user", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 0 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a PUT request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).put("/api/users/user/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not found");
  });
});

// Test suite for the DELETE /api/users/user/:id route
describe("DELETE /api/users/user/:id", () => {
  it("should delete a user successfully", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 1 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a DELETE request to the /api/users/:id endpoint
    const response = await request(app).delete("/api/users/user/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User deleted successfully");
  });

  it("should return 404 for non-existent user", async () => {
    // Mock the result of the database query
    const result = [{ affectedRows: 0 }];

    // Mock the implementation of the database query method
    jest.spyOn(database, "query").mockImplementation(() => result);

    // Send a DELETE request to the /api/users/:id endpoint with an invalid ID
    const response = await request(app).delete("/api/users/user/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("User not found");
  });
});
