

# ETL Project

This project demonstrates a basic implementation of an Extract, Transform, and Load (ETL) process using Node.js and Postgres DB. It consists of three components: Client, Server, and Data Processor.

## Running Instructions

To run the project, follow these steps:

1. **Prerequisites**:
   - Node.js: [Download and install Node.js](https://nodejs.org/).
   - Postgres DB: [Download and install Postgres](https://www.postgresql.org/download/).

2. **Installation**:
   - Clone this repository or download the project files.
   - Open a terminal and navigate to the project directory.
   - Run the command `npm install` to install the required dependencies.

3. **Server**:
   - Start the server by running the command `node server.js`.
   - The server will be accessible at `http://localhost:8000`.
   - Endpoints:
     - `/liveEvent` (POST): Receives events from the client and saves them to a file.
     - `/userEvents/<userid>` (GET): Retrieves all data for a given user from the database.
