const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	phone: { type: String, required: true, trim: true },
	department: { type: String, required: true, trim: true },
	salary: { type: Number, required: true, min: 0 },
	taxId: { type: String, required: true, unique: true, trim: true, matches: /^[A-Z0-9]{10}$/ }
}, { timestamps: true });

// Add indexes for optimization
EmployeeSchema.index({ email: 1 });
EmployeeSchema.index({ department: 1 });
EmployeeSchema.index({ taxId: 1 });

const Employee = mongoose.model('Employee', EmployeeSchema);

const PayrollSchema = new mongoose.Schema({
	employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
	month: { type: String, required: true }, // YYYY-MM format
	basicSalary: { type: Number, required: true, default: 0 },
	hra: { type: Number, required: true, default: 0 }, // House Rent Allowance (12% of basic)
	da: { type: Number, required: true, default: 0 }, // Dearness Allowance (8% of basic)
	grossSalary: { type: Number, required: true, default: 0 }, // basicSalary + hra + da
	incomeTax: { type: Number, required: true, default: 0 },
	providentFund: { type: Number, required: true, default: 0 },
	deductions: { type: Number, required: true, default: 0 },
	netSalary: { type: Number, required: true, default: 0 }, // grossSalary - deductions
	taxId: { type: String, required: true },
	status: { type: String, enum: ['pending', 'calculated', 'approved'], default: 'calculated' }
}, { timestamps: true });

// Add indexes for performance
PayrollSchema.index({ employeeId: 1, month: 1 }, { unique: true });
PayrollSchema.index({ month: 1 });
PayrollSchema.index({ status: 1 });

const Payroll = mongoose.model('Payroll', PayrollSchema);

module.exports = { Employee, Payroll };
