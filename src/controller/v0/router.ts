import { Router } from 'express';
import appController from './AppController';
import { AuthRouter } from '../v0/Authentication/AuthRouter';
import { UserRouter } from '../v0/User/UserRouter';
import { EmployeeRouter } from './Employees/EmployeeRouter';


const router: Router = Router();


router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/employee', EmployeeRouter)


// Status
router.get('/status', appController.getStatus);


export const IndexRouter: Router = router;