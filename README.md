
# Fashion Retail Platform

## Overview
A scalable, modular monolith architecture for a production-grade fashion marketplace. Supports both single-vendor and multi-vendor modes.

## Architecture
- **Backend**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Frontend**: Next.js (App Router), React Query, Zustand
- **Database**: PostgreSQL with Prisma ORM

## Project Structure
- **/server**: Backend API
  - **/src/modules**: Domain-driven modules (Auth, Products, Orders, Vendors)
  - **/shared**: Cross-cutting concerns (Middleware, unexpected errors)
- **/client**: Next.js Frontend

## Getting Started

1. **Backend Setup**
   ```bash
   cd server
   npm install
   npx prisma generate
   # Create .env from .env.example
   npx prisma db push # or migrate dev
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## Features Implemented
- **Modular Monolith**: structured backend for maintainability
- **Multi-Vendor Logic**: Order splitting, vendor registration, commission calculation
- **Role-Based Access Control**: Middleware protection for specific routes

## Documentation
- API Documentation is available via Swagger (to be added)
- Detailed module docs in `/docs`
