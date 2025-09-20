# 💻 Assignment: Getting Started

This guide will walk you through the steps to set up and run the assignment, including how to run tests and access the sample accounts.

---

## 🚀 How to Run It

To get the application up and running, follow these steps in order:

1.  **Clone the repository**: Start by cloning the project to your local machine.
2.  **Install dependencies**: Run `npm install` to install all the necessary project dependencies.
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
    * Generate Prisma client: `npm prisma:generate`
    * Apply migrations: `npm prisma:migrate`
    * Seed the database with initial data: `npm prisma:seed`
5.  **Start the application**: Run `npm start` to launch the application.

---

## ✅ Tests

To run the test suite for the application, simply execute the following command:

* `npm test`

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
