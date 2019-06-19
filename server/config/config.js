const path = require('path');
const rootPath = path.normalize(__dirname + '/../../')
module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/multivision',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://roni:multivision1@ds135427.mlab.com:35427/multivision',
        port: process.env.PORT || 8080
    }
}