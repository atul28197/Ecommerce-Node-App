# E-commerce Store – Discount Code Assignment

This project implements a minimal e-commerce backend that supports:

- Adding products
- User cart & checkout flow
- Every Nth order earns a 10% discount coupon (admin-generated)
- Users redeem discount codes during checkout
- Admin reporting API

The implementation uses Node.js, Express, Sequelize ORM, JWT auth, and an in-memory SQLite DB for simplicity.

---

## 1. Features

### User Features
✔ Signup / Login (JWT)  
✔ Add items to cart  
✔ Checkout with optional discount code  
✔ Discount = 10% off entire order  

### Discount System
✔ Every `N`th order earns a discount code  
✔ Admin generates discount codes  
✔ Discount codes are global and single-use  
✔ Checkout validates code before applying  
✔ Discount applies to the order `subtotal.`  

### Admin Features
✔ Generate discount code (if eligible)  
✔ View metrics:  
- Total items sold  
- Total purchase amount  
- Total discount amount  
- List of discount codes (used/unused)

---

## 2. Tech Stack

| Category | Tech |
|---|---|
| Language | Node.js |
| Framework | Express |
| ORM | Sequelize |
| DB | SQLite (in-memory) for assignment |
| Auth | JWT |
| Tests | Jest + Supertest |

---

## 3. API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Register |
| POST | `/auth/login` | Login |

### Products (Admin)
| Method | Endpoint |
|---|---|
| POST | `/products` | Create product |
| GET | `/products` | List |

### Cart (User)
| Method | Endpoint |
|---|---|
| POST | `/cart/add` | Add to cart |
| GET | `/cart` | View cart |
| DELETE | `/cart/clear` | Clear cart |

### Checkout (User)
| Method | Endpoint | Body |
|---|---|---|
| POST | `/checkout` | `{ code?: string }` |

### Admin Discount
| Method | Endpoint |
|---|---|
| POST | `/admin/discount-codes/generate` | Generate if eligible |

### Admin Report
| Method | Endpoint |
|---|---|
| GET | `/admin/report` | Metrics & discount codes |

---

## 4. Discount Logic

- `DISCOUNT_NTH = 5` (configurable via `.env`)
- Every 5th order → eligible for code
- Admin must trigger generation
- Code is single-use
- Discount = `subtotal * 0.10`

---

## 5. Environment Variables

`.env`:

