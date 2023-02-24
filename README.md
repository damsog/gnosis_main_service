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

## :white_check_mark: Run API Service 

### :penguin: *Run from terminal*

### :whale2: *Run as Container*

### :whale2: *Deploy on Kubernetes*

## :wrench: Detailed Description