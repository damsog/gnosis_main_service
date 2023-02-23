# Gnosis Main API Service

Face Detection and Recognition API Server. this server helps to manage and save users, profiles, images, codes and datasets easily to be used with
[Gnosis Recognizer Service](https://github.com/damsog/gnosis-recognizer-service) for detection and recognition and serves an API that can be deployed and used remotely.

This service manages the application state (Saved data, updates, deletions etc) and serves as the entry point for usage through the API while [Gnosis Recognizer Service](https://github.com/damsog/gnosis-recognizer-service) does the heavy processing.

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