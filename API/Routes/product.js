import express from 'express'
import { addProduct, deleteProductById, getProduct, getProductById, updateProductById } from '../Controllers/product.js';

const router=express.Router();

// add product
router.post('/add',addProduct)

// get product
router.get('/all',getProduct)

// by id get
router.get('/:id',getProductById)

// update
router.put('/:id',updateProductById)

// delete
router.delete('/:id',deleteProductById)

export default router;
