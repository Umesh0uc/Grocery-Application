# Grocery Application

Grocery Application is a microservices-based e-commerce prototype for grocery shopping. It demonstrates an API gateway, product and cart microservices, a Vite + React frontend, and optional Kafka-based eventing — a reference for building, testing, and deploying microservice stacks locally and with containers.

## Prerequisites

- Node.js (LTS recommended)
- npm (or yarn / pnpm)
- Docker & docker-compose (for containerized runs)

## Repository layout (top-level)

- `api-gateway/` — API gateway service
- `cart/` — Cart microservice
- `product/` — Product microservice
- `mygrocery/` — Frontend (Vite + React/TypeScript)
- `docker-compose.yml` — Compose file to run the stack

## Install dependencies

Install dependencies per service from the repository root:

```bash
cd api-gateway && npm install
cd ../cart && npm install
cd ../product && npm install
cd ../mygrocery && npm install
cd ../
```

Tip: run these in separate terminals

## Run services locally (without Docker)

Each service can be started directly with Node or via its npm scripts. Check the `package.json` scripts inside each folder for exact commands.

Examples:

- API Gateway
```bash
cd api-gateway
npm start    # or `node index.js` depending on scripts
```

- Cart service
```bash
cd cart
npm start    # or `node app.js`
```

- Product service
```bash
cd product
npm start    # or `node app.js`
```

- Frontend (Vite)
```bash
cd mygrocery
npm run dev
```

After starting backend services, open the frontend URL printed by Vite (commonly `http://localhost:3000`) and verify API endpoints are reachable.

## Run the whole stack with Docker / docker-compose

From the repository root you can build and run all services with Docker Compose:

```bash
docker-compose up --build
```

To run in detached mode:

```bash
docker-compose up -d --build
```

Stop and remove containers:

```bash
docker-compose down
```

Run a single service with Docker (example: cart):

```bash
docker build -t pro-cart ./cart
docker run --rm -p 3001:3001 --env-file ./cart/.env pro-cart
```

Adjust host ports and `--env-file` paths to match the service's expectations.

## Environment variables

Each service expects environment variables. It's recommended to create a `.env` file per service (e.g., `cart/.env`, `api-gateway/.env`, etc.). Do NOT commit real credentials — keep them out of git.

## Future scope

Short-term roadmap:

- User authentication: add a centralized auth service.
- Authorization: implement JWT-based authorization for services.
- Messaging: introduce Kafka for async event-driven flows.
- Observability: add structured logs, metrics, and tracing.
- Secrets: integrate a secrets manager; avoid committing creds.
- CI/CD: add automated build, test, and deploy pipelines.
