# World Radio League Challenge

## Docker Setup
To run the project using Docker Compose, follow these steps:

1. Ensure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

2. **Configure environment variables:**  
  Create a `.env` file in the project root and set the required environment variables. Refer to `.env.example` for guidance.

3. **Development setup:**  
  Start the development services using:
  ```bash
  docker compose -f docker-compose-dev.yml up
  ```

4. **Production setup:**  
  Start the production services using:
  ```bash
  docker compose -f docker-compose-prod.yml up
  ```

5. Access the application at `http://localhost:<PORT>`, replacing `<PORT>` with the value set in your `.env` file (default is usually `3000`).

For custom configurations, edit the appropriate `docker-compose.yml` file as needed.
