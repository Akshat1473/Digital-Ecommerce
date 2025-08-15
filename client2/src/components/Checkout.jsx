import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import axios from "axios";
import TableProduct from "./TableProduct";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

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

  const handlePayment = async () => {
    try {
      const orderResponse = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty: qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      console.log(" order response ", orderResponse);
      const { orderId, amount: orderAmount } = orderResponse.data;

      var options = {
        key: "rzp_test_R5gGrbIihDr41X",
        amount: orderAmount * 100,
        currency: "INR",
        name: "AKSHAT E-COMMERCE",
        description: "AKSHAT E-COMMERCE",
        order_id: orderId,
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            amount: orderAmount,
            orderItems: cart?.items,
            userId: user._id,
            userShipping: userAddress,
          };

          const api = await axios.post(
            `${url}/payment/verify-payment`,
            paymentData
          );

          console.log("razorpay res ", api.data);

          if (api.data.success) {
            clearCart();
            navigate("/oderconfirmation");
          }
        },
        prefill: {
          name: "AKSHAT E-COMMERCE",
          email: "akshat8958@gmail.com",
          contact: "8958308447",
        },
        notes: {
          address: "Baoli",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto my-6">
        <h1 className="text-center text-3xl font-bold mb-6">Order Summary</h1>

        <div className="overflow-x-auto border border-blue-500 rounded-lg">
          <table className="min-w-full text-left text-gray-200 bg-gray-900">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 text-center font-semibold">Product Details</th>
                <th className="py-3 px-4 text-center font-semibold">Shipping Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 align-top">
                  <TableProduct cart={cart} />
                </td>
                <td className="p-4 align-top">
                  <ul className="font-bold space-y-1">
                    <li>Name: {userAddress?.fullName}</li>
                    <li>Phone: {userAddress?.phoneNumber}</li>
                    <li>Country: {userAddress?.country}</li>
                    <li>State: {userAddress?.state}</li>
                    <li>PinCode: {userAddress?.pincode}</li>
                    <li>Near By: {userAddress?.address}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={handlePayment}
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg text-lg"
        >
          Proceed To Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
