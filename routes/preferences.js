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
module.exports = router;
