# 📅 Week 2 Tasks – Full Stack Interns
## Payroll SaaS Platform (Planning & Design Phase)

> **Note:** Week 2 is focused on planning, architecture, and system design. Heavy coding is not expected.

---

## 1️⃣ Database Schema Design

### 📌 Objective
Design a normalized and scalable database schema for the Payroll SaaS platform.

### 🗂️ Tables & Schema Design

#### 🧑‍💼 Employees
| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| employee_id (PK) | UUID | Unique employee identifier |
| name | VARCHAR(100) | Employee full name |
| email | VARCHAR(100) | Unique email |
| role | ENUM(HR, EMPLOYEE) | Role-based access |
| department_id (FK) | UUID | Linked department |
| salary | DECIMAL(10,2) | Monthly base salary |
| joining_date | DATE | Date of joining |
| status | ENUM(active, inactive) | Employment status |

#### 🏢 Departments
| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| department_id (PK) | UUID | Unique department ID |
| department_name | VARCHAR(100) | Department name |
| client_id (FK) | UUID | Associated client |

#### 🏭 Clients
| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| client_id (PK) | UUID | Unique client ID |
| client_name | VARCHAR(100) | Client/company name |
| contact_email | VARCHAR(100) | Client contact email |

#### ⏱️ Attendance
| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| attendance_id (PK) | UUID | Unique record |
| employee_id (FK) | UUID | Employee reference |
| date | DATE | Attendance date |
| status | ENUM(present, absent, leave) | Attendance status |

#### 💰 Payroll
| Column Name | Data Type | Description |
|-------------|-----------|-------------|
| payroll_id (PK) | UUID | Payroll record ID |
| employee_id (FK) | UUID | Employee reference |
| month | VARCHAR(20) | Payroll month |
| gross_salary | DECIMAL(10,2) | Base salary |
| deductions | DECIMAL(10,2) | Salary deductions |
| net_salary | DECIMAL(10,2) | Final salary |
| generated_on | DATE | Payroll generation date |

### 🔗 Relationships
- One Client → Many Departments
- One Department → Many Employees
- One Employee → Many Attendance Records
- One Employee → Many Payroll Records

---

## 2️⃣ Backend Architecture Planning

### 📌 Objective
Create a layered, maintainable backend architecture.

### 📁 Folder Structure
```
backend/
├─ routes/        # API routes
├─ controllers/   # Request handling
├─ services/      # Business logic
├─ models/        # Database schemas
├─ middlewares/   # Auth & validation
└─ config/        # DB & env config
```

### 🔄 Layer Responsibilities
- **Routes:** Define endpoints only
- **Controllers:** Handle request/response
- **Services:** Core business logic
- **Models:** Database schemas
- **Middlewares:** Authentication & validation

---

## 3️⃣ REST API Planning

### 📌 Objective
Define clear and consistent APIs for frontend-backend integration.

### 🔐 Authentication APIs
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/profile
```

### 👥 Employees APIs
```
POST   /api/employees
GET    /api/employees
GET    /api/employees/:id
PUT    /api/employees/:id
DELETE /api/employees/:id
```

### 🏢 Departments APIs
```
POST /api/departments
GET  /api/departments
```

### ⏱️ Attendance APIs
```
POST /api/attendance/mark
GET  /api/attendance/employee/:id
```

### 💰 Payroll APIs
```
POST /api/payroll/generate
GET  /api/payroll/month/:month
GET  /api/payroll/employee/:id
```

---

## 4️⃣ Payroll Processing Workflow

### 📌 Objective
Define step-by-step payroll calculation logic.

### 🔄 Payroll Flow
1. Fetch employee base salary
2. Fetch attendance for the month
3. Count absent & leave days
4. Calculate deductions
5. Compute net salary
6. Store payroll record in database

### 🧮 Formula
```
Daily Salary = Monthly Salary / Total Working Days
Deduction = Absent Days × Daily Salary
Net Salary = Gross Salary − Deduction
```

---

## 5️⃣ Authentication Strategy

### 📌 Objective
Implement secure role-based authentication.

### 🔐 Strategy
- JWT-based authentication
- Token generated at login
- Token sent in Authorization header

### 🔑 Access Control
| Role | Access |
|------|--------|
| HR | Full system access |
| Employee | Own attendance & payroll |

---

## 6️⃣ Frontend Page Planning

### 📌 Objective
Plan role-based frontend pages (no coding).

### 📄 Pages & Access
| Page | Access |
|------|--------|
| Login | Public |
| HR Dashboard | HR only |
| Employee Dashboard | Employee only |
| Employee Management | HR only |
| Payroll View | HR & Employee (own data) |

---
