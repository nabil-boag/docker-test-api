const amqp = require('amqp');

console.log('Starting to connect to Rabbit MQ...');

const connection = amqp.createConnection({
  host: 'queue',
  login: 'user',
  password: 'Passw0rd'
});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', () => {
  console.log('Connection ready for use. Connecting to "hello" queue...');

  // Use the default 'amq.topic' exchange
  connection.queue('hello', { autoDelete: false }, (q) => {
    console.log('Connected to "hello" queue. Waiting for queue to become ready');

    // Catch all messages
    q.bind('#');

    // Receive messages
    q.on('queueBindOk', () => {
      console.log('The "hello" queue is now ready for use. Subscribing for messages...');

      // Receive messages
      q.subscribe((message) => {
        console.log('Received message... ');
        // Print messages to stdout
        const buf = new Buffer(message.data);
        console.log(buf.toString('utf-8'));
      });
    });
  });
});

connection.on('error', (e) => {
  console.log("Error from amqp: ", e);
});