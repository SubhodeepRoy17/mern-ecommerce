#!/usr/bin/env node

/**
 * Database Status and Info Script
 * Displays current database status and statistics
 * 
 * Usage: node status.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-payroll';

const getDBStatus = async () => {
  try {
    console.log('\n🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB\n');

    const { Employee, Payroll } = require('../../backend/models/models');

    // Get counts
    const employeeCount = await Employee.countDocuments();
    const payrollCount = await Payroll.countDocuments();

    // Get database stats
    const db = mongoose.connection.db;
    const stats = await db.admin().serverStatus();

    console.log('📊 Database Status Report');
    console.log('━'.repeat(50));
    
    console.log('\n🗄️  Database Info:');
    console.log(`   Name: ${db.getName()}`);
    console.log(`   URI: ${MONGO_URI}`);
    console.log(`   Status: Connected ✅`);

    console.log('\n📈 Collections:');
    console.log(`   Employees: ${employeeCount} documents`);
    console.log(`   Payrolls: ${payrollCount} documents`);

    console.log('\n⚙️  Server Info:');
    console.log(`   Version: ${stats.version}`);
    console.log(`   Uptime: ${Math.floor(stats.uptime / 60)} minutes`);
    console.log(`   Active Connections: ${stats.connections.current}`);

    // Get sample employee
    const sampleEmployee = await Employee.findOne().lean();
    if (sampleEmployee) {
      console.log('\n👤 Sample Employee:');
      console.log(`   Name: ${sampleEmployee.name}`);
      console.log(`   Email: ${sampleEmployee.email}`);
      console.log(`   Department: ${sampleEmployee.department}`);
      console.log(`   Salary: ₹${sampleEmployee.salary}`);
    } else {
      console.log('\n⚠️  No employees found in database');
    }

    console.log('\n' + '━'.repeat(50));

    await mongoose.connection.close();
    console.log('\n✅ Status check completed!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
};

getDBStatus();
