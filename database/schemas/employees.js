// MongoDB Schema for Employee Collection
// This file documents the Employee schema structure

db.createCollection("employees", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "phone", "department", "salary", "taxId"],
      properties: {
        _id: {
          bsonType: "objectId",
          description: "Employee unique identifier"
        },
        name: {
          bsonType: "string",
          description: "Employee full name (required)"
        },
        email: {
          bsonType: "string",
          description: "Employee email address (required, unique, lowercase)"
        },
        phone: {
          bsonType: "string",
          description: "Employee phone number (required)"
        },
        department: {
          bsonType: "string",
          enum: ["HR", "IT", "Finance", "Sales", "Operations"],
          description: "Employee department (required)"
        },
        salary: {
          bsonType: "double",
          minimum: 0,
          description: "Employee base salary (required, positive number)"
        },
        taxId: {
          bsonType: "string",
          pattern: "^[A-Z0-9]{10}$",
          description: "Employee tax ID (required, 10 alphanumeric, unique)"
        },
        createdAt: {
          bsonType: "date",
          description: "Employee creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Employee last update timestamp"
        }
      }
    }
  }
});

// Create indexes for performance
db.employees.createIndex({ email: 1 }, { unique: true });
db.employees.createIndex({ taxId: 1 }, { unique: true });
db.employees.createIndex({ department: 1 });
db.employees.createIndex({ createdAt: -1 });
