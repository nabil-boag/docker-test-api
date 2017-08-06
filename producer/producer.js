// const amqp = require('amqp');

// console.log('Starting to connect to Rabbit MQ...');

// const connection = amqp.createConnection({ 
//   host: 'queue', 
//   login: 'user',
//   password: 'Passw0rd'
// },
// {
//   reconnect: false
// });

// console.log('Connection Created. Waiting for connection be ready...');

// // Wait for connection to become established.
// connection.on('ready', () => {
//   console.log('Connection ready for use. Connecting to "hello" queue...');

// 	connection.queue('hello', { autoDelete: false }, (q) => {
//     console.log('Connected to "hello" queue. Waiting for queue to become ready');
    
//     // Bind to all messages
//     q.bind('#');
    
//     q.on('queueBindOk', () => {
//       console.log('The \'hello\' queue is now ready for use. Publishing message...');
   
//       const message = `hello world @ ' + ${new Date()}`;
      
//       connection.publish('hello', message);

//       console.log(`Published message: '${message}`);
//       // Allow 1 second for the message publishing to complete
//       setTimeout(() => {

//         console.log('Disconnecting...');

//         connection.disconnect();
   
//         console.log('Disconnected. Exiting...');
//       }, 1000);      
//  		});
//   });
// });

// connection.on('error', (e) => {
//   console.log('Error from amqp: ', e);
// });

// const express = require('express');

// // Constants
// const PORT = 80;
// const HOST = '0.0.0.0';

// // App
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello world\n');
// });

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = 80; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://database/tests'); // connect to our database
var Test = require('./models/test');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /tests
// ----------------------------------------------------
router.route('/tests')

	// create a test (accessed at POST http://localhost:8080/tests)
	.post(function(req, res) {
		
		var test = new Test();		// create a new instance of the Test model
		test.name = req.body.name;  // set the tests name (comes from the request)

		test.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Test created!' });
		});

		
	})

	// get all the tests (accessed at GET http://localhost:8080/api/tests)
	.get(function(req, res) {
		Test.find(function(err, tests) {
			if (err)
				res.send(err);

			res.json(tests);
		});
	});

// on routes that end in /tests/:test_id
// ----------------------------------------------------
router.route('/tests/:test_id')

	// get the test with that id
	.get(function(req, res) {
		Test.findById(req.params.test_id, function(err, test) {
			if (err)
				res.send(err);
			res.json(test);
		});
	})

	// update the test with this id
	.put(function(req, res) {
		Test.findById(req.params.test_id, function(err, test) {

			if (err)
				res.send(err);

			test.name = req.body.name;
			test.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Test updated!' });
			});

		});
	})

	// delete the test with this id
	.delete(function(req, res) {
		Test.remove({
			_id: req.params.test_id
		}, function(err, test) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
