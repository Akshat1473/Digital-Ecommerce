
import {Cart} from "../Models/Cart.js";

// add to cart
export const addToCart=async (req,res)=>{
      const {productId,title,price,qty,imgSrc}=req.body;
      const userId= req.user;
 
      let cart=await Cart.findOne({userId});
      if(!cart){
            cart=new Cart({userId,items:[]}) 
      }
      
      const itemIndex=cart.items.findIndex((item)=>item.productId.toString()===productId)
      
      // item found
      if(itemIndex>-1){
            cart.items[itemIndex].qty+=qty;
            cart.items[itemIndex].price+=price*qty
      }
       else{
            cart.items.push({productId,title,price,qty,imgSrc})
       }

      await cart.save();
      res.json({message:'Items Added To Cart',cart})
}

// get user cart
export const userCart=async(req,res)=>{
      const userId=req.user
      
      let cart=await Cart.findOne({userId});
      if(!cart)return res.json({message:'Cart not found'})

      res.json({message:"user cart",cart})
}

// remove product from cart
export const removeProductFromCart=async(req,res)=>{
      const productId=req.params.productId;
      const userId=req.user;

      let cart=await Cart.findOne({userId});

      if(!cart)return res.json({message:"Cart not found"});
      
      cart.items=cart.items.filter((item)=>item.productId.toString()!== productId)

      await cart.save();

      res.json({message:"product remove from cart"});


}

// Delete all items from cart
export const clearCart =async(req,res)=>{
      const userId=req.user;

      let cart=await Cart.findOne({userId});

      if(!cart){
            cart=new Cart({items:[]})
      }
      else{
            cart.items=[];
      }

      await cart.save();

      res.json({message:" cart clear succesfully"});


}

// decrease qty from cart
export const decreaseProudctQty = async (req, res) => {
  const { productId, qty } = req.body;

  const userId = req.user; // Keep this if required for now

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({ message: 'Cart not found' }); // fixed typo and added return
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if (item.qty > qty) {
      const pricePerUnit = item.qty ? item.price / item.qty : 0; // fixed divide-by-zero

      item.qty -= qty;
      item.price = pricePerUnit * item.qty; // more accurate calculation
    } else {
      cart.items.splice(itemIndex, 1);
    }

  } else {
    return res.json({ message: 'Invalid product ID' }); // fixed typo
  }

  await cart.save();
  res.json({ message: "Item quantity decreased", cart });
};


