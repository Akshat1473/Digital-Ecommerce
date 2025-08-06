import express from 'express'
import mongoose from 'mongoose';
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
// import bodyParser from 'express'
import { register } from './Controllers/user.js';

const app = express();

// app.use(bodyParser.json())
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'This is home route' }))

// user Router
app.use('/api/user', userRouter)

// Product router
app.use('/api/product', productRouter)

// cart router
app.use('/api/cart',cartRouter)

mongoose.connect(
    "mongodb+srv://akshat8958:V57X9GrjnGs8LBSX@cluster0.nid0vdy.mongodb.net/", { dbName: "Digital-Electronics" }
).then(() => console.log("MongoDB Connected Successfully...!")).catch((err) =>
    console.log(err)
);

const port = 2000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

// akshat8958
// V57X9GrjnGs8LBSX
// mongodb+srv://akshat8958:V57X9GrjnGs8LBSX@cluster0.nid0vdy.mongodb.net/
// mongodb+srv://akshat8958:V57X9GrjnGs8LBSX@cluster0.nid0vdy.mongodb.net/

