const mongoClient = require("mongodb").MongoClient;
var exports = module.exports = {};

const url = 'mongodb://localhost/trombi'

/*
    => Return a JSON's of player
    get(collection, id, callback);
        collection -> collection's name
        id -> user's id
        callback -> result
*/
exports.get = function(collection, id, callback) {
  if (!collection || !id)
    return callback(null);
  mongoClient.connect(url, function(error, db) {
    if (error) {
      console.log(error);
      return callback(null);
    }
    db.collection(collection).findOne({uid: id}, function(err, res) {
      if (err) {
        console.log(err);
        funcCallback(res);
        throw err;
      }
      return callback(res);
    })
    db.close();
  });
}


/*
    => Return a JSON's of all players
    getAll(collection, id, callback);
        collection -> collection's name
        callback -> result
*/
exports.getAll = function(collection, callback) {
  if (!collection)
    return callback(null);
  mongoClient.connect(url, function(error, db) {
    if (error) {
      console.log(error);
      return callback(null);
    }
    db.collection(collection).find({}).toArray(function(err, res) {
      if (err) {
        console.log(err);
        callback(null);
        throw err;
      }
      return callback(res);
    })
  });
}



exports.delete = function (collection, id, callback) {
  if (!collection || !id) {
    return callback(null);
  }
  mongoClient.connect(url, function (error, db) {
      if (error) {
        console.log(error);
        return callback(null);
      }
      db.collection(collection).remove({uid: id}, function (err, data) {
          if (err) {
            console.log(err);
            return callback(null);
          } else {
            return callback(data);
          }
      });
  })
}


exports.create = function (collection, content, callback) {
  if (!content || !collection) {
    return callback(null);
  }
  mongoClient.connect(url, function (error, db) {
    if (error) {
      console.log(error);
      return callback(null);
    }
    db.collection(collection).insert(content, function (err, data) {
        if (err) {
          console.log(err);
          return callback(null);
        } else {
          return callback(data);
        }
    })
    db.close();
  })
}


/*
    => Set a key to value
    set(collection, id, key, value);
        collection -> collection's name
        id -> player's id
        key -> Key to insert or update
        value -> value of the key
*/
exports.set = function (collection, id, key, value) {
  if (!collection || !id || !key || !value)
    return;
  mongoClient.connect(url, function(error, db) {
    if (error) {
      console.log(error);
      return callback(null);
    }
    db.collection(collection).update({uid: id}, {'$set' : { [key]: value }});
    db.close();
  });
}


/*
    => Add value to key, key is created if not existe
    add(collection, id, key, value);
        collection -> collection's name
        id -> player's id
        key -> Key to update
        value -> value of the key to add
*/
exports.add = function (collection, id, key, value) {
  if (!collection || !id || !key || !value)
    return;
  exports.get(collection, id, function(response) {
    var tmp = null;
    if (response.hasOwnProperty(key)) {
      tmp = parseInt(response[key]) + parseInt(value);
    } else {
      tmp = value;
    }
    exports.set(collection, id, key, tmp);
  })
}
