var crypto = require('crypto');

/**
 * Encrypt some text
 * @param   {String} key
 * @param   {String} plaintext
 * @returns {String}
 */
function encrypt(key, plaintext) {
	var cipher = crypto.createCipher('aes-256-cbc', key);
	var encrypted = cipher.update(plaintext,'utf8','hex');
	encrypted += cipher.final('hex');
	return encrypted;
};

/**
 * Decrypt some text
 * @param   {String} key
 * @param   {String} ciphertext
 * @returns {String}
 */
function decrypt(key, ciphertext) {
	var decipher = crypto.createDecipher('aes-256-cbc', key);
	var decrypted = decipher.update(ciphertext,'hex','utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
};

/**
 * Encrypted property plugin
 * @param   {Schema}  schema
 * @param   {Object}  options
 * @param   {Object}  options.encryptionKey
 * @param   {Object}  options.plaintextProperty
 * @param   {Object}  options.encryptedproperty
 */
module.exports = function(schema, options) {
	options = options || {};

	if (!options.encryptionKey) {
		throw new Error('Option `option.encryptionKey` is not defined.');
	}

	if (!options.plaintextProperty) {
		throw new Error('Option `option.plaintextProperty` is not defined.');
	}

	if (!options.encryptedproperty) {
		throw new Error('Option `option.encryptedproperty` is not defined.');
	}

	var encryptionKey     = options.encryptionKey;
	var plaintextProperty = options.plaintextProperty;
	var encryptedproperty = options.encryptedproperty;

	//add a property for the encrypted value
	var dfn = {};
	dfn[encryptedproperty] = 'String';
	schema.add(dfn);

	//add a virtual property for the plaintext value
	schema.virtual(plaintextProperty)
		.get(function() {
			if (this[encryptedproperty]) {
				return JSON.parse(decrypt(encryptionKey, this[encryptedproperty]));
			}
		})
		.set(function(value) {
			this[encryptedproperty] = encrypt(encryptionKey, JSON.stringify(value));
		})
	;

};
