let express = require('express');
let app = express();

// Body parser intilization
let bodyParser = require("body-parser");

let urlEncoder = bodyParser.urlencoded({
  extended : false
});


export { app };
