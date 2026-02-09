const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/controllers');

const employeeValidation = [
	body('name').notEmpty().withMessage('Name is required'),
	body('email').isEmail().withMessage('Valid email is required'),
	body('phone').notEmpty().withMessage('Phone is required'),
	body('department').notEmpty().withMessage('Department is required'),
	body('salary').isNumeric().withMessage('Salary must be numeric')
];

router.post('/employees', employeeValidation, ctrl.createEmployee);
router.get('/employees', ctrl.listEmployees);
router.get('/employees/:id', ctrl.getEmployee);
router.put('/employees/:id', employeeValidation, ctrl.updateEmployee);
router.delete('/employees/:id', ctrl.deleteEmployee);

module.exports = router;
