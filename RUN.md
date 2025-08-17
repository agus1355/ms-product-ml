# RUN.md

## Start the Project

### Using Docker

To start the project with Docker, run:

```bash
docker compose --profile dev up
```

This will start all the necessary services in development mode.

### Directly with Node.js

If you prefer, you can also run the project directly without Docker:

```bash
npm install
npm run start:dev
```

This will start the project in development mode using your local Node.js environment.