# SafeZone Server

SafeZone Server is the core server-side application for the SafeZone healthcare platform. It provides a secure, scalable, and production-ready REST API to manage users, appointments, medical records, payments, and system operations. The backend is designed to support real-world healthcare workflows with a strong focus on security, performance, and maintainability.

## 🏗️ Architecture Overview

The system follows a layered architecture pattern:

`Controller` → `Service` → `Repository` → `Database`

This separation ensures:
- Clear responsibility boundaries
- Easier testing and maintenance
- Long-term scalability

## 🛠️ Tech Stack

- **Runtime**: Node.js (20.x LTS)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Better Auth (JWT + session-based)
- **Caching**: Redis
- **Validation**: Zod
- **Payments**: Stripe
- **Logging**: Winston
- **File Storage**: Cloud Storage (S3 compatible)

## 🔐 Core Features

- Role-based authentication and authorization
- Email registration and verification
- Secure password hashing
- Appointment scheduling and management
- Doctor and patient profile management
- Digital prescriptions and medical records
- Payment processing and transaction tracking
- Redis-based caching for performance
- Audit logs for critical operations

## 👥 User Roles

- **Super Admin** – Full system access
- **Admin** – Manage doctors, patients, and reports
- **Doctor** – Appointments, prescriptions, patient data
- **Patient** – Book appointments, view records, payments

## 📁 Project Structure

```txt
README.md
```

> Status: This project is under active development and will be updated as the project requirement updates and progress. This readme will be update as the project progress.