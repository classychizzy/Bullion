import { Router, Request, Response } from 'express';
import auth from '../Authentication/AuthController';
import employees from './EmployeeController';

const router: Router = Router();

// Get all employees
router.get('/all', auth.auth, employees.allEmployees);

// Post new employee
router.post('/new', auth.auth, employees.newEmployee);

// Get employee by ID
router.get('/:employeeID', auth.auth, employees.getEmployee);

// Put (update) employee data
router.put('/:employeeID', auth.auth, employees.updateEmployee);

// Delete employee
router.delete('/:employeeID', auth.auth, employees.deleteEmployee)


export const EmployeeRouter: Router = router;