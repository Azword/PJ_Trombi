process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var dbManager = require('./utils/database');
var ldapManager = require('ldapjs');
var ldapClient = ldapManager.createClient({
  url: 'ldaps://192.168.158.39:636'
});
var uidTabLdap = [];
var cnTablLdap = [];
var mailTabLdap = [];
var goodUID = [];
opts = {
  scope: 'sub',
  attributes: ['cn', 'uid', 'mail'],
  filter: '(cn=*)'
};

update();

function update() {
  var i = 0;
  ldapClient.search('ou=people,dc=auth,dc=pagesjaunes,dc=fr', opts, function (error, result) {
    result.on('searchEntry', function (entry) {
      i++;
      uidTabLdap[i] = entry.object.uid;
      cnTablLdap[i] = entry.object.cn;
      mailTabLdap[i] = entry.object.mail;
    });
    result.on('end', function (result) {
      dbManager.getAll("employees", function (data, err) {
        if (err) {
          console.log(err);
        } else {

          var i = 1;
          var j = 0;
          var isInMongo = false;
          if (data.length !== 0) {
            while (i < uidTabLdap.length) {
              while (j < data.length) {
                if (uidTabLdap[i] === data[j].uid) {
                  goodUID.push(data[j].uid);
                  isInMongo = true;
                }
                j++;
              }
              if (!isInMongo) {
                console.log("added : " + cnTablLdap[i]);
                dbManager.create("employees", {
                  "uid": uidTabLdap[i],
                  "name": cnTablLdap[i],
                  "email": mailTabLdap[i],
                  "img": "",
                  "skills": "",
                  "quote": "",
                  "job": "",
                  "position": "",
                  "birth": "",
                  "phone": "",
                  "website": "",
                  "team": ""
                }, function (err, data) {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(data);
                  }
                })
              }
              isInMongo = false;
              j = 0;
              i++;
            }
            i = 0;
            j = 0;
            while (i < data.length) {
              while (j < goodUID.length) {
                if (data[i].uid === goodUID[j]) {
                  isInMongo = true;
                }
                j++;
              }
              if (!isInMongo) {
                console.log("Going to removed : " + data[i].uid);
                dbManager.delete("employees", data[i].uid, function (err, data) {
                  if (err)
                  console.log(err);
                  if (data) {
                    console.log(err);
                  }
                })
                console.log("removed : " + data[i]._id);
              }
              j = 0;
              isInMongo = false;
              i++;
            }
          } else {
            for (var x = 1; x < uidTabLdap.length; x++) {
              dbManager.create("employees", {
                "uid": uidTabLdap[x],
                "name": cnTablLdap[x],
                "email": mailTabLdap[x],
                "img": "",
                "skills": "",
                "quote": "",
                "job": "",
                "position": "",
                "birth": "",
                "phone": "",
                "website": "",
                "team": ""
              }, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(data);
                }
              })
            }
          }
        }
      })
    })
  });
  return;
}
