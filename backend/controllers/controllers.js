const { validationResult } = require('express-validator');
const { Employee, Payroll } = require('../models/models');

// Calculate payroll based on salary
const calculatePayroll = (basicSalary) => {
	const hra = basicSalary * 0.12; // 12% of basic salary
	const da = basicSalary * 0.08; // 8% of basic salary
	const grossSalary = basicSalary + hra + da;
	
	// Calculate deductions: Income Tax (20%) + Provident Fund (10%)
	const incomeTax = grossSalary * 0.20;
	const providentFund = basicSalary * 0.10;
	const deductions = incomeTax + providentFund;
	
	const netSalary = grossSalary - deductions;
	
	return {
		basicSalary,
		hra: Math.round(hra * 100) / 100,
		da: Math.round(da * 100) / 100,
		grossSalary: Math.round(grossSalary * 100) / 100,
		incomeTax: Math.round(incomeTax * 100) / 100,
		providentFund: Math.round(providentFund * 100) / 100,
		deductions: Math.round(deductions * 100) / 100,
		netSalary: Math.round(netSalary * 100) / 100
	};
};

// Employee CRUD Operations
exports.createEmployee = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name, email, phone, department, salary, taxId } = req.body;
	try {
		// Check for duplicate email
		const existsEmail = await Employee.findOne({ email: email.toLowerCase() });
		if (existsEmail) return res.status(409).json({ message: 'Email already exists' });

		// Check for duplicate Tax ID
		const existsTax = await Employee.findOne({ taxId: taxId.toUpperCase() });
		if (existsTax) return res.status(409).json({ message: 'Tax ID already exists' });

		const emp = new Employee({ 
			name, 
			email: email.toLowerCase(), 
			phone, 
			department, 
			salary,
			taxId: taxId.toUpperCase()
		});
		await emp.save();
		res.status(201).json(emp);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error: ' + err.message });
	}
};

exports.listEmployees = async (req, res) => {
	try {
		const list = await Employee.find().sort({ createdAt: -1 }).lean();
		res.json(list);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.getEmployee = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id).lean();
		if (!emp) return res.status(404).json({ message: 'Employee not found' });
		res.json(emp);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.updateEmployee = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const { name, email, phone, department, salary, taxId } = req.body;
		const emp = await Employee.findById(req.params.id);
		if (!emp) return res.status(404).json({ message: 'Employee not found' });

		// Check for duplicate email (exclude current employee)
		if (email && email.toLowerCase() !== emp.email) {
			const dupEmail = await Employee.findOne({ email: email.toLowerCase() });
			if (dupEmail) return res.status(409).json({ message: 'Email already exists' });
		}

		// Check for duplicate Tax ID (exclude current employee)
		if (taxId && taxId.toUpperCase() !== emp.taxId) {
			const dupTax = await Employee.findOne({ taxId: taxId.toUpperCase() });
			if (dupTax) return res.status(409).json({ message: 'Tax ID already exists' });
		}

		emp.name = name || emp.name;
		emp.email = email ? email.toLowerCase() : emp.email;
		emp.phone = phone || emp.phone;
		emp.department = department || emp.department;
		emp.salary = salary !== undefined ? salary : emp.salary;
		emp.taxId = taxId ? taxId.toUpperCase() : emp.taxId;

		await emp.save();
		res.json(emp);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.deleteEmployee = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id);
		if (!emp) return res.status(404).json({ message: 'Employee not found' });
		await Employee.findByIdAndDelete(req.params.id);
		res.json({ message: 'Employee deleted successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

// Payroll Operations
exports.calculatePayroll = async (req, res) => {
	try {
		const { employeeId, month } = req.body;
		
		// Validate inputs
		if (!employeeId) return res.status(400).json({ message: 'Employee ID is required' });
		if (!month) return res.status(400).json({ message: 'Month is required' });
		
		// Check if employee exists
		const employee = await Employee.findById(employeeId);
		if (!employee) return res.status(404).json({ message: 'Employee not found' });

		// Check if payroll already calculated for this month
		const existing = await Payroll.findOne({ employeeId, month });
		if (existing) {
			return res.status(409).json({ message: 'Payroll already calculated for this month', payroll: existing });
		}

		// Calculate payroll
		const payrollData = calculatePayroll(employee.salary);

		// Create payroll record
		const payroll = new Payroll({
			employeeId,
			month,
			...payrollData,
			taxId: employee.taxId,
			status: 'calculated'
		});

		await payroll.save();
		res.status(201).json(payroll);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error: ' + err.message });
	}
};

exports.getPayroll = async (req, res) => {
	try {
		const { employeeId } = req.params;
		
		// Get the most recent payroll record for this employee
		const payroll = await Payroll.findOne({ employeeId }).sort({ month: -1 }).lean();
		
		if (!payroll) {
			return res.status(404).json({ message: 'No payroll records found for this employee' });
		}

		res.json(payroll);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.getPayrollByMonth = async (req, res) => {
	try {
		const { employeeId, month } = req.params;
		
		const payroll = await Payroll.findOne({ employeeId, month }).lean();
		
		if (!payroll) {
			return res.status(404).json({ message: 'No payroll record found for this employee in the specified month' });
		}

		res.json(payroll);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.getAllPayrolls = async (req, res) => {
	try {
		const payrolls = await Payroll.find().populate('employeeId', 'name email taxId').sort({ month: -1, createdAt: -1 }).lean();
		res.json(payrolls);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};
