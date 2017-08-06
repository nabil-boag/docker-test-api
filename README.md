# Instructions

## Start queue and consumer

To start the RabbitMQ server and 1 consumer in the background

```sh
docker-compose up --build -d
```

## Send a message onto the queue

To send a message to the queue

```sh
docker-compose run --entrypoint "npm run produce" producer
```

## Viewing logs

To view/follow the consumer logs 
```
docker-compose logs -f consumer
```

## Scaling up consumers

To create 5 consumers

```
docker-compose scale consumer=5
```

## Viewing management console

In a browser navigate to `http://localhost:15672`

Username is `root`
Password is `Passw0rd`

## Special thanks to

datenkollektiv - https://devops.datenkollektiv.de/creating-a-custom-rabbitmq-container-with-preconfigured-queues.html

John Frizelle
https://github.com/johnfriz/rabbitmq-nodejs-tutorials/tree/master/one