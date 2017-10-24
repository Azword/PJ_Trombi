
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var db = require('./database');
var ldap = require('ldapjs');
var client = ldap.createClient({
  url: 'ldaps://192.168.158.39:636'
});
opts = {
  scope: 'sub',
  attributes: ['uid', 'mail', 'ou', 'homePhone', 'jpegPhoto', 'description', 'cn', 'labeledURI', 'employeeType'],
  /**
   * mail : Email
   * ou : Team Name (Attention c'est un tableau)
   * homePhone : Téléphone
   * jpegPhoto : base64 avatar
   * description : Un mot sur vous ?
   * cn : Prénom NOM
   * employeeType : Dev, Stagiaire...
   */
  filter: '(cn=*)'
};

var tab = [];
var uidTab = [];

update();
var updateInfo = {"uid": "", "cn": "", "job": "", "quote": "", "phone": "", "website": "", "team": "", "img" : ""};

function update() {
  var i = 0;
  client.search('ou=people,dc=auth,dc=pagesjaunes,dc=fr', opts, function (error, result) {
    result.on('searchEntry', function (entry) {
      i++;
      tab[i] = entry.object.cn;
      uidTab[i] = entry.object.uid;
    });
    result.on('end', function (result) {
      printThem();
    });
  })
}

function printThem() {
  for (var n = 0; n < tab.length; n++) {
    console.log(tab[n]);
    db.create("employees", {"uid": uidTab[n], "cn": tab[n], "job": "", "quote": "", "phone": "", "website": "", "team": "", "img" : ""}, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    })
  }
}
