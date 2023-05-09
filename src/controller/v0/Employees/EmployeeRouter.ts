import { Router, Request, Response } from 'express';
import auth from '../Authentication/AuthController';
import employees from './EmployeeController';

const router: Router = Router();

// Get all employees
router.get('/all', auth.auth, employees.allEmployees);

// Post new employee
// Get employee by ID
// Put (update) employee data
// Delete employee


export const EmployeeRouter: Router = router;