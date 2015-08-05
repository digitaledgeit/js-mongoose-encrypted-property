var encrypt = require('./cipher').encrypt;
var decrypt = require('./cipher').decrypt;

/**
 * Encrypted property plugin
 * @param   {Schema}  schema
 * @param   {Object}  options
 * @param   {string}  options.encryptionKey
 * @param   {string}  options.plaintextProperty
 * @param   {string}  [options.encryptedProperty]
 */
module.exports = function(schema, options) {
	options = options || {};

	if (!options.encryptionKey) {
		throw new Error('Option `option.encryptionKey` is not defined.');
	}

	if (!options.plaintextProperty) {
		throw new Error('Option `option.plaintextProperty` is not defined.');
	}

	var encryptionKey     = options.encryptionKey;
	var plaintextProperty = options.plaintextProperty;
	var encryptedProperty = options.encryptedProperty || 'encrypted_'+options.plaintextProperty;

	//add a property for the encrypted value
	var dfn = {};
	dfn[encryptedProperty] = 'String';
	schema.add(dfn);

	//add a virtual property for the plaintext value
	schema.virtual(plaintextProperty)
		.get(function() {
			if (this[encryptedProperty]) {
				return JSON.parse(decrypt(encryptionKey, this[encryptedProperty]));
			}
		})
		.set(function(value) {
			this[encryptedProperty] = encrypt(encryptionKey, JSON.stringify(value));
		})
	;

};
