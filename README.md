# Gnosis Main API Service

Face Detection and Recognition API Server. this server helps to manage and save users, profiles, images, codes and datasets easily to be used with
[Gnosis Recognizer Service](https://github.com/damsog/gnosis-recognizer-service) for detection and recognition and serves an API that can be deployed and used remotely.

This service manages the application state (Saved data, updates, deletions etc) and serves as the entry point for usage through the API while [Gnosis Recognizer Service](https://github.com/damsog/gnosis-recognizer-service) does the heavy processing.

## :dvd: Components

this application is composed of 5 parts the main service that manages the application working as the central point that joins the rest of the services. <br>
Manages the user data through a database service that can be run using the service shown below, or connecting to an online service. <br>
Manages user files (profile images and dataset documents for recognition) consuming an sftp service, that again, can be run using the service below or connecting to an external sftp service. <br>
Serves an API to allow users to manage their data securely (using a login and jwt or an API token), allows to create simple profiles and upload images for these profiles which can later be encoded, then create groups putting some of the profiles creating a dataset which the recognizer can use. <br>
Through the API, users can request detection of faces on images, recognition on images (providing a dataset previously created), and also to apply detection and recognition on streams using WebRTC establishing an RTC connection.<br>
Lastly, to tie it all up, there's also a frontend service made on NextJs (It itself has a backend and offcourse it's frontend) to manage the resources and start rtc connection streams easily.
manages <br>
<br>

[gnosis_main_service](https://github.com/damsog/gnosis-main-service) <br>
[gnosis_recognizer_service](https://github.com/damsog/gnosis-recognizer-service) <br>
[gnosis_database_service](https://github.com/damsog/gnosis-database-service) (Optional) <br>
[gnosis_sftp_service](https://github.com/damsog/gnosis-sftp-service) (Optional) <br>
[gnosis_frontend](https://github.com/damsog/gnosis-frontend) (Optional) <br>

## :clipboard: Requirements
The nodejs dependencies can be installed simply by using ```npm ci```.

##### :cyclone: Nodejs Dependencies
- [NodeJs](https://nodejs.org/en/). Nodejs should be >=16. and [Typescript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/). for the DB handling.
- [Express](https://www.npmjs.com/package/express) For the backend server.
##### :penguin: Other Dependencies
- [Mysql](https://www.mysql.com/) RDBMS. (Maybe deployed locally, from a service or just using docker with [Gnosis DB](https://github.com/damsog/gnosis-database-service))
- An SFTP Service. you can connect to a service of your choice or just deploy this [SFTP Service Container](https://github.com/damsog/gnosis-sftp-service)
- [Docker](https://docs.docker.com/engine/install/ubuntu/) (Opcional)

## :wrench: Set Up (Linux)

To run this service you just need to have nodejs installes. recomended version is 16.<br>
IMO the best way to install node is through [nvm](https://github.com/nvm-sh/nvm), and after installing nvm just run 
```sh
nvm install 16
```
to install node 16 and then to select it
```sh
nvm use 16
```

With nodejs installed you just need to install the dependencies

```sh
npm install
```
Now generate the prisma client models
```sh
npx prisma generate
```

## :white_check_mark: Run API Service 

Before deploying the service you have to set up the environment variables. create a file called .env and copy the content from .base.env
```sh
cp .base.env .env
```

Let's explain the parameters to set on the .env file. <br>
Set up the DB connection string. provide the connection parameters be it that you have a local DB, or a remote DB or that you ran [gnosis_database_service](https://github.com/damsog/gnosis-database-service). for the dbname you can set up any name.
```sh
DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<dbname>"
```
Most variables are pretty straight forward, Set up the port to access the server on the PORT env viariable, the logger level and the deploy env.<br>
However, SERVER and PORT_SWAGGER serve only one purpose and it's that swagger will use this to make the requests from the UI, so you have to set these two variables to the values you will use to make requets. For example, if you run on localhost, SERVER could be just localhost or your localip and PORT_SWAGGER would be the same as PORT, on the other hand, if your want to access remotely you will have to set SERVER to your remote IP and PORT_SWAGGER to your remote port.<br>
Lastly, set a key to use as refference for the JWT to TOKEN_KEY. can be whatever you want but it's recomended to be base54 encoded.
```
SERVER=<server-ip>
PORT=<server-port>
PORT_SWAGGER=<server-port-swagger>
LOGGER_LEVEL=<info/debug>
NODE_ENV=<development/production>
TOKEN_KEY=<token-key>
...
```
Indicate the certificates in case you want to use https. if you want to use http instead, comment these two lines.
```
...
SSL_KEY=./certificates/<key.pem>
SSL_CERT=./certificates/<cert.pem>
...
```
Set the parameters to reach the [gnosis_recognizer_service](https://github.com/damsog/gnosis-recognizer-service).
```
...
FACE_ANALYTICS_SERVER=<recognizer-service-host>
FACE_ANALYTICS_PORT=<recognizer-service-host>
...
```
Set the parameters to access the sftp server, be it a local server, and online service or the [gnosis_sftp_service](https://github.com/damsog/gnosis-sftp-service).

```
...
SFTP_HOST=<sftp-host>
SFTP_PORT=<sftp-port>
SFTP_USER=<sftp-user>
SFTP_PASSWORD=<sftp-password>
...
```
The next section on the .env file it's used to configure a k8s deployment. if you wonn't run on a cluster ignore this section. <br>

### :penguin: *Run from terminal*
Before building the app we need to apply the migrations to the DB
```sh
npx prisma migrate deploy
```
for deploying first build the app
```sh
npm run build
```
Then, run it with 
```sh
npm run start
```
And for development
```sh
npm run dev
```
### :whale2: *Run as Container*
Run Docker container.

```sh
docker run --env-file .env -p <host-port>:4000 laguzs/gnosis_main_service:<tag>
```
or in detatched mode
```sh
docker run --env-file .env -p <host-port>:4000 laguzs/gnosis_main_service:<tag> -d
```
Or for ease, deploy using the docker compose file
edit the img name for your specific case.
To run using docker compose
```sh
docker compose up
```
or in detatched mode
```sh
docker compose up -d
```
to stop 
```sh
docker compose down
```

Check outputs 
```sh
docker logs --tail N <container_id>
```
### :whale2: *Deploy on Kubernetes*
A template for a deployment is described on deployment/k8s.yaml. there are the definitions for a configmap, a deployemnt, 2 services, one to use as nodeport and one to use as ClusterIP internal service and an ingress if you have a domain. <br>
The environment variables should be exported from the .env file to the configmap to use on the cluster. so, in addition to the env variables defined in a couple of steps before we need to define certain variables specific to the deployment. <br>
IMAGE_NAME and IMAGE_NAME describe the docker image to deploy, while DOMAIN is necessary for the ingress. Leave it blank if you wont't configure an ingress, however, if there is no ingress you should leave the NodePort service with an external port to access the application.
```
# K8S env vars
...
IMAGE_NAME=laguzs/gnosis_main_service
IMAGE_TAG=<image-tag>
DOMAIN=<domain>
...
```
Lastly these are some resource limits for the cluster and the number of replicas for the application.
```
...
K8S_MAX_REPLICAS=<number-replicas>
K8S_MIN_REPLICAS=<number-replicas>
K8S_NAMESPACE=<deployment-namespace>
K8S_RESOURCES_LIMITS_CPU=<cpu-limits>
K8S_RESOURCES_LIMITS_MEMORY=<memory-limits>
K8S_RESOURCES_REQUESTS_CPU=<cpu-request-limits>
K8S_RESOURCES_REQUESTS_MEMORY=<memory-resources-limits>
K8S_SERVICE_NAME=<service-name>
```
 to do that just type the following commands
```sh
set -o allexport
source .env
set +o allexport
```
This will keep the env viariables on the terminal session. now we need to print them on the k8s yaml file.
```sh
envsubst < deployment/k8s.yaml > deployment/k8s_patched.yaml
```
This will create a new file with the defined env variables in it. and now you can use this generated file on your cluster.

## :wrench: Detailed Description