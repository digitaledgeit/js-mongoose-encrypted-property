# mongoose-encrypted-property

[![Circle CI](https://circleci.com/gh/digitaledgeit/js-mongoose-encrypted-property.svg?style=svg)](https://circleci.com/gh/digitaledgeit/js-mongoose-encrypted-property)

Encrypt a property on a mongoose model when at rest.

## Installation

	npm install --save mongoose-encrypted-property

## Usage

    var mongoose  = require('mongoose');
    var plugin    = require('mongoose-encrypted-property');
    
    schema = new mongoose.Schema({
      title:  String //etc
    });

    schema.plugin(plugin, {
      secret:             'password',
      plaintextProperty:  'plaintext',
      ciphertextProperty: 'encrypted_plaintext'
    });
    
    var Model = mongoose.model('Model', schema);
    var model = new Model();
    
    // set the the `encrypted_plaintext` property to be the `JSON.stringify`ied and encrypted value.
    model.plaintext = {
      oauth_token:        '###',
      oauth_token_secret: '###'
    };
    
    // get the decrypted and `JSON.parse`ed value of the `encrypted_plaintext` property.
    console.log(model.plaintext);

## Options

- **secret**: The key used for encryption.
- **plaintextProperty**: The name of the property used for getting and setting the unencrypted value during use.
- **ciphertextProperty**: The name of the property used for storing and retrieving the encrypted value at rest. Defaults to `encrypted_{plaintextProperty}`.

## Changelog

### 1.1.0

- improve security of all newly encrypted values by using the `easy-encryption` module which hashes passwords to prevent dictionary attacks - previously encrypted values will still be decrypted
- changed option names for consistency - previous option names will still work

## License

The MIT License (MIT)

Copyright (c) 2015 James Newell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.