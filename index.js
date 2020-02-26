// var sql = require('mssql');
// var db = require('./db');
const express = require('express');
const app = express();
const createError = require('http-errors');
var bodyParser = require('body-parser');



// let products = require('./apiCalls/getProducts');
let indexRouter = require('./routes/index');
let productsRouter = require('./routes/products');
let preferencesRouter = require('./routes/preferences');
let router = express.Router();
let path = require('path');

//app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

//render the html portion ---------------------------------------------------//
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/public/css')); //looking for the public folder
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/preferences', preferencesRouter);

//---------session 
// router.get('/',(req,res) => {
// 	sess = req.session;
// 	if(sess.username) {
// 		return res.redirect('/preferences');
// 	}
// 	res.sendFile('index.html');
// });




// router.get('/logout',(req,res) => {
// 	req.session.destroy((err) => {
// 		if(err) {
// 			return console.log(err);
// 		}
// 		res.redirect('/');
// 	});

// });




router.all('/products', (req, res) => 

{

    res.render('products.html');

});
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// app.get('/search', (req, res) => {
//     products.query = req.query;
//     let text = [];
//     text = products.getProducts;
//     console.log(text);
//     res.send(text);
// });

app.listen(4000, () => {
    //console.log(app.use(express.static(__dirname + '/public')));
    console.log('server is up at localhost:4000');
});

module.exports = app;

// ---------------------- session variable






//---------------database calls ----------------------------------///



// // login -------------------------------------------------------------------------

// app.post('/signup', function(req, res) {
//     var results;
//     var username = req.body.username;
//     var password = req.body.password;
//     sql.connect(db).then(pool => {
//         return pool.request()
//             .input('username', sql.VarChar(30), username)
//             .input('password', sql.VarChar(30), password)
//             .output('returnValue', sql.VarChar(50))
//             .execute('usp_Users_UserLogin')
//     }).then(result => {
//         //console.log(result)
//         results = result;
//         console.log(results)
//         if (result.output.returnValue == 1) {  
//             sess = req.session;
//             sess.username = req.body.username;
//             console.log(sess.username);
//             res.redirect('/preferences');
//         } else {
//             console.log('error')
//         }
//     }).catch(err => {
//         console.log(err)
//     })

// });

// // ***
// // register -----------------------------------------------------------
// // ***

// app.post('/register', function(req, res) {
//     var results;
//     var username2 = req.body.username2;
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var emailAddress = req.body.emailAddress;
//     var password = req.body.password;
//     sql.connect(db).then(pool => {
//         return pool.request()
//             .input('username', sql.VarChar(30), username2)
//             .input('password', sql.VarChar(30), password)
//             .input('firstName', sql.VarChar(30), firstName)
//             .input('lastName', sql.VarChar(30), lastName)
//             .input('emailAddress', sql.VarChar(30), emailAddress)
//             .output('returnValue', sql.VarChar(50))
//             .execute('usp_Users_CreateNewUser')
//     }).then(result => {
//         console.log(result)
//         results = result;
//         console.log(results)
//         if (result.output.returnValue == 1) {
//             res.redirect('/preferences');
//         } else {
//             console.log('error')
//         }
//     }).catch(err => {
//         console.log(err)
//     })

// });