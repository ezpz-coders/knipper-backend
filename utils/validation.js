/**
 *
 * @param {string} email
 * @returns {boolean}
 */
const emailValidate = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 *
 * @param {string} password
 * @description takes unhashed password and checks if it has 8-16 characters ,uppercase,symbol lowercase
 * @returns {boolean}
 */
const passwordValidate = (password) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
  return re.test(password)
}

module.exports = {
  emailValidate,
  passwordValidate
}
