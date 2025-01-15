class Admin {
  // Private field
  #instagramAccessToken;
  #googleAccessToken;
  #username;
  #password;

  /**
   * @param {string} instagramAccessToken - The initial Instagram access token.
   * @param {string} googleAccessToken - The initial Google access token.
   * @param {string} username - The initial username.
   * @param {string} password - The initial password.
   */

  constructor(
    instagramAccessToken = null,
    googleAccessToken = null,
    username = null,
    password = null
  ) {
    this.#instagramAccessToken = this.#validateType(
      instagramAccessToken,
      "string",
      "Access token"
    );
    this.#googleAccessToken = this.#validateType(
      googleAccessToken,
      "string",
      "Access token"
    );
    this.#username = this.#validateType(username, "string", "Username");
    this.#password = this.#validateType(password, "string", "Password");
  }

  /** *
   * Validate the type of a field.
   */
  #validateType(value, expectedType, fieldName) {
    if (value !== null && typeof value !== expectedType) {
      throw new Error(`${fieldName} must be a ${expectedType}`);
    }
    return value;
  }

  /**
   * Generic method to get the value of a private field.
   * @param {string} fieldName - The name of the private field to retrieve.
   * @returns {string | null} The value of the requested field.
   */
  #getField(fieldName) {
    return this[fieldName];
  }

  /**
   * Get the Instagram access token.
   * @returns {string | null} The current Instagram access token.
   */
  getInstagramAccessToken() {
    return this.#getField("#instagramAccessToken");
  }

  /**
   * Get the Google access token.
   * @returns {string | null} The current Google access token.
   */
  getGoogleAccessToken() {
    return this.#getField("#googleAccessToken");
  }

  /**
   * Get the username.
   * @returns {string | null} The current username.
   */
  getUsername() {
    return this.#getField("#username");
  }

  /**
   * Get the password.
   * @returns {string | null} The current password.
   */
  getPassword() {
    return this.#getField("#password");
  }

  /**
   * Set the Instagram access token.
   * @param {string} token - The new Instagram access token.
   * @throws Will throw an error if the token is not a string.
   */
  setInstagramAccessToken(token) {
    if (typeof token !== "string") {
      throw new Error("Access token must be a string");
    }
    this.#instagramAccessToken = token;
  }
}

export default Admin;
