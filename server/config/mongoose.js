const mongoose = require('mongoose');
const crypto = require('crypto')

module.exports = function (config) {
    mongoose.connect(config.db)

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
    console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        salt: String,
        hashed_pwd: String
    });
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            User.create({firstName: 'Roni', lastName: 'Test', username:'ronitest'});
            User.create({firstName: 'Jonfake', lastName: 'Testfake', username:'jonfake'});
            User.create({firstName: 'Toni', lastName: 'Fakerson', username:'tonifakerson'});

        }
    })
};
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}

