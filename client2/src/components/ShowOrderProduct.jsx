import React, { useEffect, useState } from "react";

const ShowOrderProduct = ({ items }) => {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (items) {
      for (let i = 0; i < items?.length; i++) {
        qty += items[i].qty;
        price += items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [items]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-blue-500 bg-gray-900 text-center text-white rounded-lg">
        <thead>
          <tr className="bg-gray-800">
            <th className="py-2 px-4">Product Img</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Qty</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((product) => (
            <tr key={product._id} className="border-t border-gray-700">
              <td className="py-2 px-4">
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="w-12 h-12 object-cover mx-auto rounded"
                />
              </td>
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">{product.qty}</td>
            </tr>
          ))}

          {/* Total Row */}
          <tr className="border-t border-gray-700">
            <td className="py-2 px-4"></td>
            <td className="py-2 px-4">
              <span className="bg-blue-600 px-3 py-1 rounded font-bold inline-block">
                Total
              </span>
            </td>
            <td className="py-2 px-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded font-bold inline-block">
                {price}
              </span>
            </td>
            <td className="py-2 px-4">
              <span className="bg-cyan-500 text-black px-3 py-1 rounded font-bold inline-block">
                {qty}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ShowOrderProduct;
