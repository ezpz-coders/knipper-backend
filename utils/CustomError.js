/**
 * module description
 * @module CustomError Class for handling api errors
 */
class CustomError extends Error {
  //the class constructor
  /**
   * takes a status code and message and returns an error object
   * @param  {number} httpStatusCode http status code to throw
   * @param  {string} message message to send as error
   */
  constructor(httpStatusCode, message) {
    super();
    this.httpStatusCode = httpStatusCode;
    this.message = message;
  }
}

module.exports = CustomError;
