var ee = require('easy-encryption');

/**
 * Encrypted property plugin
 * @param   {Schema}  schema
 * @param   {Object}  options
 * @param   {string}  options.secret
 * @param   {string}  options.plaintextProperty
 * @param   {string}  [options.ciphertextProperty]
 */
module.exports = function(schema, options) {
	options = options || {};

	if (!options.secret && !options.encryptionKey) {
		throw new Error('Option `option.secret` is not defined.');
	}

	if (!options.plaintextProperty) {
		throw new Error('Option `option.plaintextProperty` is not defined.');
	}

	var secret              = options.secret || options.encryptionKey;
	var plaintextProperty   = options.plaintextProperty;
	var ciphertextProperty  = options.ciphertextProperty || options.encryptedProperty || 'encrypted_'+options.plaintextProperty;

	//add a property for the encrypted value
	var dfn = {};
	dfn[ciphertextProperty] = 'String';
	schema.add(dfn);

	//add a virtual property for the plaintext value
	schema.virtual(plaintextProperty)
		.get(function() {
			if (this[ciphertextProperty]) {
				return JSON.parse(ee.decrypt(secret, this[ciphertextProperty]));
			}
		})
		.set(function(value) {
			this[ciphertextProperty] = ee.encrypt(secret, JSON.stringify(value));
		})
	;

};
