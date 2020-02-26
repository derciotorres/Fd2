let express = require('express');
let router = express.Router();
let path = require('path');
let _ = require('lodash');
const app = express();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../views/products.html'))
});

module.exports = router;
