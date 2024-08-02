// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browseItems = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const items = await tables.Item.readAllItems();

    // Respond with the items in JSON format
    if (items.length === 0) {
      response.status(404).json({ message: "No items found" });
    } else {
      response.status(200).json(items);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const readItem = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const item = await tables.Item.readItem(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (!item) {
      response.status(404).json({ message: "Item not found" });
    } else {
      response.status(200).json(item);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const editItem = async (request, response, next) => {
  // Extract the item data from the request body
  const item = request.body;

  try {
    // Update the item in the database based on the provided ID
    const affectedRows = await tables.Item.updateItem(request.params.id, item);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (!affectedRows) {
      response.status(404).json({ message: "Item not found" });
    } else {
      response.status(200).json({ message: "Item updated successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const addItem = async (request, response, next) => {
  // Extract the item data from the request body
  const item = request.body;

  try {
    // Insert the item into the database
    const insertId = await tables.Item.createItem(item);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    if (!insertId) {
      response.status(400).json({ message: "Item not added" });
    } else {
      response
        .status(201)
        .json({ message: "Item added successfully", id: insertId });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroyItem = async (request, response, next) => {
  try {
    // Delete the item from the database based on the provided ID
    const affectedRows = await tables.Item.deleteItem(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (!affectedRows) {
      response.status(404).json({ message: "Item not found" });
    } else {
      response.status(200).json({ message: "Item deleted successfully" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseItems,
  readItem,
  editItem,
  addItem,
  destroyItem,
};
