# FoodShare

A full-stack community food-sharing app. The frontend uses React and Vite; the backend is Java Spring Boot, Spring Security, JWT and MySQL.

## Requirements

- Java 17 or newer (Java 21 is fine)
- MySQL Server
- Node.js 20.19+ and npm
- VS Code with the Java Extension Pack, or IntelliJ IDEA

## 1. Prepare MySQL

1. Open MySQL Workbench or your MySQL command line.
2. Run `CREATE DATABASE foodshare;`.
3. Open and run `database/foodshare.sql` in that database. Hibernate also creates/updates the tables when the backend starts.
4. Open `backend/src/main/resources/application.properties`. Set `DB_PASSWORD` in your environment, or replace the `${DB_PASSWORD:YOUR_MYSQL_PASSWORD}` placeholder with your local password. The placeholder is not a real password. Never commit your actual password.

Sample demo accounts in the SQL file use BCrypt hashes for password `password`. Change the demo credentials before using this project outside a classroom demo.

## 2. Run the backend

Open the `backend` folder in IntelliJ IDEA or VS Code with the Java Extension Pack. Let the IDE import the Maven project and download the dependencies. Open `src/main/java/com/foodshare/FoodShareApplication.java` and click **Run**. No separate Maven installation or Docker is required when the IDE's Maven support is enabled. The API is at `http://localhost:8080`.

## 3. Run the React frontend

In a terminal, open the `frontend` folder and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The React app includes the public landing page, sign-in and registration, food safety guidance, and role-specific donor, NGO, volunteer, and admin dashboards. The browser calls the backend at `http://localhost:8080` by default. Start MySQL and the backend before using account and dashboard features. The frontend stores the JWT in browser local storage; the backend validates authentication and roles on protected API routes.

To use a different backend URL, create `frontend/.env.local` with `VITE_API_BASE=http://localhost:8080` and restart Vite.

## Beginner notes

- `frontend/src/api.js` contains the shared fetch and JWT code.
- `AuthController` and `AuthService` handle registration and login. Passwords are hashed with BCrypt.
- `Donation`, `FoodRequest` and `Delivery` map to MySQL tables through JPA.
- A food request is approved by an NGO/admin action; approval assigns the first available volunteer, creating a delivery. For a real deployment, assignment should be a separate workflow.
- If your IDE has trouble resolving dependencies, confirm it is online and that the project is imported as Maven. No global Maven command is needed.

## Demo flow

Register/login as donor and create a donation. Log in as an NGO and request that available food. The request appears under My Requests; select **Approve** to create an assigned delivery. Log in as a volunteer and move it through Accept, Picked Up and Delivered. Admin can view users and records.

## API overview

Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`. Donations: `/api/donations`, `/api/donations/my`, `/api/donations/{id}`. Requests: `/api/requests`, `/api/requests/my`, `/api/requests/{id}`, `/api/requests/{id}/approve`, `/api/requests/{id}/reject`. Deliveries: `/api/deliveries/my` and `/api/deliveries/{id}/accept|pickup|deliver`. Admin data: `/api/admin/summary`.
