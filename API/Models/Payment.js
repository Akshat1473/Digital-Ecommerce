import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    orderDate:{type:Date,default:Date.now},
    payStatus:{type:String}
},{strict:false})
// jitne need utni le payenge 
export const Payment = mongoose.model('Payment',paymentSchema);