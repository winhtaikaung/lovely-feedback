# FeedBack Collection Widget

# Prequesties

- Docker & Docker Compose

# Running the application

- Change direction to `sandbox` by using `cd sandbox`
- `docker-compose build` to build container image
- type `docker-compose up -d` will start the application

# Running Migrations
- `docker-compose run backend node migrate.js`


# Running Tests
  Running tests can be run with following commands
- for Backend tests `docker-compose run backend npm run test`
- for Frontend tests `docker-compose run frontend npm run test`

# Things that can improve
- Widget Style improvement
- More Test Cases for both Frontend & Backend
- Application of ORM if there will be more 
- Container caching
