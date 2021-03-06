var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger('dev'));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Set Handlebars.
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/articleScrapper';

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
//***************  MONGOOSE CONNECT ***********/
mongoose
	.connect(MONGO_URI)
	.then(() => console.log(`Mongoose connection is successful. ${MONGO_URI}`))
	.catch(err => console.log(err));

require('./routes/api-routes.js')(app);

// Start the server
app.listen(PORT, function() {
	console.log('App running on port ' + PORT + '!');
});
