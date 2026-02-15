# Database Folder Documentation

## Overview
This folder contains all database-related files including schemas, scripts, and seed data for the Payroll Management System.

## Folder Structure

```
database/
├── schemas/              # Database schema definitions
│   ├── employees.js     # Employee collection schema with indexes
│   └── payrolls.js      # Payroll collection schema with indexes
├── scripts/             # Utility scripts for database management
│   ├── init-db.js       # Database initialization and utilities
│   ├── seed.js          # Seed database with sample data
│   ├── backup.js        # Backup database to JSON files
│   └── status.js        # Check database status and statistics
├── seed-data/           # Sample data files
│   ├── employees.json   # Sample employee records
│   └── payrolls.json    # Payroll calculation reference
└── backups/             # Backup files (created at runtime)
```

## Schema Files

### employees.js
Defines the Employee collection structure:
- **Fields:** name, email, phone, department, salary, taxId
- **Indexes:** email (unique), taxId (unique), department, createdAt
- **Validation:** All required fields, email format, department enum, salary positive

### payrolls.js
Defines the Payroll collection structure:
- **Fields:** employeeId, month, salary breakdown, deductions, status
- **Indexes:** employeeId+month (unique compound), month, status, createdAt
- **Validation:** All required fields, month YYYY-MM format

## Scripts

### init-db.js
Database initialization utilities:
```javascript
// Import and use:
const { connectDB, closeDB, getDBStats, listCollections, getCollectionCounts } = require('./scripts/init-db');
```

### seed.js
Populate database with sample data:
```bash
node database/scripts/seed.js
```
Creates 5 sample employees and their payroll records for the current month.

### backup.js
Create database backups:
```bash
node database/scripts/backup.js
```
Exports employees and payrolls to JSON files in `database/backups/` directory.

### status.js
Check database status:
```bash
node database/scripts/status.js
```
Displays database connection status, collection counts, and server info.

## Sample Data

### employees.json
Contains 5 sample employees:
1. Rajesh Kumar - IT - ₹50,000
2. Priya Sharma - HR - ₹45,000
3. Amit Patel - Finance - ₹55,000
4. Deepika Singh - Sales - ₹48,000
5. Vikram Reddy - Operations - ₹52,000

### payrolls.json
Documents the payroll calculation formula and structure.

## Quick Start

### 1. Initialize Database (First Time)
```bash
cd /workspaces/mern-ecommerce
node database/scripts/seed.js
```

### 2. Check Database Status
```bash
node database/scripts/status.js
```

### 3. Backup Database
```bash
node database/scripts/backup.js
```

## Database Schema Details

### Employee Collection
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  phone: String (required),
  department: String (required, enum),
  salary: Number (required, minimum 0),
  taxId: String (required, unique, 10 alphanumeric),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Payroll Collection
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId (ref: Employee),
  month: String (YYYY-MM format),
  basicSalary: Number,
  hra: Number (12% of basic),
  da: Number (8% of basic),
  grossSalary: Number,
  incomeTax: Number (20% of gross),
  providentFund: Number (10% of basic),
  deductions: Number,
  netSalary: Number,
  taxId: String,
  status: String (pending/calculated/approved),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Payroll Calculation Formula

```
Given: Employee Salary (Basic)

Step 1: Allowances
  HRA = Basic × 12%
  DA = Basic × 8%
  Gross = Basic + HRA + DA

Step 2: Deductions
  Income Tax = Gross × 20%
  Provident Fund = Basic × 10%
  Total Deductions = Income Tax + PF

Step 3: Net Salary
  Net = Gross - Deductions
```

## Database Indexes

### Employee Indexes
- `{ email: 1 }` - Unique index for fast lookups
- `{ taxId: 1 }` - Unique index for tax ID validation
- `{ department: 1 }` - Regular index for filtering
- `{ createdAt: -1 }` - For sorting by creation date

### Payroll Indexes
- `{ employeeId: 1, month: 1 }` - Unique compound index to prevent duplicates
- `{ month: 1 }` - For monthly reports
- `{ status: 1 }` - For filtering by approval status
- `{ createdAt: -1 }` - For sorting by creation date

## Usage Examples

### Run seed script with sample data
```bash
cd /workspaces/mern-ecommerce
node database/scripts/seed.js
```

### Create backup before making changes
```bash
node database/scripts/backup.js
```

### Monitor database status
```bash
node database/scripts/status.js
```

## Notes

- All scripts require MongoDB to be running
- Environment variables are loaded from `backend/.env`
- Default MongoDB URI: `mongodb://127.0.0.1:27017/mern-payroll`
- Backup files are stored in `database/backups/` directory
- All timestamps are in UTC format

## Support

For more information:
- See `API_DOCUMENTATION.md` for API details
- See `README.md` for overall project info
- See `SETUP_GUIDE.md` for setup instructions
