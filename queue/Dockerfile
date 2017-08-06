FROM rabbitmq:3.6.10-management

ADD rabbitmq.config /etc/rabbitmq/

ADD definitions.json /etc/rabbitmq/

RUN chmod 666 /etc/rabbitmq/*

CMD ["rabbitmq-server"]
