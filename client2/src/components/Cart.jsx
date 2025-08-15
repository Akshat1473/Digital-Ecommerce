import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
    
  }, [cart]);

  return (
    <>
      {cart?.items?.length === 0 ? (
        <div className="text-center my-10">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-6 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Continue Shopping...
          </button>
        </div>
      ) : (
        <div className="my-10 text-center">
          <button className="bg-sky-400 hover:bg-sky-500 text-black font-bold text-xl px-6 py-2 rounded mx-3">
            Total Qty :- {qty}
          </button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl px-6 py-2 rounded mx-3">
            Total Price :- {price}
          </button>
        </div>
      )}

      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container mx-auto p-4 bg-gray-900 my-5 text-center rounded-lg"
        >
          <div className="flex justify-around items-center flex-wrap gap-4">
            {/* Image */}
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                className="w-24 h-24 rounded-lg object-cover"
              />
            </div>

            {/* Product details */}
            <div className="cart_des text-white">
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <h4 className="text-lg">${product.price}</h4>
              <h4 className="text-lg">Qty :- {product.qty}</h4>
            </div>

            {/* Action buttons */}
            <div className="cart_action flex flex-col sm:flex-row gap-3">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded"
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="bg-sky-400 hover:bg-sky-500 text-black font-bold px-4 py-2 rounded"
                onClick={() =>
                  addToCart(
                     product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc// ✅ per-unit price so backend increments instead of duplicating
                  )
                }
              >
                Qty++
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
                onClick={() => {
                  if (confirm("Are you sure, want remove from cart")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container mx-auto text-center my-5 flex justify-center gap-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 rounded"
            onClick={() => {
              if (confirm("Are you sure, want clear cart ...?")) {
                clearCart();
              }
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
