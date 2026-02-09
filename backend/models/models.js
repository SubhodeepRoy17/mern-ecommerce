const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	phone: { type: String, required: true, trim: true },
	department: { type: String, required: true, trim: true },
	salary: { type: Number, required: true, min: 0 }
}, { timestamps: true });

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
