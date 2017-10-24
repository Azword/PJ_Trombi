var express = require('express');
var router = express.Router();
var db = require('../utils/database');

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
            console.log('getAll');
            if (err) {
                console.log(err);
                response = {"error": true, "data": "Error getAll"};
            }
            else {
                console.log(data);
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
