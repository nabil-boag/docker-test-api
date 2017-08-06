const amqp = require('amqp');

console.log('Starting to connect to Rabbit MQ...');

const connection = amqp.createConnection({ 
  host: 'queue', 
  login: 'user',
  password: 'Passw0rd'
},
{
  reconnect: false
});

console.log('Connection Created. Waiting for connection be ready...');

// Wait for connection to become established.
connection.on('ready', () => {
  console.log('Connection ready for use. Connecting to "hello" queue...');

	connection.queue('hello', { autoDelete: false }, (q) => {
    console.log('Connected to "hello" queue. Waiting for queue to become ready');
    
    // Bind to all messages
    q.bind('#');
    
    q.on('queueBindOk', () => {
      console.log('The \'hello\' queue is now ready for use. Publishing message...');
   
      const message = `hello world @ ' + ${new Date()}`;
      
      connection.publish('hello', message);

      console.log(`Published message: '${message}`);
      // Allow 1 second for the message publishing to complete
      setTimeout(() => {

        console.log('Disconnecting...');

        connection.disconnect();
   
        console.log('Disconnected. Exiting...');
      }, 1000);      
 		});
  });
});

connection.on('error', (e) => {
  console.log('Error from amqp: ', e);
});