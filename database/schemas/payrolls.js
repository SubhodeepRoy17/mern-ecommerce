// MongoDB Schema for Payroll Collection
// This file documents the Payroll schema structure

db.createCollection("payrolls", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employeeId", "month", "basicSalary", "grossSalary", "deductions", "netSalary"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Payroll record unique identifier"
        },
        employeeId: {
          bsonType: "objectId",
          description: "Reference to Employee document (required)"
        },
        month: {
          bsonType: "string",
          pattern: "^[0-9]{4}-[0-9]{2}$",
          description: "Payroll month in YYYY-MM format (required)"
        },
        basicSalary: {
          bsonType: "double",
          minimum: 0,
          description: "Employee base salary (required)"
        },
        hra: {
          bsonType: "double",
          minimum: 0,
          description: "House Rent Allowance (12% of basic salary)"
        },
        da: {
          bsonType: "double",
          minimum: 0,
          description: "Dearness Allowance (8% of basic salary)"
        },
        grossSalary: {
          bsonType: "double",
          minimum: 0,
          description: "Gross salary = basic + HRA + DA (required)"
        },
        incomeTax: {
          bsonType: "double",
          minimum: 0,
          description: "Income tax (20% of gross salary)"
        },
        providentFund: {
          bsonType: "double",
          minimum: 0,
          description: "Provident fund (10% of basic salary)"
        },
        deductions: {
          bsonType: "double",
          minimum: 0,
          description: "Total deductions = income tax + provident fund (required)"
        },
        netSalary: {
          bsonType: "double",
          minimum: 0,
          description: "Net salary = gross salary - deductions (required)"
        },
        taxId: {
          bsonType: "string",
          description: "Employee tax ID reference"
        },
        status: {
          bsonType: "string",
          enum: ["pending", "calculated", "approved"],
          description: "Payroll status (default: calculated)"
        },
        createdAt: {
          bsonType: "date",
          description: "Payroll calculation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Payroll last update timestamp"
        }
      }
    }
  }
});

// Create indexes for performance
db.payrolls.createIndex({ employeeId: 1, month: 1 }, { unique: true });
db.payrolls.createIndex({ month: 1 });
db.payrolls.createIndex({ status: 1 });
db.payrolls.createIndex({ createdAt: -1 });

// Create a foreign key relationship (via application)
db.payrolls.createIndex({ employeeId: 1 });
