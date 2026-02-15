#!/usr/bin/env node

/**
 * Database Backup Script
 * Exports employee and payroll data to JSON files
 * 
 * Usage: node backup.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-payroll';
const BACKUP_DIR = path.join(__dirname, '../backups');

// Create backups directory if it doesn't exist
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const backupDatabase = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const { Employee, Payroll } = require('../../backend/models/models');

    // Backup employees
    console.log('👥 Backing up employees...');
    const employees = await Employee.find().lean();
    const employeeBackupPath = path.join(BACKUP_DIR, `employees-${Date.now()}.json`);
    fs.writeFileSync(employeeBackupPath, JSON.stringify(employees, null, 2));
    console.log(`✅ Employees backed up to ${employeeBackupPath}`);

    // Backup payrolls
    console.log('💰 Backing up payrolls...');
    const payrolls = await Payroll.find().populate('employeeId').lean();
    const payrollBackupPath = path.join(BACKUP_DIR, `payrolls-${Date.now()}.json`);
    fs.writeFileSync(payrollBackupPath, JSON.stringify(payrolls, null, 2));
    console.log(`✅ Payrolls backed up to ${payrollBackupPath}`);

    // Display summary
    console.log('\n📊 Backup Summary:');
    console.log('━'.repeat(50));
    console.log(`Employees backed up: ${employees.length}`);
    console.log(`Payrolls backed up: ${payrolls.length}`);
    console.log(`Backup location: ${BACKUP_DIR}`);
    console.log('━'.repeat(50));

    await mongoose.connection.close();
    console.log('\n✅ Backup completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Backup error:', error.message);
    process.exit(1);
  }
};

backupDatabase();
