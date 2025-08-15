import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";

const TableProduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qtyCount = 0;
    let priceCount = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qtyCount += cart.items[i].qty;
        priceCount += cart.items[i].price;
      }
    }
    setPrice(priceCount);
    setQty(qtyCount);
  }, [cart]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-blue-500 rounded-lg text-center text-gray-200 bg-gray-900">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-3 px-4">Product Img</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Qty</th>
            <th className="py-3 px-4">Qty++</th>
            <th className="py-3 px-4">Qty--</th>
            <th className="py-3 px-4">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id} className="border-t border-gray-700">
              <td className="py-3 px-4">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-12 h-12 object-cover mx-auto rounded"
                />
              </td>
              <td className="py-3 px-4">{product.title}</td>
              <td className="py-3 px-4">{product.price}</td>
              <td className="py-3 px-4">{product.qty}</td>
              <td
                className="py-3 px-4 cursor-pointer text-green-400 hover:text-green-500"
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / product.qty,
                    1,
                    product.imgSrc
                  )
                }
              >
                <span className="material-symbols-outlined">add_circle</span>
              </td>
              <td
                className="py-3 px-4 cursor-pointer text-yellow-400 hover:text-yellow-500"
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                <span className="material-symbols-outlined">do_not_disturb_on</span>
              </td>
              <td
                className="py-3 px-4 cursor-pointer text-red-400 hover:text-red-500"
                onClick={() => {
                  if (confirm("Are you sure, want remove from cart")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </td>
            </tr>
          ))}

          <tr className="border-t border-gray-700 font-bold">
            <td></td>
            <td className="py-3 px-4">
              <span className="bg-blue-600 text-white px-4 py-1 rounded">
                Total
              </span>
            </td>
            <td className="py-3 px-4">
              <span className="bg-yellow-500 text-black px-4 py-1 rounded">
                {price}
              </span>
            </td>
            <td className="py-3 px-4">
              <span className="bg-cyan-500 text-black px-4 py-1 rounded">
                {qty}
              </span>
            </td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableProduct;
