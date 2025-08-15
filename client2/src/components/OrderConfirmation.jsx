import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});

  useEffect(() => {
    if (userOrder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  console.log("latestOrder", latestOrder);

  return (
    <>
      {/* Heading Section */}
      <div className="container mx-auto my-6 text-center">
        <h1 className="text-2xl font-bold">Your order has been confirmed</h1>
        <h3 className="text-lg text-gray-600">It will be delivered soon</h3>
      </div>

      {/* Order Table */}
      <div className="container mx-auto">
        <table className="w-full border border-blue-500 bg-gray-900 text-white rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="bg-gray-800 text-center py-3 px-4">Order Items</th>
              <th className="bg-gray-800 text-center py-3 px-4">
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-700">
              <td className="p-4 align-top">
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </td>
              <td className="p-4 align-top">
                <ul className="font-semibold space-y-1">
                  <li>Order ID: {latestOrder?.orderId}</li>
                  <li>Payment ID: {latestOrder?.paymentId}</li>
                  <li>Payment Status: {latestOrder?.payStatus}</li>
                  <li>Name: {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone: {latestOrder?.userShipping?.phoneNumber}</li>
                  <li>Country: {latestOrder?.userShipping?.country}</li>
                  <li>State: {latestOrder?.userShipping?.state}</li>
                  <li>Pin Code: {latestOrder?.userShipping?.pincode}</li>
                  <li>Near By: {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderConfirmation;
