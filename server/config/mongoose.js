const mongoose = require('mongoose');
const crypto = require('crypto');

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
        username: String,
        salt: String,
        hashed_pwd: String
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd
        }
    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'ronitest');
            User.create({firstName: 'Roni', lastName: 'Test', username:'ronitest', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'jonfake');
            User.create({firstName: 'Jonfake', lastName: 'Testfake', username:'jonfake', salt: salt, hashed_pwd: hash});
            salt = createSalt();
            hash = hashPwd(salt, 'tonifakerson');
            User.create({firstName: 'Toni', lastName: 'Fakerson', username:'tonifakerson', salt: salt, hashed_pwd: hash});

        }
    })
};
function createSalt(pwd) {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1',salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}
