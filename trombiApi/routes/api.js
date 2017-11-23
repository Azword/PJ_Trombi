var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../utils/database');

var options = {
  uri: 'http://ioda01t.bbo1t.local:8073/api-authentification-1/token/',
  method: 'POST',
  json: {
	"username": "",
	"password": ""
  }
};

router.get('/', function (req, res) {
    res.render('index', {title: 'Express : /api'});
});

/**
 * @get : getAll()
 * @post : getUser()
 */
router.route('/search')
    .get(function (req, res) {
        var response = {};
        db.getAll('employees', function (data, err) {
            if (err) {
                console.log(err);
                response = {"error": true, "data": "Error getAll"};
            }
            else {
                response = {"error": false, "data": data};
            }
            res.json(response);
        })
    })
    .post(function (req, res) {
        var response = {};
        if (!req.body.uid) {
            response = {"error": true, "data": "No Uid found"};
            res.json(response);
        } else {
            db.get('employees', req.body.uid, function (data, err) {
                if (err || !data) {
                    console.log(err);
                    response = {"error": true, "data": (data) ? "Error getUser()" : "User not Found"};
                } else {
                    response = {"error": false, "data": data};
                }
                res.json(response);
            })
        }
    })

router.route('/login')
    .post(function (req, res) {
	var response = {};
	options.json.username = req.body.username;
	options.json.password = req.body.password;
	console.log(JSON.stringify(options));
	request.post(options, function (error, response, body) {
	console.log('aaaaa');
	if (!error && response.statusCode == 200) {
	  res.json({"error": false});
	} else {
	  res.json({"error": true});
	  console.log(error);
	}
     })
    })

/**
 * @post : updateUser()
 * @delete : deleteUser()
 */
router.route('/update')
    .post(function (req, res) {
        var response = {};
        var toUpdate = new Array(req.body.uid, req.body.team, req.body.job, req.body.quote, req.body.phone, req.body.website, req.body.img);
        console.log('Recu : ' + JSON.stringify(req.body));
        if (!req.body.uid) {
            response = {"error": true, "data": "Need : uid, key, and value"};
            res.json(response);
        }
        else {
            if (toUpdate[1]) {
                db.set('employees', req.body.uid, 'team', toUpdate[1]);
            }
            if (toUpdate[2]) {
                db.set('employees', req.body.uid, 'job', toUpdate[2]);
            }
            if (toUpdate[3]) {
                db.set('employees', req.body.uid, 'quote', toUpdate[3]);
            }
            if (toUpdate[4]) {
                db.set('employees', req.body.uid, 'phone', toUpdate[4]);
            }
            if (toUpdate[5]) {
                db.set('employees', req.body.uid, 'website', toUpdate[5]);
            }
            if (toUpdate[6]) {
                db.set('employees', req.body.uid, 'img', toUpdate[6]);
            }
            res.json('OK');
        }
    })
    .delete(function (req, res) {
        var response = {};
        if (!req.body.uid) {
            response = {"error": true, "data": "No uid"};
            res.json(response);
        } else {
            db.delete('employees', req.body.uid, function (data, err) {
                if (err) {
                    console.log(err);
                    response = {"error": true, "data": "Can't delete"};
                } else {
                    response = {"error": false, "data": data};
                }
                res.json(response);
            })
        }
    })
/**
 * @post : createUser();
 */
router.route('/manage')
    .post(function (req, res) {
        var response = {};
        db.create('employees', req.body, function (data, err) {
            if (err) {
                console.log(err);
                response = {"error": true, "data": "Can't Create"};
            } else {
                response = {"error": false, "data": data};
            }
            res.json(response);
        })
    })

module.exports = router;
