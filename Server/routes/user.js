import express from 'express';
import authenticateUser from '../controllers/login';
import signup from '../controllers/signup';
const router = express.Router();

router.post('/login', authenticateUser);
router.post('/signup', signup);
// router.post('/new-account', registerUser);
export default router;