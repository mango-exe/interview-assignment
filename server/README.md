# 💻 Assignment: Getting Started

This guide will walk you through the steps to set up and run both the backend and frontend of the assignment, including how to run tests and access the sample accounts.

***

## 🚀 How to Run It

To get the application up and running, follow these steps in order:

**Clone the repository**: Start by cloning the project to your local machine: `https://github.com/mango-exe/interview-assignment.git`.

### Backend

1.  **Go to backend directory**: From the cloned repository directory, run `cd server`.
2.  **Install dependencies**: Run `npm install` to install all the necessary backend project dependencies.
3.  **Prepare the database**:
    * Create a local directory for your PostgreSQL data: `mkdir pgdata`
    * Build the Docker image: `docker build -t my-postgres:16 .`
    * Run the Docker container:
        ```bash
        docker run -d \
          --name postgres_db \
          -p 5432:5432 \
          -v pgdata:/var/lib/postgresql/data \
          my-postgres:16
        ```
4.  **Set up the database schema**:
    * Generate Prisma client: `npm run prisma:generate`
    * Apply migrations: `npm run prisma:migrate`
    * Seed the database with initial data: `npm run prisma:seed`
5.  **Start the application**: Run `npm start` to launch the backend. The server will run on port 3000.

### Frontend

1.  **Navigate to the client directory**: Change your current directory to the client folder: `cd client`.
2.  **Install dependencies**: Run `npm install` to install the client-side dependencies.
3.  **Start the client**: Run `npm run dev` to launch the frontend. The application will typically be available at `http://localhost:5173`.

---

## ✅ Tests

To run the test suite for both the backend and frontend, follow these instructions:

### Backend Tests

* Run `npm test` from the root directory to run the backend tests.

### Frontend Tests

* Navigate to the client directory: `cd client`.
* Run `npx playwright install` to install playwright.
* Run `npx playwright test` to run the frontend tests.

---

## 👤 Sample Accounts

The database is pre-seeded with two user accounts you can use for testing:

* **Alice's Account**:
    * Email: `alice@example.com`
    * Password: `password123`
* **Bob's Account**:
    * Email: `bob@example.com`
    * Password: `password456`

Both of these accounts are associated with **multiple invoices**.
