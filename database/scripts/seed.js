#!/usr/bin/env node

/**
 * Seed Database Script
 * Populates the database with sample employee and payroll data
 * 
 * Usage: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-payroll';

// Sample employee data
const sampleEmployees = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    phone: '+91-9876543210',
    department: 'IT',
    salary: 50000,
    taxId: 'RAJ001XYZ'
  },
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    phone: '+91-9876543211',
    department: 'HR',
    salary: 45000,
    taxId: 'PRIYA02ABC'
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@company.com',
    phone: '+91-9876543212',
    department: 'Finance',
    salary: 55000,
    taxId: 'AMIT003DEF'
  },
  {
    name: 'Deepika Singh',
    email: 'deepika.singh@company.com',
    phone: '+91-9876543213',
    department: 'Sales',
    salary: 48000,
    taxId: 'DEEP004GHI'
  },
  {
    name: 'Vikram Reddy',
    email: 'vikram.reddy@company.com',
    phone: '+91-9876543214',
    department: 'Operations',
    salary: 52000,
    taxId: 'VIK005JKL'
  }
];

// Payroll calculation function
const calculatePayroll = (baseSalary) => {
  const hra = baseSalary * 0.12;
  const da = baseSalary * 0.08;
  const grossSalary = baseSalary + hra + da;
  const incomeTax = grossSalary * 0.20;
  const providentFund = baseSalary * 0.10;
  const deductions = incomeTax + providentFund;
  const netSalary = grossSalary - deductions;

  return {
    basicSalary: baseSalary,
    hra: Math.round(hra * 100) / 100,
    da: Math.round(da * 100) / 100,
    grossSalary: Math.round(grossSalary * 100) / 100,
    incomeTax: Math.round(incomeTax * 100) / 100,
    providentFund: Math.round(providentFund * 100) / 100,
    deductions: Math.round(deductions * 100) / 100,
    netSalary: Math.round(netSalary * 100) / 100
  };
};

// Main seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Import models
    const { Employee, Payroll } = require('../../backend/models/models');

    // Clear existing data (optional)
    console.log('🗑️  Clearing existing data...');
    await Employee.deleteMany({});
    await Payroll.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed employees
    console.log('👥 Seeding employees...');
    const employees = await Employee.insertMany(sampleEmployees);
    console.log(`✅ Created ${employees.length} employees`);

    // Seed payroll records
    console.log('💰 Seeding payroll records...');
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

    const payrollRecords = employees.map(emp => {
      const payrollData = calculatePayroll(emp.salary);
      return {
        employeeId: emp._id,
        month: currentMonth,
        ...payrollData,
        taxId: emp.taxId,
        status: 'calculated'
      };
    });

    const payrolls = await Payroll.insertMany(payrollRecords);
    console.log(`✅ Created ${payrolls.length} payroll records for month ${currentMonth}`);

    // Display summary
    console.log('\n📊 Database Seeding Summary:');
    console.log('━'.repeat(50));
    console.log(`Employees: ${employees.length}`);
    console.log(`Payrolls: ${payrolls.length}`);
    console.log(`Month: ${currentMonth}`);
    console.log('━'.repeat(50));

    // Display employee details
    console.log('\n👥 Seeded Employees:');
    employees.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.name} (${emp.department}) - ₹${emp.salary}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Database seeding error:', error.message);
    console.error(error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();
