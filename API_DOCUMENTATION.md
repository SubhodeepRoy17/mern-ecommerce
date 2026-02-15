# Payroll Management System - Integration Test Guide

## System Overview
This is a complete MERN stack payroll management system with complete CRUD operations for employees and payroll calculation functionality.

## Prerequisites
1. Node.js (v14+)
2. MongoDB (running locally or via MongoDB Atlas)
3. npm or yarn
4. Postman (for API testing)

## Installation & Setup

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-payroll
NODE_ENV=development
```

Run the backend:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm start
```

The frontend will be running on `http://localhost:3000`

## API Endpoints Documentation

### Employee Management Endpoints

#### 1. Create Employee
**Endpoint:** `POST /api/employees`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+91-9876543210",
  "department": "IT",
  "salary": 50000,
  "taxId": "ABC1234XYZ"
}
```

**Success Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+91-9876543210",
  "department": "IT",
  "salary": 50000,
  "taxId": "ABC1234XYZ",
  "createdAt": "2026-02-13T10:30:00Z",
  "updatedAt": "2026-02-13T10:30:00Z"
}
```

**Error Responses:**
- 400: Invalid input data
- 409: Email or Tax ID already exists
- 500: Server error

---

#### 2. List All Employees
**Endpoint:** `GET /api/employees`

**Success Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+91-9876543210",
    "department": "IT",
    "salary": 50000,
    "taxId": "ABC1234XYZ",
    "createdAt": "2026-02-13T10:30:00Z"
  }
]
```

---

#### 3. Get Single Employee
**Endpoint:** `GET /api/employees/:id`

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+91-9876543210",
  "department": "IT",
  "salary": 50000,
  "taxId": "ABC1234XYZ"
}
```

**Error Responses:**
- 404: Employee not found
- 500: Server error

---

#### 4. Update Employee
**Endpoint:** `PUT /api/employees/:id`

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "+91-9876543210",
  "department": "Finance",
  "salary": 60000,
  "taxId": "ABC1234XYZ"
}
```

**Success Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Smith",
  "email": "john.smith@example.com",
  "phone": "+91-9876543210",
  "department": "Finance",
  "salary": 60000,
  "taxId": "ABC1234XYZ",
  "updatedAt": "2026-02-13T11:00:00Z"
}
```

---

#### 5. Delete Employee
**Endpoint:** `DELETE /api/employees/:id`

**Success Response (200):**
```json
{
  "message": "Employee deleted successfully"
}
```

**Error Responses:**
- 404: Employee not found
- 500: Server error

---

### Payroll Endpoints

#### 1. Calculate Payroll
**Endpoint:** `POST /api/payroll/calculate`

**Request Body:**
```json
{
  "employeeId": "507f1f77bcf86cd799439011",
  "month": "2026-02"
}
```

**Payroll Calculation Logic:**
- Basic Salary = Employee's Base Salary
- HRA = 12% of Basic Salary
- Dearness Allowance (DA) = 8% of Basic Salary
- Gross Salary = Basic + HRA + DA
- Income Tax = 20% of Gross Salary
- Provident Fund = 10% of Basic Salary
- Total Deductions = Income Tax + Provident Fund
- Net Salary = Gross Salary - Total Deductions

**Success Response (201):**
```json
{
  "_id": "607f1f77bcf86cd799439012",
  "employeeId": "507f1f77bcf86cd799439011",
  "month": "2026-02",
  "basicSalary": 50000,
  "hra": 6000,
  "da": 4000,
  "grossSalary": 60000,
  "incomeTax": 12000,
  "providentFund": 5000,
  "deductions": 17000,
  "netSalary": 43000,
  "taxId": "ABC1234XYZ",
  "status": "calculated",
  "createdAt": "2026-02-13T10:35:00Z"
}
```

**Error Responses:**
- 400: Missing required fields
- 404: Employee not found
- 409: Payroll already calculated for this month
- 500: Server error

---

#### 2. Get Latest Payroll for Employee
**Endpoint:** `GET /api/payroll/:employeeId`

**Success Response (200):**
```json
{
  "_id": "607f1f77bcf86cd799439012",
  "employeeId": "507f1f77bcf86cd799439011",
  "month": "2026-02",
  "basicSalary": 50000,
  "hra": 6000,
  "da": 4000,
  "grossSalary": 60000,
  "incomeTax": 12000,
  "providentFund": 5000,
  "deductions": 17000,
  "netSalary": 43000
}
```

**Error Responses:**
- 404: No payroll records found
- 500: Server error

---

#### 3. Get Payroll for Specific Month
**Endpoint:** `GET /api/payroll/:employeeId/:month`

Example: `GET /api/payroll/507f1f77bcf86cd799439011/2026-02`

**Success Response (200):** Same as above

---

#### 4. Get All Payrolls
**Endpoint:** `GET /api/payroll-all`

**Success Response (200):**
```json
[
  {
    "_id": "607f1f77bcf86cd799439012",
    "employeeId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "taxId": "ABC1234XYZ"
    },
    "month": "2026-02",
    "grossSalary": 60000,
    "deductions": 17000,
    "netSalary": 43000,
    "status": "calculated"
  }
]
```

---

## Integration Testing Flow

### Step 1: Create Test Employee
1. Use Postman POST `/api/employees`
2. Provide all required fields (name, email, phone, department, salary, taxId)
3. Verify response contains created employee with ID

### Step 2: Verify Employee Creation
1. Use GET `/api/employees` to list all employees
2. Use GET `/api/employees/:id` to fetch the specific employee
3. Confirm data matches what was sent

### Step 3: Update Employee
1. Use PUT `/api/employees/:id`
2. Update salary or department
3. Verify updated data in response

### Step 4: Calculate Payroll
1. Use POST `/api/payroll/calculate`
2. Provide employeeId and month (YYYY-MM format)
3. Verify payroll is calculated correctly

### Step 5: Verify Payroll Display
1. Go to frontend http://localhost:3000
2. Navigate to Employee List
3. Click "Payroll" button on the employee
4. Verify salary breakdown is displayed:
   - Gross Salary
   - Basic Salary
   - HRA
   - Dearness Allowance
   - Total Deductions
   - Net Salary

### Step 6: Delete Employee
1. Use DELETE `/api/employees/:id`
2. Verify deletion response
3. Confirm employee no longer appears in list

---

## Frontend Features

### Employee Management Page
- **Add Employee:** Form with validation for all required fields
- **Employee Table:** List with Edit and Payroll buttons
- **Edit Employee:** Modify existing employee details
- **Payroll Display:** Shows salary breakdown with calculation details

### Key UI Features
- Real-time form validation
- Loading states while API calls are in progress
- Error alerts for failed operations
- Success notifications after operations
- Responsive design with clean UI

---

## Database Optimization

### Indexes Added
1. **Employee Collection:**
   - Index on `email` (unique)
   - Index on `department` (for filtering)
   - Index on `taxId` (unique)

2. **Payroll Collection:**
   - Compound index on `employeeId` + `month` (unique)
   - Index on `month` (for monthly reports)
   - Index on `status` (for filtering by approval status)

---

## Validation Rules

### Employee Fields
- **Name:** Required, string, trimmed
- **Email:** Required, valid email format, unique, lowercase
- **Phone:** Required, string
- **Department:** Required, one of (HR, IT, Finance, Sales, Operations)
- **Salary:** Required, numeric, positive
- **Tax ID:** Required, 10 alphanumeric characters (format: ABC1234XYZ), unique

### Payroll Fields
- **Employee ID:** Required, must exist
- **Month:** Required, format YYYY-MM

---

## Error Handling

### Common Error Responses
- **400 Bad Request:** Missing or invalid fields, validation errors
- **404 Not Found:** Employee or payroll record not found
- **409 Conflict:** Duplicate email, tax ID, or payroll already calculated
- **500 Server Error:** Database or server errors

---

