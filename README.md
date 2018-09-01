# restful-api
Nodejs Restful API

## Create https

* openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

* Folder: *backend/https*

## Run

Staging mode

> node backend/index.js

Production mode

> NODE_ENV=production node backend/index.js