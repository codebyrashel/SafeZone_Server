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
├── dist
│   ├── prisma.config.js
│   └── src
│       ├── app
│       │   ├── lib
│       │   ├── module
│       │   ├── routes
│       │   └── shared
│       ├── app.js
│       ├── generated
│       │   └── prisma
│       └── server.js
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── prisma
│   ├── migrations
│   │   ├── 20260207145148_init
│   │   │   └── migration.sql
│   │   ├── 20260210123937_dev
│   │   │   └── migration.sql
│   │   ├── 20260210124905_init
│   │   │   └── migration.sql
│   │   ├── 20260214065447_patient_model_created
│   │   │   └── migration.sql
│   │   ├── 20260214065725_update_patient
│   │   │   └── migration.sql
│   │   ├── 20260214070322_update_patient
│   │   │   └── migration.sql
│   │   ├── 20260214084731_doctor_speciality_add
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema
│       ├── admin.prisma
│       ├── appointment.prisma
│       ├── auth.prisma
│       ├── doctor.prisma
│       ├── enums.prisma
│       ├── medicalReport.prisma
│       ├── patientHealthData.prisma
│       ├── patient.prisma
│       ├── payment.prisma
│       ├── prescription.prisma
│       ├── review.prisma
│       ├── schema.prisma
│       ├── shedule.prisma
│       └── speciality.prisma
├── prisma.config.ts
├── README.md
├── src
│   ├── app
│   │   ├── errorHelpers
│   │   │   ├── AppError.ts
│   │   │   └── handleZodError.ts
│   │   ├── interfaces
│   │   │   └── error.interfaces.ts
│   │   ├── lib
│   │   │   ├── auth.ts
│   │   │   └── prisma.ts
│   │   ├── module
│   │   │   ├── auth
│   │   │   ├── doctor
│   │   │   ├── speciality
│   │   │   └── user
│   │   ├── routes
│   │   │   └── index.ts
│   │   ├── shared
│   │   │   ├── catchAsync.ts
│   │   │   └── sendResponse.ts
│   │   └── utils
│   │       ├── cookie.ts
│   │       ├── jwt.ts
│   │       └── token.ts
│   ├── app.ts
│   ├── config
│   │   └── env.ts
│   ├── generated
│   │   └── prisma
│   │       ├── browser.ts
│   │       ├── client.ts
│   │       ├── commonInputTypes.ts
│   │       ├── enums.ts
│   │       ├── internal
│   │       ├── models
│   │       └── models.ts
│   ├── middleware
│   │   ├── checkAuth.ts
│   │   ├── globalErrorHandler.ts
│   │   ├── notFound.ts
│   │   └── validateRequest.ts
│   └── server.ts
└── tsconfig.json
```

> Status: This project is under active development and will be updated as the project requirement updates and progress. This readme will be update as the project progress.