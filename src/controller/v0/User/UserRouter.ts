import { Router, Request, Response } from 'express';
import userController from './UserController';
import auth from '../Authentication/AuthController';

const router: Router = Router();

// create a user
router.post('/new', auth.auth, userController.newUser);

// fetch user details
router.get('/:userID', auth.auth, userController.fetchUser);

// update user details
router.put('/:userID', auth.auth, userController.updateUser);

// delete user
router.delete('/:userID', auth.auth, userController.deleteUser);

// get all (users
router.get('/all', auth.auth, userController.getAll);

export const UserRouter: Router = router;