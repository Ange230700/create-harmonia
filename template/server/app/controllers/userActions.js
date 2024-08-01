// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseUsers = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.User.readAllUsers();

    // Respond with the items in JSON format
    response.status(200).json(users);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readUser = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.User.readUser(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (!user) {
      response.status(404).json({ message: "User not found" });
    } else {
      response.json(user);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editUser = async (request, response, next) => {
  // Extract the item data from the request body
  const user = request.body;

  try {
    // Update the item in the database based on the provided ID
    const updated = await tables.User.updateUser(request.params.id, user);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (updated) {
      response.status(204);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addUser = async (request, response, next) => {
  // Extract the item data from the request body
  const user = request.body;

  try {
    // Add the item to the database
    const added = await tables.User.createUser(user);

    // Respond with the added item in JSON format
    response.status(201).json(added);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroyUser = async (request, response, next) => {
  try {
    // Delete the item from the database based on the provided ID
    const deleted = await tables.User.deleteUser(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (deleted) {
      response.status(204);
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Export the user-related actions
module.exports = {
  browseUsers,
  readUser,
  editUser,
  addUser,
  destroyUser,
};
