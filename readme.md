# 🛒 E-Commerce Microservices Project Overview

This document provides a consolidated overview and simplified documentation for the 8 microservices built as part of a scalable **E-commerce Backend System** using **NestJS**, **TypeScript**, **MongoDB**, and **gRPC** for inter-service communication.

---

## 📦 Microservices List

### 1. **Auth Service**

* Handles user authentication (login, token generation, validation).
* Uses JWT for session management.
* Interacts with User Service via gRPC for user validation.

### 2. **User Service**

* Manages user data and registration.
* Offers gRPC endpoints for user retrieval to admin services.
* Uses Mongoose for MongoDB interactions.
* Validates user inputs and handles errors gracefully.
* Supports rate limiting and logging.
* Provides user profile management, including password updates.
* Admin-only gRPC endpoints for user management (view, update, delete).
* Public REST endpoints for user registration and profile retrieval.
* Works with Auth and Order services.

### 3. **Product Service**

* REST + gRPC based service to manage:

  * Products, Categories, Sizes, Inventory, and Reviews
* Public REST endpoints: List, Detail, Search products
* gRPC endpoints for:

  * Product creation, updates, deletions (admin only)
  * Category and size management
* Supports product reviews and ratings
* Admin-only gRPC: Create/Update/Delete product, manage inventory
* MongoDB + Mongoose for data handling

### 4. **Cart Service**

* REST API to manage cart operations:

  * Add, update, remove items, clear cart
* Uses Mongoose for persistence
* Validates inputs, supports rate limiting, logging, error handling

### 5. **Order Service**

* Handles:

  * Order creation (from cart), payment success updates
  * Refunds (within 30 days), Exchanges (7 days), Cancellations
  * Order status updates (admin only)
  * User reviews after delivery
* gRPC endpoints used by Product, Auth, Payment

### 6. **Payment Service**

* Generates payment sessions and handles status callbacks
* Communicates with Order service after payment confirmation
* Can support Stripe, Razorpay, or any 3rd-party gateway

### 7. **Inventory Service** *(integrated into Product Service)*

* Tracks stock levels based on order activity
* Updates inventory when orders are placed/cancelled
* Accessible via gRPC only

### 8. **Admin Service**

* Controls all admin-only operations like:

  * Adding products, updating categories/sizes
  * Viewing users/orders/products in bulk
* Authenticates with Auth Service
* Communicates with Product, Order, User services

---

## 🧱 Tech Stack

* **Framework**: NestJS
* **Language**: TypeScript
* **Communication**: gRPC (for microservices), REST (for public APIs)
* **Database**: MongoDB (Mongoose ODM)
* **Testing**: Jest, Supertest
* **Documentation**: Swagger/OpenAPI

---

## 🔐 Security

* Input validation using `class-validator` and `joi` and `zod`
* Authentication via JWT (handled by Auth Service)
* Authorization checks for admin-only operations
* Environment variables managed via `.env` files
* Global exception filters
* Rate Limiting
* JWT-based Auth (verified via gRPC by Auth Service)
* CORS and secure header handling

---

## 🧪 Testing & Tools

* `npm run test` - Unit tests
* `npm run test:e2e` - Integration tests
* `npm run test:cov` - Coverage report
* Postman / Swagger UI for API testing
* Winston for Logging (optional)

---

## 📁 General Project Structure (per service)

```
src/
├── modules/ (feature-specific modules)
├── ├──dto/ (data transfer objects)
├── ├── controllers/ (REST controllers)
├── ├── services/ (business logic)
├── ├── schemas/ (Mongoose schemas)
├── └── grpc/ (gRPC service definitions)
├── filters/ (exception filters)
├── config/  (env config)
├── proto/    (proto files)
├── main.ts
└── app.module.ts
```

---

## 🚀 Deployment

* Docker support (per service)
* Use `.env` for environment config
* Each service can run independently on different ports

```bash
npm install
npm run start:dev
```

Or using Docker:

```bash
docker build -t service-name .
docker run -p PORT:PORT service-name
```

---

## 🧠 Summary

This modular microservices architecture ensures scalability, testability, and ease of development for complex e-commerce systems. Each service is independently deployable and communicates via gRPC while exposing REST APIs where necessary (especially for frontend use).

All services use standardized NestJS project setup and structure, with proper documentation, testing, and configurations in place.

These all services are designed to work together seamlessly, providing a robust backend for any e-commerce application. The use of NestJS and TypeScript ensures type safety and maintainability, while MongoDB provides a flexible data storage solution.

These all services are made with the collabration of 8 developers, each focusing on a specific service, ensuring that the project is modular and scalable. @team

---