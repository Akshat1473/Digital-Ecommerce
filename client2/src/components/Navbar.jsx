



// import React, { useContext, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import AppContext from "../context/AppContext";
// import Button from "./Button";

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { setFilteredData, products, logout, isAuthenticated, cart } =
//     useContext(AppContext);

//   const filterbyCategory = (cat) => {
//     setFilteredData(
//       products.filter(
//         (data) => data.category?.toLowerCase() === cat.toLowerCase()
//       )
//     );
//   };

//   const filterByPrice = (price) => {
//     setFilteredData(products.filter((data) => data.price >= price));
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;
//     navigate(`/product/search/${searchTerm}`);
//     setSearchTerm("");
//   };

//   return (
//     <>
//       <nav className="bg-gray-900 text-white px-4 py-3 sticky top-0 z-50">
//         <ul className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
//           {/* Logo */}
//           <li>
//             <Link to="/">
//               <h2 className="text-lg font-bold">Digital E-Commerce</h2>
//             </Link>
//           </li>

//           {/* Search */}
//           <li className="w-full md:w-auto flex-1">
//             <form onSubmit={submitHandler}>
//               <input
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full px-3 py-1 rounded-md bg-white text-black outline-none"
//               />
//             </form>
//           </li>

//           {/* Authenticated buttons */}
//           {isAuthenticated ? (
//             <>
//               {/* Cart Button */}
//               <li className="relative flex items-center">
//                 <Link
//                   to="/cart"
//                   className="flex items-center hover:text-yellow-400"
//                 >
//                   <AiOutlineShoppingCart className="text-2xl" />
//                 </Link>
//                 {cart?.items?.length > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                     {cart.items.length}
//                   </span>
//                 )}
//               </li>

//               {/* Profile */}
//               <li>
//                 <Link to="/profile">
//                   <Button
//                     label="profile"
//                     className="bg-yellow-400 text-black hover:bg-yellow-500"
//                   />
//                 </Link>
//               </li>

//               {/* Logout */}
//               <li>
//                 <Button
//                   label="logout"
//                   onClick={() => {
//                     logout();
//                     navigate("/");
//                   }}
//                   className="bg-red-500 text-white hover:bg-red-600"
//                 />
//               </li>
//             </>
//           ) : (
//             <>
//               {/* Guest buttons */}
//               <li>
//                 <Link to="/login">
//                   <Button
//                     label="login"
//                     className="bg-yellow-400 text-black hover:bg-yellow-500"
//                   />
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/register">
//                   <Button
//                     label="register"
//                     className="bg-blue-500 text-white hover:bg-blue-600"
//                   />
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>

//       {/* Sub navigation (only on home page) */}
//       {location.pathname === "/" && (
//         <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg justify-center">
//           {/* Category Filters */}
//           {[
//             { label: "No Filter", action: () => setFilteredData(products) },
//             { label: "Mobiles", action: () => filterbyCategory("mobile") },
//             { label: "Cameras", action: () => filterbyCategory("camera") },
//             { label: "Laptop", action: () => filterbyCategory("laptop") },
//             { label: "HeadPhones", action: () => filterbyCategory("headphone") },
//           ].map((btn, i) => (
//             <Button
//               key={i}
//               label={btn.label}
//               onClick={btn.action}
//               className="bg-gray-200 hover:bg-gray-300 font-medium"
//             />
//           ))}

//           {/* Price Filters */}
//           {[15000, 25000, 50000, 70000, 90000, 100000].map((price, i) => (
//             <Button
//               key={i}
//               label={`₹${price}`}
//               onClick={() => filterByPrice(price)}
//               className="bg-gray-200 hover:bg-gray-300 font-medium"
//             />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;



import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import AppContext from "../context/AppContext";
import Button from "./Button";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() === cat.toLowerCase()
      )
    );
  };

  const filterByPrice = (price) => {
    setFilteredData(products.filter((data) => data.price >= price));
    setIsPriceDialogOpen(false); // close dialog after choosing
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-4 py-3 sticky top-0 z-50">
        <ul className="flex flex-col md:flex-row items-center justify-between gap-3 w-full">
          {/* Logo */}
          <li>
            <Link to="/">
              <h2 className="text-lg font-bold">ElectroMart</h2>
            </Link>
            <Link to="/">
              <h2 className="text-lg font-bold ml-1 p-1.5 bg-amber-600 w-17 rounded-md ">HOME</h2>
            </Link>
          </li>

          {/* Search */}
          <li className="w-full md:w-auto flex-1">
            <form onSubmit={submitHandler}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full px-3 py-1 rounded-md bg-white text-black outline-none"
              />
            </form>
          </li>

          {/* Authenticated buttons */}
          {isAuthenticated ? (
            <>
              {/* Cart Button */}
              <li className="relative flex items-center">
                <Link
                  to="/cart"
                  className="flex items-center hover:text-yellow-400"
                >
                  <AiOutlineShoppingCart className="text-2xl" />
                </Link>
                {cart?.items?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart.items.length}
                  </span>
                )}
              </li>


              

              {/* Profile */}
              <li>
                <Link to="/profile">
                  <Button
                    label="profile"
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  />
                </Link>
              </li>

              {/* Logout */}
              <li>
                <Button
                  label="logout"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="bg-red-500 text-white hover:bg-red-600"
                />
              </li>
            </>
          ) : (
            <>
              {/* Guest buttons */}
              <li>
                <Link to="/login">
                  <Button
                    label="login"
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Button
                    label="register"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  />
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Sub navigation (only on home page) */}
      {location.pathname === "/" && (
        <div className="flex flex-wrap gap-2 p-4 bg-gray-100 rounded-lg justify-center">
          {/* Category Filters */}
          {[
            { label: "No Filter", action: () => setFilteredData(products) },
            { label: "Mobiles", action: () => filterbyCategory("mobile") },
            { label: "Cameras", action: () => filterbyCategory("camera") },
            { label: "Laptop", action: () => filterbyCategory("laptop") },
            { label: "HeadPhones", action: () => filterbyCategory("headphone") },
          ].map((btn, i) => (
            <Button
              key={i}
              label={btn.label}
              onClick={btn.action}
              className="bg-gray-200 hover:bg-gray-300 font-medium"
            />
          ))}

          {/* Price Dialog Trigger */}
          <Button
            label="Filter by Price"
            onClick={() => setIsPriceDialogOpen(true)}
            className="bg-green-500 text-white hover:bg-green-600 font-medium"
          />
        </div>
      )}

      {/* Price Filter Dialog */}
      <Dialog
        open={isPriceDialogOpen}
        onClose={() => setIsPriceDialogOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">
              Select Price Filter
            </Dialog.Title>
            <div className="grid grid-cols-2 gap-3">
              {[15000, 25000, 50000, 70000, 90000, 100000].map((price, i) => (
                <Button
                  key={i}
                  label={`₹${price} >`}
                  onClick={() => filterByPrice(price)}
                  className="bg-gray-200 hover:bg-gray-300 font-medium w-full"
                />
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Button
                label="Close"
                onClick={() => setIsPriceDialogOpen(false)}
                className="bg-red-500 text-white hover:bg-red-600"
              />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Navbar;



