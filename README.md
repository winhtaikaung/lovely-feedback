# FeedBack Collection Widget

# Prequesties

- Docker & Docker Compose

# Running the application

- Clone repository
- Change directory to `sandbox` by using `cd sandbox`
- `docker-compose build` to build container image
- type `docker-compose up -d` will start the application in detached mode
- and proceed to Migrations and Seeds sections

# Running Migrations

- `docker-compose run backend node migrate.js`

# Running Seeds Data for Sample Questions

- `docker-compose run backend node seeds.js`

# :warning: Caution for Docker users

- :warning: mysql container is not mounted to host volume so the application will lost its data when the mysql container stopped

# Running Tests

Running tests can be run with following commands

- for Backend tests `docker-compose run backend npm run test`
- for Frontend tests `docker-compose run frontend npm run test`

# API Collections

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/4d5b196b129c2474fd30?action=collection%2Fimport)

# Application URLs

**Frontend**

http://localhost:5000

**Backend**

http://localhost:8000

# Stopping the Applications

- `docker-compose down` will gracefully shutdown all containers.

# Trouble shooting

There are 2 major applications containers and one DB containers

- `frontend` & `backend`
- `docker-compose logs your_container_name`

# Things that can improve

- Widget Style improvement (Animation)
- More Test Cases for both Frontend & Backend
- Application of ORM if there will be more tables
- Container image caching
