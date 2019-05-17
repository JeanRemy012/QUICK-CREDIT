import express from 'express';
import authenticateUser from '../controllers/login';

const router = express.Router();

router.post('/login', authenticateUser);
// router.post('/new-account', registerUser);
export default router;