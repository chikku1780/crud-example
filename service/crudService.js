const mongoJs = require('mongojs')

const crud = {};

const config = require('./config');

const db = mongoJs(config.database.name);
const collectionUser = db.collection(config.collection.user);

crud.insertRecordIntoUsers = function (doc, cb) {
    collectionUser.insert(doc, function (err, resp) {
        cb(err, resp);
    });
};

crud.getAllRecordsFromUsers = function (cb) {
    collectionUser.find({}, function (err, resp) {
        cb(err, resp);
    });
};

crud.getRecordsFromUsers = function (where, cb) {
    collectionUser.find(where, function (err, resp) {
        cb(err, resp);
    });
};


module.exports = crud;