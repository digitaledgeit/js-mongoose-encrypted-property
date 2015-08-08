var assert    = require('assert');
var mongoose  = require('mongoose');
var plugin    = require('..');

var schema, Model, model;

describe('mongoose-encrypted-property', function() {

	beforeEach(function() {

		schema = new mongoose.Schema({
			title:  String
		});

		schema.plugin(plugin, {
			secret:             'password',
			plaintextProperty:  'plaintext'
		});

		Model = mongoose.model('Model', schema);
		model = new Model();

	});

	afterEach(function() {

		delete mongoose.models.Model;
		delete mongoose.modelSchemas.Model;

	});

	it('should throw an error if the option .secret is not specified', function() {
		assert.throws(function() {
			plugin({}, {plaintextProperty: 'plaintext'});
		}, Error, /option\.secret/);
	});

	it('should throw an error if the option .plaintextProperty is not specified', function() {
		assert.throws(function() {
      plugin({}, {secret: 'password'});
		}, Error, /option\.plaintextProperty/);
	});

  describe('getter', function() {

    it('should return undefined when the property has not been set', function() {
      assert.equal(typeof(model.plaintext), 'undefined');
    });

    it('should return an object when the property has been set', function() {

      model.plaintext = {
        oauth_token:        '###',
        oauth_token_secret: '###'
      };

      assert.deepEqual(model.plaintext, {
        oauth_token:        '###',
        oauth_token_secret: '###'
      });

    });

  });

  describe('setter', function() {

    it('should set the value on the ciphertext property', function() {

      model.plaintext = {
        oauth_token:        '###',
        oauth_token_secret: '###'
      };

      assert.equal(typeof(model.toObject().plaintext), 'undefined');

    });

    it('should not set the value on the plaintext property', function() {

      model.plaintext = {
        oauth_token:        '###',
        oauth_token_secret: '###'
      };

      assert.notEqual(typeof(model.toObject().encrypted_plaintext), 'undefined');

    });

  });

});