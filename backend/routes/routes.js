const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/controllers');

// Employee validation middleware
const employeeValidation = [
	body('name').notEmpty().withMessage('Name is required').trim(),
	body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
	body('phone').notEmpty().withMessage('Phone is required').trim(),
	body('department').notEmpty().withMessage('Department is required').trim(),
	body('salary').isNumeric().withMessage('Salary must be numeric').custom(v => v > 0).withMessage('Salary must be positive'),
	body('taxId').notEmpty().withMessage('Tax ID is required').matches(/^[A-Z0-9]{10}$/).withMessage('Tax ID must be 10 alphanumeric characters')
];

// Employee CRUD endpoints
router.post('/employees', employeeValidation, ctrl.createEmployee);
router.get('/employees', ctrl.listEmployees);
router.get('/employees/:id', ctrl.getEmployee);
router.put('/employees/:id', employeeValidation, ctrl.updateEmployee);
router.delete('/employees/:id', ctrl.deleteEmployee);

// Payroll endpoints
router.post('/payroll/calculate', [
	body('employeeId').notEmpty().withMessage('Employee ID is required'),
	body('month').matches(/^\d{4}-\d{2}$/).withMessage('Month must be in YYYY-MM format')
], ctrl.calculatePayroll);

router.get('/payroll/:employeeId', ctrl.getPayroll);
router.get('/payroll/:employeeId/:month', ctrl.getPayrollByMonth);
router.get('/payroll-all', ctrl.getAllPayrolls);

module.exports = router;
