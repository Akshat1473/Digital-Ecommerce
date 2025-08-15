
import express, { Router } from 'express'
import { register, users } from '../Controllers/user.js';
import { login } from '../Controllers/user.js';
import { Authenticated } from '../Middlewares/auth.js';
import { profile } from '../Controllers/user.js';
const router=express.Router();

router.post('/register',register)

router.post('/login',login)

router.get('/all',users)

router.get('/profile',Authenticated,profile)

export default router