
import express, { Router } from 'express'
import { register, users } from '../Controllers/user.js';
import { login } from '../Controllers/user.js';


const router=express.Router();

router.post('/register',register)

router.post('/login',login)

router.get('/users',users)

export default router