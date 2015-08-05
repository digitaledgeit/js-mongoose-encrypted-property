var crypto = require('crypto');

/**
 * Encrypt some text
 * @param   {string} key
 * @param   {string} plaintext
 * @returns {string}
 */
function encrypt(key, plaintext) {
  //TODO: salt keys to prevent dictionary attacks https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password
  var cipher = crypto.createCipher('aes-256-cbc', key);
  cipher.write(plaintext, 'utf8');
  cipher.end();
  return cipher.read().toString('hex');
}

/**
 * Decrypt some text
 * @param   {string} key
 * @param   {string} ciphertext
 * @returns {string}
 */
function decrypt(key, ciphertext) {
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  decipher.write(ciphertext, 'hex');
  decipher.end();
  return decipher.read().toString('utf8');
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};