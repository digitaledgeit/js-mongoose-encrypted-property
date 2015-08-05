var assert    = require('assert');
var encrypt   = require('../lib/cipher').encrypt;
var decrypt   = require('../lib/cipher').decrypt;

describe('encryption', function() {

  describe('encrypt', function() {

    it('two different keys with the same plaintext should not produce the same encoded output', function() {
      assert.notEqual(encrypt('key #1', 'plain text'), encrypt('key #2', 'plain text'));
    });

    it('two different strings with the same keys should not produce the same encoded output', function() {
      assert.notEqual(encrypt('key', 'plain text #1'), encrypt('key', 'plain text #2'));
    });

    it('plaintext should be encoded', function() {
      assert.equal(encrypt('key', 'plain text'), 'b6c220b77ed1020a8877f76b4d53879c');
    });

  });

  describe('decrypt', function() {

    it('ciphertext should be decoded', function() {
      assert.equal(decrypt('key', 'b6c220b77ed1020a8877f76b4d53879c'), 'plain text');
    });

  });

});