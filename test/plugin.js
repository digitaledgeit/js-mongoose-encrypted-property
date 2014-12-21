var assert    = require('assert');
var mongoose  = require('mongoose');
var plugin    = require('..');

var schema, Model, model;

describe('mongoose-encrypted-property', function() {

	before(function(done) {
		mongoose.connect('localhost/test', done);
	});

	beforeEach(function setup(callback) {

		schema = new mongoose.Schema({
			title:  String
		});

		schema.plugin(plugin, {
			encryptionKey:      'password',
			plaintextProperty:  'plaintext'
		});

		Model = mongoose.model('Model', schema);
		model = new Model();

		callback();
	});

	afterEach(function() {

		delete mongoose.models.Model;
		delete mongoose.modelSchemas.Model;

	});

	after(function(done) {
		mongoose.disconnect(done);
	});

	it('should throw an error if not all required properties are specified', function() {
		assert.throws(function() {
			plugin({}, {});
		});
	});

	it('should not store the plaintext', function() {
		model.plaintext = {un: 'username', pw: 'password'};
		assert.equal(typeof(model.toObject().plaintext), 'undefined');
	});

	it('should store the encrypted value', function() {
		model.plaintext = {un: 'username', pw: 'password'};
		assert.notEqual(typeof(model.toObject().encrypted_plaintext), 'undefined');
	});

	it('should return undefined when the property has no value', function() {
		assert.equal(typeof(model.plaintext), 'undefined');
	});


});