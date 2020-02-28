var sql = require('mssql');
var db = require('../db');


let express = require('express');
let router = express.Router();

let path = require('path');
let _ = require('lodash');
let httpMsgs = require('http-msgs');
let unirest = require("unirest");
let products = {};
let query;

//------------------session variable 
const session = require('express-session');

router.use(session({secret: 'secret',saveUninitialized: true,resave: true}));
var sess;


router.get('/', function(req, res, next) {
    sess = req.session;
	if(sess.username) {
		return res.redirect('/preferences');
	}

    res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.post('/search', function(req, res) {

    let data = req.body;
    console.log(data, 'datadatadaddy');

    let id = new Promise(function(result) {
        let req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search");
        let idReturn = 0;
        this.query = data.text;

        req.query({
            "offset": "0",
            "number": "10",
            "maxCalories": "5000",
            "minProtein": "0",
            "maxProtein": "100",
            "minFat": "0",
            "maxFat": "100",
            "minCarbs": "0",
            "maxCarbs": "100",
            "minCalories": "0",
            "query": this.query
        });

        req.headers({
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
        });


        req.end(function(res) {
            if (res.error) throw new Error(res.error);
            idReturn = res.body.products[0].id;
            result(idReturn);
        })
        return idReturn;
    });

    function getProduct(id) {
        let req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`);

        req.headers({
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
        });

        req.end(function(res) {
            if (res.error) throw new Error(res.error);

            products = res.body.badges;
            console.log(products)
                // return module.exports.result = products;
        });

    }

    id.then(function(value) {
        getProduct(value)
    });

    httpMsgs.sendJSON(req, res, {
        from: 'Server',
        products: products
    });
});
// router.get('/products', function(req, res) {
// res.sendFile(path.join(__dirname, "/../views/products.html"));
// console.log(getRoute);
// let html = '<p>';
// _.forEach(products.getProducts, function(value) {
//     html += value + '</br>'
// });
// html += '</p>';
//     res.send('<html>' + html + '</html>');
// });



// login -------------------------------------------------------------------------

router.post('/signup', function(req, res) {
    var results;
    var username = req.body.username;
    var password = req.body.password;
    sql.connect(db).then(pool => {
        return pool.request()
            .input('username', sql.VarChar(30), username)
            .input('password', sql.VarChar(30), password)
            .output('returnValue', sql.VarChar(50))
            .execute('usp_Users_UserLogin')
    }).then(result => {
        console.log(result)
        results = result
        console.log(results)
        if (result.output.returnValue == 1) {  
            sess = req.session;
            sess.username = req.body.username;
            console.log(sess);
            res.redirect('/preferences');
            httpMsgs.sendJSON(req, res, {
                from: 'Server',
                username: sess.username
            });
            console.log(username, 'heheheheh')
            
        } else {
            console.log('error')
        }
    }).catch(err => {
        console.log(err)
    })

});

// ***
// register -----------------------------------------------------------
// ***

router.post('/register', function(req, res) {
    var results;
    var username2 = req.body.username2;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAddress = req.body.emailAddress;
    var password = req.body.password;
    sql.connect(db).then(pool => {
        return pool.request()
            .input('username', sql.VarChar(30), username2)
            .input('password', sql.VarChar(30), password)
            .input('firstName', sql.VarChar(30), firstName)
            .input('lastName', sql.VarChar(30), lastName)
            .input('emailAddress', sql.VarChar(30), emailAddress)
            .output('returnValue', sql.VarChar(50))
            .execute('usp_Users_CreateNewUser')
    }).then(result => {
        console.log(result)
        results = result;
        console.log(results)
        if (result.output.returnValue == 1) {
            res.redirect('/preferences');
        } else {
            console.log('error')
        }
    }).catch(err => {
        console.log(err)
    })

});
module.exports = router;


