var crypto = require('crypto');

/**
 * Encrypt some text
 * @param   {String} key
 * @param   {String} plaintext
 * @returns {String}
 */
function encrypt(key, plaintext) {
  var cipher = crypto.createCipher('aes-256-cbc', key); //TODO: salt keys to prevent dictionary attacks https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password
  var encrypted = cipher.update(plaintext, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

/**
 * Decrypt some text
 * @param   {String} key
 * @param   {String} ciphertext
 * @returns {String}
 */
function decrypt(key, ciphertext) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(ciphertext, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};