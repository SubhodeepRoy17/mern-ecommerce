# 💼 Payroll Management System - MERN Stack

A complete full-stack payroll management system built with **MongoDB**, **Express.js**, **React**, and **Node.js**. This system includes complete employee management with CRUD operations and automated payroll calculation with salary breakdown.

---

## 🎯 Features

### Employee Management
- ✅ **Create Employees** - Add new employees with validation
- ✅ **Read Employees** - Display all employees in a table
- ✅ **Update Employees** - Modify employee details
- ✅ **Delete Employees** - Remove employee records
- ✅ **Form Validation** - Comprehensive input validation
- ✅ **Duplicate Prevention** - Prevent duplicate emails and Tax IDs

### Payroll System
- ✅ **Calculate Payroll** - Automatic salary calculation
- ✅ **Salary Breakdown** - Detailed breakdown of deductions and allowances
- ✅ **Tax Calculation** - Automatic income tax calculation (20% of gross)
- ✅ **Provident Fund** - Automatic PF calculation (10% of basic)
- ✅ **Monthly Records** - Store payroll for each month

### User Interface
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Clean UI** - Modern, user-friendly interface
- ✅ **Loading States** - Visual feedback during API calls
- ✅ **Error Alerts** - Clear error messages
- ✅ **Success Notifications** - Confirmation after operations

### Backend
- ✅ **RESTful APIs** - Complete REST API endpoints
- ✅ **Input Validation** - Express-validator middleware
- ✅ **Error Handling** - Comprehensive error handling
- ✅ **Database Optimization** - Indexes on key fields
- ✅ **CORS Enabled** - Cross-origin requests allowed

---

## 📋 Payroll Calculation Formula

```
Basic Salary: Employee's base salary
HRA (House Rent Allowance): 12% of Basic Salary
DA (Dearness Allowance): 8% of Basic Salary
---
Gross Salary = Basic + HRA + DA

Income Tax: 20% of Gross Salary
Provident Fund: 10% of Basic Salary
---
Total Deductions = Income Tax + Provident Fund
Net Salary = Gross Salary - Total Deductions
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud)
- Git

### Installation

#### 1. Clone Repository
```bash
git clone https://github.com/SubhodeepRoy17/mern-ecommerce.git
cd mern-ecommerce
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern-payroll
NODE_ENV=development
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `.env` file in frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

#### Terminal 1 - Start MongoDB (if local)
```bash
mongod
```

#### Terminal 2 - Start Backend
```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

#### Terminal 3 - Start Frontend
```bash
cd frontend
npm start
```

Frontend opens on: `http://localhost:3000`

---

## 📁 Project Structure

```
mern-ecommerce/
├── backend/
│   ├── config/
│   │   └── confi.js           # MongoDB connection config
│   ├── controllers/
│   │   └── controllers.js      # Business logic (CRUD + Payroll)
│   ├── models/
│   │   └── models.js           # Employee & Payroll schemas
│   ├── routes/
│   │   └── routes.js           # API endpoints
│   ├── server.js               # Express server setup
│   ├── package.json
│   └── .env                    # Environment variables
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.jsx        # Create/Edit form
│   │   │   ├── EmployeeTable.jsx       # List view with actions
│   │   │   └── PayrollDisplay.jsx      # Salary breakdown
│   │   ├── App.jsx             # Main app component
│   │   ├── index.jsx           # React entry point
│   │   ├── api.js              # Axios instance
│   │   ├── index.css
│   │   └── App.css
│   ├── package.json
│   └── .env                    # Environment variables
│
├── API_DOCUMENTATION.md        # Complete API reference
├── PROJECT_STATUS.md           # Implementation details
└── README.md                   # This file
```

---

## 🔌 API Endpoints

### Employee Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/employees` | Create new employee |
| GET | `/api/employees` | Get all employees |
| GET | `/api/employees/:id` | Get single employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Payroll Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payroll/calculate` | Calculate payroll |
| GET | `/api/payroll/:employeeId` | Get latest payroll |
| GET | `/api/payroll/:employeeId/:month` | Get payroll by month |
| GET | `/api/payroll-all` | Get all payrolls |

### Example Requests

#### Create Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@company.com",
    "phone": "+91-9876543210",
    "department": "IT",
    "salary": 50000,
    "taxId": "ABC1234XYZ"
  }'
```

#### Calculate Payroll
```bash
curl -X POST http://localhost:5000/api/payroll/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "507f1f77bcf86cd799439011",
    "month": "2026-02"
  }'
```

---

## 📝 Required Fields

### Employee Fields
- **Name** - Employee's full name (required)
- **Email** - Valid email address (required, unique)
- **Phone** - Contact number (required)
- **Department** - HR, IT, Finance, Sales, Operations (required)
- **Base Salary** - Monthly salary (required, positive number)
- **Tax ID** - 10-character tax identifier (required, unique)

### Payroll Fields
- **Employee ID** - Reference to employee (required)
- **Month** - Month in YYYY-MM format (required)

---

## 🧪 Testing

### Using Postman
1. Import the API endpoints from API_DOCUMENTATION.md
2. Use the example requests provided
3. Test CRUD operations and payroll calculation

### Using Frontend UI
1. Go to http://localhost:3000
2. Add a new employee
3. Verify employee appears in list
4. Click "Payroll" button
5. Click "Calculate Payroll"
6. Verify salary breakdown displays correctly

---

## ✅ Validation Rules

### Employee
- Name: Required, non-empty string
- Email: Valid email format, unique in database
- Phone: Required, non-empty string
- Department: Must be one of predefined departments
- Salary: Must be numeric and positive
- Tax ID: Must be exactly 10 alphanumeric characters, unique

### Payroll
- Employee ID: Must exist in database
- Month: Must be in YYYY-MM format

---

## 🔒 Security Features

- **Email Validation** - Automatic lowercase and trim
- **Unique Constraints** - Prevent duplicate emails and Tax IDs
- **Input Sanitization** - CORS protection with helmet
- **Error Logging** - Console logging for debugging
- **Validation Middleware** - Express-validator on all inputs

---

## 📊 Database Schema

### Employee Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  department: String,
  salary: Number,
  taxId: String (unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Payroll Collection
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId (ref: Employee),
  month: String (YYYY-MM),
  basicSalary: Number,
  hra: Number,
  da: Number,
  grossSalary: Number,
  incomeTax: Number,
  providentFund: Number,
  deductions: Number,
  netSalary: Number,
  taxId: String,
  status: String (calculated/approved),
  createdAt: Date,
  updatedAt: Date
}
```

### Database Indexes
*Employee*
- `email` (unique)
- `department`
- `taxId` (unique)

*Payroll*
- `employeeId` + `month` (unique compound)
- `month`
- `status`

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Validation:** express-validator
- **Security:** Helmet, CORS
- **Logging:** Morgan
- **Environment:** dotenv
- **Language:** JavaScript

### Frontend
- **Library:** React (Hooks)
- **HTTP:** Axios
- **Styling:** CSS (inline + CSS files)
- **Build:** Create React App
- **Language:** JavaScript (No TypeScript)

---

## 🎨 User Interface

### Pages
1. **Employee List** - View all employees with actions
2. **Add Employee** - Create new employee form
3. **Edit Employee** - Modify existing employee
4. **Payroll Detail** - View salary breakdown

### Key UI Components
- Form with validation and error messages
- Table with edit and payroll buttons
- Payroll display with salary breakdown
- Loading states and success notifications
- Responsive design for all screen sizes

---

## 📋 Checklist for Demo

- [x] All files converted to JavaScript
- [x] MongoDB indexes created
- [x] Employee CRUD implemented
- [x] Payroll calculation implemented
- [x] Frontend fully integrated
- [x] Form validation working
- [x] Error handling in place
- [x] UI responsive and clean
- [x] API documentation provided
- [x] No critical bugs
- [x] No debug/console.log in production code
- [x] System ready for production

---

## 🐛 Troubleshooting

### MongoDB Not Connecting
```bash
# Check MongoDB is running
mongod

# Verify connection in backend logs
# Should show: "MongoDB connected"
```

### Port Already in Use
```bash
# Change PORT in backend/.env
PORT=5001

# Change port for frontend
npm start -- --port 3001
```

### CORS Errors
- Verify REACT_APP_API_URL in frontend/.env
- Ensure backend CORS is enabled (it is by default)

### Frontend Not Loading Data
- Check browser console for errors
- Verify backend is running on correct port
- Check network tab to see API requests

---