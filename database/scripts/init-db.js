// Database initialization and setup script
// Run this to set up the complete database structure

const mongoose = require('mongoose');

// Database connection configuration
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern-payroll';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};

// Close connection
const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error closing database:', error.message);
  }
};

// Get database statistics
const getDBStats = async () => {
  try {
    const connection = mongoose.connection.db;
    const stats = await connection.admin().serverStatus();
    console.log('📊 Database Statistics:');
    console.log(`   - Version: ${stats.version}`);
    console.log(`   - Uptime: ${stats.uptime} seconds`);
    console.log(`   - Connections: ${stats.connections.current}`);
  } catch (error) {
    console.error('Error getting stats:', error.message);
  }
};

// List all collections
const listCollections = async () => {
  try {
    const connection = mongoose.connection.db;
    const collections = await connection.listCollections().toArray();
    console.log('📦 Collections in database:');
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    return collections;
  } catch (error) {
    console.error('Error listing collections:', error.message);
  }
};

// Get collection counts
const getCollectionCounts = async () => {
  try {
    const employeeCount = await mongoose.connections[0].collections.employees?.countDocuments() || 0;
    const payrollCount = await mongoose.connections[0].collections.payrolls?.countDocuments() || 0;
    
    console.log('📈 Collection Document Counts:');
    console.log(`   - Employees: ${employeeCount}`);
    console.log(`   - Payrolls: ${payrollCount}`);
  } catch (error) {
    console.error('Error getting counts:', error.message);
  }
};

module.exports = {
  connectDB,
  closeDB,
  getDBStats,
  listCollections,
  getCollectionCounts
};
