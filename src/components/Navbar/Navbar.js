import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.users.user);
  const userRoles = useSelector((state) => state.users.roles);
  console.log('userRoles --> ', userRoles);

  console.log(window.location.pathname);
  return (
    <div>
      <aside className="relative bg-sidebar h-screen w-64 hidden sm:block shadow-xl">
        <div className="p-6">
          <Link
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            to="/"
          >
            {user.name}
          </Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          <Link
            className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
              window.location.pathname === "/" && "active-nav-link opacity-100"
            }`}
            to="/"
          >
            <i className="fas fa-home mr-3"></i>
            Ana Sayfa
          </Link>

          {/* {true && ( */}
          {userRoles.findIndex(userRole => userRole.role.clean_name === 'super_admin') !== -1 && (
            <>
              <Link
                className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
                  window.location.pathname === "/add-customer" &&
                  "active-nav-link opacity-100"
                }`}
                to="/add-customer"
              >
                <i className="fas fa-user mr-3"></i>
                Kullanıcı İşlemleri
              </Link>
            </>
          )}
          <Link
            className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
              window.location.pathname === "/monthly" &&
              "active-nav-link opacity-100"
            }`}
            to="/monthly"
          >
            <i className="fas fa-th-list mr-3"></i>
            Aylık Hesap
          </Link>
          <Link
            className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
              window.location.pathname === "/usercards" &&
              "active-nav-link opacity-100"
            }`}
            to="/usercards"
          >
            <i className="fas fa-credit-card mr-3"></i>
            Kartlarım
          </Link>
          <Link
            className={`flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item ${
              window.location.pathname === "/outgoings" &&
              "active-nav-link opacity-100"
            }`}
            to="/outgoings"
          >
            <i className="fas fa-credit-card mr-3"></i>
            Giderlerim
          </Link>
          
        </nav>
        <a
          href="/"
          className="absolute w-full upgrade-btn bottom-0 active-nav-link text-white flex items-center justify-center py-4"
        >
          <i className="fas fa-lira-sign mr-3"></i>
          Bütçe Yönetim Sistemi
        </a>
      </aside>
    </div>
  );
}

export default Navbar;
