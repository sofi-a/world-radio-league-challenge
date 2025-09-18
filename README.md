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

## Firebase Setup

1. **Create a Firebase Project**
    - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. **Get Service Account Credentials**
    - In your Firebase project, go to Project Settings > Service Accounts.
    - Click "Generate new private key" and download the JSON file.
    - Save this file as `firebase-service-account.json` in the `config` directory of your project.

---

## Running Sequelize Migration and Seeder Scripts

1. **Set Environment Variables**
    - You can set environment variables directly in your shell or use a `.env` file.
    - Example:
      ```bash
      export POSTGRES_HOST=db
      export POSTGRES_USER=wrl_admin
      export POSTGRES_PASSWORD=your_password
      export POSTGRES_DB=wrl_db
      ```

2. **Run Migrations**
    - To run all migrations:
      ```bash
      npm run migrate
      ```
    - To undo all migrations:
      ```bash
      npm run undo:migrate
      ```

3. **Run Seeders**
    - To run all seeders:
      ```bash
      npm run seed
      ```
    - To run a specific seeder:
      ```bash
      npx sequelize-cli db:seed --seed <seeder-file-name>
      ```
    - To undo all seeds:
      ```bash
      npm run undo:seed
      ```

---
