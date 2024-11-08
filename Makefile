# Makefile for npm-based project automation

run:
	npm run serve

init:
	npm init

i-all:
	$(MAKE) init
	$(MAKE) i-express
	$(MAKE) i-nodemon
	$(MAKE) i-mongoose
	$(MAKE) i-mongodb
	$(MAKE) i-ejs

i-express:
	npm install express


#https://www.bibmath.net/forums/viewtopic.php?id=16473
i-cors:
	npm install cors

i-bodyparser:
	npm install body-parser --save

i-nodemon:
	npm install nodemon

i-mongoose:
	npm install mongoose

i-ejs:
	npm install ejs

i-mongodb:
	sudo apt-get install gnupg curl
	curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
		sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg --dearmor
	echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
	sudo apt update
	sudo apt-get install -y mongodb-org
	sudo systemctl start mongod
	sudo systemctl enable mongod
	sudo systemctl status mongod
