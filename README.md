# mongoose-encrypted-property

Encrypt any property in a mongoose model.  

    var mongoose = require('mongoose');
    var plugin = require('mongoose-encrypted-property');

    schema = new mongoose.Schema({
        title:  String
    });

    schema.plugin(plugin, {
        encryptionKey:      'password',
        plaintextProperty:  'plaintext',
        encryptedproperty:  'encrypted'
    });
    
    var Model = mongoose.model('Model', schema);
    var model = new Model();
    
    // sets the `encrypted` property to the `JSON.stringify`ied and encrypted contents of `plaintext`.
    model.plaintext = {un: 'username', pw: 'password'}; 
    
    // gets the `encrypted` property to the `JSON.stringify`ied and encrypted contents of `plaintext`.
    console.log(model.plaintext);
