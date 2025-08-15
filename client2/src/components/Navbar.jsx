
// export default Navbar;
import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import AppContext from "../context/AppContext";
import Button from "./Button";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <>
      <nav className="bg-gray-900 text-white px-4 py-3 sticky top-0 z-50">
        <ul className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <li>
            <Link to="/">
              <h2 className="text-lg font-bold">Digital E-Commerce</h2>
            </Link>
          </li>

          {/* Search */}
          <li className="w-full md:w-auto">
            <form onSubmit={submitHandler}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="search..."
                className="w-full px-3 py-1 rounded-md text-black outline-none"
              />
            </form>
          </li>

          {/* Authenticated buttons */}
          {isAuthenticated && (
            <>
              {/* Cart Button */}
              <li className="relative flex items-center">
                <Link
                  to="/cart"
                  className="flex items-center hover:text-yellow-400"
                >
                  <AiOutlineShoppingCart className="text-2xl" />
                </Link>
                {cart?.items?.length> 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cart?.items?.length}
                  </span>
                )}
              </li>

              {/* Profile */}
              <Link to="/profile">
                <li>
                  <Button
                    label="profile"
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  />
                </li>
              </Link>

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
          )}

          {/* Guest buttons */}
          {!isAuthenticated && (
            <>
              <Link to="/login">
                <li>
                  <Button
                    label="login"
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  />
                </li>
              </Link>
              <Link to="/register">
                <li>
                  <Button
                    label="register"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  />
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>

      {/* Sub navigation */}
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

          {/* Price Filters */}
          {[15000, 25000, 50000, 70000, 90000, 100000].map((price, i) => (
            <Button
              key={i}
              label={`₹${price}`}
              onClick={() => filterByPrice(price)}
              className="bg-gray-200 hover:bg-gray-300 font-medium"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
