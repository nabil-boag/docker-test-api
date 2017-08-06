.PHONY: default \
	update-code \
	settings-copy \
	dev \
	link \
	build \
	start \
	stop

# Stops the containers, but keeps their internal state
stop:
	docker-compose stop

# Stops the containers, and removes any volumes so state is lost
down:
	docker-compose down -v --remove-orphans

# Starts all the containers in the background
start:
	docker-compose up --build -d
	
run-producer: 
	docker-compose run --entrypoint "/bin/bash" producer

