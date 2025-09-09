// import React, { useContext } from 'react'
// import AppContext from '../../context/AppContext'

// const Profile = () => {
//   const {user}=useContext(AppContext)
//   return (
//    <>
//       <div className=''>

//         <h1>Welcome,{user?.name}</h1>
//         <h3>{user?.email}</h3>
//       </div>

//    </>
//   )
// }

// export default Profile

import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import ShowOrderProduct from "../ShowOrderProduct";

const Profile = () => {
  const { user, userOrder } = useContext(AppContext);

  return (
    <>
      {/* User Info */}
      <div className="container mx-auto text-center my-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <h3 className="text-lg text-gray-600">{user?.email}</h3>
        <h1 className="text-xl font-semibold mt-2">
          Total Orders: {Array.isArray(userOrder) ? userOrder.length : 0}
        </h1>
      </div>

      {/* Orders Table */}
      <div className="container mx-auto my-10">
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full border border-blue-500 bg-gray-900 text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 border-r border-blue-500 text-center">
                  Order Items
                </th>
                <th className="px-4 py-2 text-center">
                  Order Details & Shipping
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(userOrder) && userOrder.length > 0 ? (
                userOrder.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-blue-500 hover:bg-gray-800 transition"
                  >
                    <td className="p-4 align-top border-r border-blue-500">
                      <ShowOrderProduct items={product?.orderItems} />
                    </td>
                    <td className="p-4 align-top">
                      <ul className="font-semibold space-y-1">
                        <li>Order ID: {product?.orderId}</li>
                        <li>Payment ID: {product?.paymentId}</li>
                        <li>Payment Status: {product?.payStatus}</li>
                        <li>Name: {product?.userShipping?.fullName}</li>
                        <li>Phone: {product?.userShipping?.phoneNumber}</li>
                        <li>Country: {product?.userShipping?.country}</li>
                        <li>State: {product?.userShipping?.state}</li>
                        <li>Pin Code: {product?.userShipping?.pincode}</li>
                        <li>Address: {product?.userShipping?.address}</li>
                      </ul>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    className="p-6 text-center text-gray-400 italic"
                  >
                    {userOrder?.message === "Login first"
                      ? "⚠️ Please login to view your orders."
                      : "No orders found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Profile;


