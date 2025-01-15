const User = require('./models/User'); // Import your User model

class UserDatabase {
  /**
   * Create a new user in the database.
   * @param {Object} userData - An object containing username, password, and email.
   * @returns {Promise<Object>} The created user.
   */
  async createUser(userData) {
    try {
      const user = new User(userData);
      return await user.save(); // Save the user to the database
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  /**
   * Retrieve a user by their username.
   * @param {string} username - The username to search for.
   * @returns {Promise<Object|null>} The user object or null if not found.
   */
  async getUserByUsername(username) {
    try {
      return await User.findOne({ username }); // Find user by username
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  /**
   * Update a user's details by their username.
   * @param {string} username - The username of the user to update.
   * @param {Object} updates - An object containing the fields to update.
   * @returns {Promise<Object|null>} The updated user object or null if not found.
   */
  async updateUser(username, updates) {
    try {
      return await User.findOneAndUpdate(
        { username }, // Filter
        { $set: updates }, // Update data
        { new: true, runValidators: true } // Return the updated document and validate updates
      );
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  /**
   * Delete a user by their username.
   * @param {string} username - The username of the user to delete.
   * @returns {Promise<Object|null>} The deleted user object or null if not found.
   */
  async deleteUser(username) {
    try {
      return await User.findOneAndDelete({ username }); // Delete user by username
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

module.exports = UserDatabase;
