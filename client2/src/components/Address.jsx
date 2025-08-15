import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangerHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    console.log("address added ", result);

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-6 p-6 border-2 border-yellow-400 rounded-lg">
      <h1 className="text-center text-2xl font-bold">Shipping Address</h1>

      <form onSubmit={submitHandler} className="mt-4 space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              name="fullName"
              value={fullName}
              onChange={onChangerHandler}
              type="text"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Country</label>
            <input
              name="country"
              value={country}
              onChange={onChangerHandler}
              type="text"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              name="state"
              value={state}
              onChange={onChangerHandler}
              type="text"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium">City</label>
            <input
              name="city"
              value={city}
              onChange={onChangerHandler}
              type="text"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pincode</label>
            <input
              name="pincode"
              value={pincode}
              onChange={onChangerHandler}
              type="number"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChangerHandler}
              type="number"
              className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
            />
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block mb-1 font-medium">Address / Nearby</label>
          <textarea
            name="address"
            value={address}
            onChange={onChangerHandler}
            className="w-full bg-gray-900 text-white border border-gray-600 rounded-md p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Use Old Address Button */}
      {userAddress && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/checkout")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-md"
          >
            Use Old Address
          </button>
        </div>
      )}
    </div>
  );
};

export default Address;
