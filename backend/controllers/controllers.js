const { validationResult } = require('express-validator');
const Employee = require('../models/models');

exports.createEmployee = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	const { name, email, phone, department, salary } = req.body;
	try {
		const exists = await Employee.findOne({ email: email.toLowerCase() });
		if (exists) return res.status(409).json({ message: 'Email already exists' });

		const emp = new Employee({ name, email, phone, department, salary });
		await emp.save();
		res.status(201).json(emp);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.listEmployees = async (req, res) => {
	try {
		const list = await Employee.find().sort({ createdAt: -1 });
		res.json(list);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};

exports.getEmployee = async (req, res) => {
	try {
		const emp = await Employee.findById(req.params.id);
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
		const { name, email, phone, department, salary } = req.body;
		const emp = await Employee.findById(req.params.id);
		if (!emp) return res.status(404).json({ message: 'Employee not found' });

		if (email && email.toLowerCase() !== emp.email) {
			const dup = await Employee.findOne({ email: email.toLowerCase() });
			if (dup) return res.status(409).json({ message: 'Email already exists' });
		}

		emp.name = name;
		emp.email = email;
		emp.phone = phone;
		emp.department = department;
		emp.salary = salary;

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
		await emp.remove();
		res.json({ message: 'Employee deleted' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
};
