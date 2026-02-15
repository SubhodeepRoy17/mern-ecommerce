# ⚡ Quick Setup Guide - Payroll System

## 🎯 One-Command Setup

### 1. Start MongoDB
```bash
mongod
```

### 2. Start Backend
```bash
cd backend
npm install        # First time only
npm run dev
```

✅ Backend ready at: `http://localhost:5000`

### 3. Start Frontend
```bash
cd frontend
npm install        # First time only
npm start
```

✅ Frontend opens at: `http://localhost:3000`

---

## 🧪 Quick Test

### Test 1: Create Employee (2 minutes)
1. Open http://localhost:3000
2. Click "Add Employee"
3. Fill form:
   - Name: `John Doe`
   - Email: `john@company.com`
   - Phone: `+91-9876543210`
   - Department: `IT`
   - Salary: `50000`
   - Tax ID: `ABC1234XYZ`
4. Click "Add"
5. ✅ Should see success message

---

### Test 2: Calculate Payroll (2 minutes)
1. In employee list, click "Payroll" button
2. Click "Calculate Payroll for Current Month"
3. ✅ Should see salary breakdown:
   - Gross Salary
   - Deductions
   - Net Salary

---

### Test 3: Edit Employee (1 minute)
1. Click "Edit" button on employee
2. Change salary to `60000`
3. Click "Update"
4. ✅ Should see updated salary in list

---

### Test 4: Delete Employee (1 minute)
1. Click "Delete" button
2. Confirm deletion
3. ✅ Employee should be removed from list

---

## 📋 API Quick Test (Using Curl)

### Create Employee
```bash
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@company.com",
    "phone": "+91-9876543211",
    "department": "HR",
    "salary": 45000,
    "taxId": "XYZ9876ABC"
  }'
```

### Get All Employees
```bash
curl http://localhost:5000/api/employees
```

### Calculate Payroll (replace EMPLOYEE_ID)
```bash
curl -X POST http://localhost:5000/api/payroll/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "EMPLOYEE_ID_HERE",
    "month": "2026-02"
  }'
```

---

## ⚠️ Troubleshooting

### Backend Won't Start
```bash
# Check MongoDB is running first
mongod

# Verify backend logs
cd backend
npm run dev
# Should see: "MongoDB connected" and "Server listening on port 5000"
```

### Frontend Can't Connect to Backend
1. Check backend is running
2. Verify `.env` file has: `REACT_APP_API_URL=http://localhost:5000/api`
3. Restart frontend: `npm start`

### Port Already in Use
```bash
# Change backend port in `.env`
PORT=5001

# Run frontend on different port
npm start -- --port 3001
```

---

## 📋 Required Files

### Backend
- ✅ `.env` file with MongoDB URI and PORT
- ✅ `package.json` with dependencies
- ✅ `server.js` running on port 5000
- ✅ Routes at `/api/employees` and `/api/payroll`

### Frontend
- ✅ `.env` file with API URL
- ✅ `package.json` with dependencies
- ✅ React app running on port 3000
- ✅ Components: App.jsx, EmployeeForm.jsx, EmployeeTable.jsx, PayrollDisplay.jsx

---

## ✅ Demo Checklist

- [ ] MongoDB running
- [ ] Backend started (http://localhost:5000)
- [ ] Frontend started (http://localhost:3000)
- [ ] Create employee test passed
- [ ] Calculate payroll test passed
- [ ] Edit employee test passed
- [ ] Delete employee test passed
- [ ] No errors in browser console
- [ ] No errors in backend console
- [ ] All .js/.jsx files (no TypeScript remaining)

---

## 📖 Full Documentation

For detailed information:
- **API Reference:** See `API_DOCUMENTATION.md`
- **Implementation Details:** See `PROJECT_STATUS.md`
- **Overview:** See `README.md`

---

## 🎉 You're Ready!

Everything is pre-configured and ready to use. Just follow the quick setup steps above and you're good to go!

**Questions?** Check the documentation files or review error messages carefully.

---

**Demo Deadline:** Wednesday, 11:00 AM  
**Status:** ✅ Ready for Demo
