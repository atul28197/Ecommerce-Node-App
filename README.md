# 🛒 Ecommerce Store Backend (Node.js + Express + Sequelize)

This is a small e-commerce backend built as part of a coding assignment.  
It implements cart & checkout flows, a conditional discount mechanism, admin reporting, JWT authentication, and documented APIs.

---

## 🚀 Features

✔ User signup/login with JWT  
✔ Role-based auth (user/admin)  
✔ Product CRUD  
✔ Add to cart / View cart / Clear cart  
✔ Checkout flow with conditional discount  
✔ Every **Nth order** issues a discount code (10% off)  
✔ Admin can generate/list discount codes  
✔ Admin reports:
   - items sold
   - purchase totals
   - discount totals
   - audit of codes  
✔ In-memory DB mode (assignment requirement)  
✔ Sequelize models (extensible to Postgres/MySQL)  
✔ Swagger UI + OpenAPI export  
✔ Postman collection  
✔ Jest test suite  

---

## 🧰 Tech Stack

**Backend:** Node.js, Express  
**ORM:** Sequelize  
**DB Mode:** SQLite (in-memory for assignment), switchable to Postgres  
**Auth:** JWT  
**Tests:** Jest + Supertest  
**Documentation:** Swagger UI + OpenAPI + Postman  

---

## 🧩 Architecture Overview

User
│
├── Auth (JWT)
│
├── Products CRUD (Admin)
│
├── Cart
│ ├── add
│ ├── list
│ └── clear
│
├── Checkout
│ ├── apply discount (optional)
│ └── generate next discount (Nth order)
│
└── Admin
├── generate discount code
├── list discount codes
└── report

yaml
Copy code

---

## 📂 Folder Structure

src/
├─ routes/
├─ controllers/
├─ models/
├─ middleware/
├─ services/
├─ db/
├─ swagger.js
swagger/
└─ openapi.json
postman/
└─ ecommerce.postman_collection.json

yaml
Copy code

---

## 🧪 Local Setup

```sh
npm install
cp .env.example .env
npm start
Default server runs at:

arduino
Copy code
http://localhost:3000
🔐 Authentication
Signup:

bash
Copy code
POST /auth/signup
{
  "email": "test@test.com",
  "password": "123456"
}
Login:

bash
Copy code
POST /auth/login
Auth header for protected routes:

makefile
Copy code
Authorization: Bearer <token>
Admin is seeded by test setup:

css
Copy code
admin@example.com / admin123
🧾 API Documentation
Interactive Swagger UI:

bash
Copy code
GET /api-docs
OpenAPI Spec (export):

bash
Copy code
/swagger/openapi.json
Postman Collection:

bash
Copy code
/postman/ecommerce.postman_collection.json
🛍 Checkout + Discount Logic
Every Nth order (configurable via .env) issues a discount code

Discount code = 10% off entire order

Discount code = single-use

Admin endpoints:

pgsql
Copy code
POST /admin/discount-codes/generate
GET  /admin/discount-codes
GET  /admin/report
Example post-checkout response:

json
Copy code
{
  "subtotal": 50,
  "discount": 5,
  "total": 45,
  "generatedCode": "QWE123"
}
📊 Admin Report Example
json
Copy code
{
  "totalItemsSold": 42,
  "totalPurchaseAmount": 1299.5,
  "totalDiscountAmount": 90,
  "discountCodes": [
    { "code": "QWE123", "isUsed": true, "usedAt": "..." }
  ]
}
🧪 Testing
Run test suite:

bash
Copy code
npm test
Tests cover:

✔ Auth
✔ Cart
✔ Checkout
✔ Discount issuance
✔ Admin reporting

Example:

bash
Copy code
PASS  __tests__/checkout.test.js
PASS  __tests__/admin.test.js
PASS  __tests__/auth.test.js
🎯 Assumptions (Explicit per Assignment)
DB is in-memory (SQLite) per requirement

Discount applies to entire order (not per item)

Discount code is single-use

Code belongs to system — not tied to user

Admin actions require admin role

Nth-order config defaults to 5

🧱 Design Tradeoffs
Chose Sequelize for faster modeling + migration capability

Role-based access via middleware → avoids controller bloat

Transactional checkout logic avoids partial writes

Separated admin/reporting logic for clarity

🛠 Stretch Goals (If Time Allowed)
If more time was available, I would add:

Deployment (Render/Railway/AWS)

Frontend UI (Angular or React)

Email notifications for discount code awards

Webhooks for order events

Caching layer for popular products

DB persistence (Postgres)

Rate limiting & audit logging

Observability (metrics + traces)

Cypress/Postman integration tests

🚀 If Scaling to Production
To scale beyond assignment:

Move to Postgres (Sequelize already supported)

Add migrations/seeds

Use Redis for cart caching

Add Kubernetes deployment manifests

Add API Gateway & WAF

Introduce CQRS for reporting

📤 What I Would Do Next
To further evolve this:

✔ Convert to microservice with event sourcing
✔ Add async order/fulfillment pipeline
✔ Support multiple discount types (percentage, fixed, BOGO, tiered)

📎 Submission Notes
The project includes:

meaningful git history

feature branches showing evolution

documented decisions

test coverage

developer-friendly artifacts

📬 Contact
Submitted by: Atul Singh

yaml
Copy code
