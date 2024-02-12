const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

exports.mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://praveenpravi779:yyO3yd1jKBOIJ0ry@cluster0.nmphjgg.mongodb.net/shop')
    .then(client => {
      console.log('connected');
      _db = client.db() 
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    })
}

exports.getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found';
}




