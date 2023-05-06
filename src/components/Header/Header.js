import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
        <div className="w-1/2"></div>
        <div
          // x-data="{ isOpen: false }"
          className="relative w-1/2 flex justify-end"
        >
          <button
            onClick={(prev) => setOpen((prevState) => !prevState)}
            className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
          >
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" />
          </button>
          {/* <button
            x-show="isOpen"
            // onClick="isOpen = false"
            className="h-full w-full fixed inset-0 cursor-default"
          ></button> */}
          <div
            x-show="isOpen"
            className={`absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 ${
              open ? "block" : "hidden"
            }`}
          >
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Account
            </a>
            <a
              href="#"
              className="block px-4 py-2 account-link hover:text-white"
            >
              Support
            </a>
            <p
              onClick={handleLogout}
              className="cursor-pointer block px-4 py-2 account-link hover:text-white"
            >
              Sign Out
            </p>
          </div>
        </div>
      </header>

      <header
        x-data="{ isOpen: false }"
        className="w-full bg-sidebar py-5 px-6 sm:hidden"
      >
        <div className="flex items-center justify-between">
          <a
            href="index.html"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </a>
          <button
            // onClick="isOpen = !isOpen"
            className="text-white text-3xl focus:outline-none"
          >
            <i x-show="!isOpen" className="fas fa-bars"></i>
            <i x-show="isOpen" className="fas fa-times"></i>
          </button>
        </div>

        <nav className="isOpen ? 'flex': 'hidden' flex flex-col pt-4">
          <a
            href="index.html"
            className="flex items-center active-nav-link text-white py-2 pl-4 nav-item"
          >
            <i className="fas fa-tachometer-alt mr-3"></i>
            Dashboard
          </a>
          <a
            href="blank.html"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <i className="fas fa-sticky-note mr-3"></i>
            Blank Page
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <i className="fas fa-user mr-3"></i>
            My Account
          </a>
          <a
            href="#"
            className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item"
          >
            <i className="fas fa-sign-out-alt mr-3"></i>
            Sign Out
          </a>
        </nav>
      </header>
    </div>
  );
}

export default Header;
