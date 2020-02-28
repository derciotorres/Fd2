var sql = require('mssql');
var db = require('../db');


let express = require('express');
let router = express.Router();
let path = require('path');
let _ = require('lodash');
const app = express();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../views/preferences.html'))
});

router.all('/preferences', (req, res) => {
    let sess = req.session;
	if(sess.username) {
        // res.write(`<h1>Hello ${sess.username} </h1><br>`);
        console.log(sess);
    
	}
	else {
		// res.write('<h1>Please login first.</h1>');
		// res.end('<a href='+'/'+'>Login</a>');
	}
}); 

// --------------request
router.get('/grabit', function(req, res) {
	console.log("here")
	var results;
    var username2 = req.body.username;
    var firstName = req.body.Fname;
    var lastName = req.body.Lname;
	var emailAddress = req.body.emailAddress;
	var emailAddress = req.body.emailAddress;
	var test = req.body.test;
	
	
    sql.connect(db).then(pool => {
		console.log("here")
		return pool.request()
       .input('username', sql.VarChar(30), username2)
            .input('firstName', sql.VarChar(30), firstName)
            .input('lastName', sql.VarChar(30), lastName)
            .input('emailAddress', sql.VarChar(30), emailAddress)
            //.output('returnValue', sql.VarChar(50))
			.execute('usp_Users_GetFullUserData')
			
    }).then(result => {
        console.log(result.recordset.username)
        results = result;
;
        // if (result.output.returnValue == 1) {
        //     // res.redirect('/preferences');
        // } else {
        //     console.log('error')
        // }
    }).catch(err => {
        console.log(err);
    })

});




module.exports = router;
