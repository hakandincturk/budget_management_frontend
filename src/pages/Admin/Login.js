import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { login } from "../../redux/userSlice";
import { Toaster, toast } from "react-hot-toast";

export default function Login() {
  const [user, setUser] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (user.email === undefined || user.password === undefined) {
        toast.error('Bütün alanları doldurunuz.')
      }
      else {
        const res = await axios.post(`${process.env.REACT_APP_MAIN_URL}/auth/login`, user);
        if (!res.data.type) {
          await toast.error(res.data.message);  
        }
        else{
          console.log('res.data.data.token -->', res.data.data.token);
          console.log('res.data.data.roles -->', res.data.data.roles);
          const decoded = await jwt_decode(res.data.data.token);
          localStorage.setItem("user", JSON.stringify(decoded));
          localStorage.setItem("access-token", res.data.data.token);
          // dispatch(login(decoded))
          dispatch(login({
            user: decoded,
            roles: res.data?.data?.roles
          }));
          navigate("/");
        }
      }
    } catch (error) {
      await toast.error(error.response.data);
    }
  };

  return (
    <section className="shapedividers_com-8624 w-full h-screen flex flex-col item-center justify-center bg-gray-50">
      <div className="w-full lg:w-4/12 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t mb-0 px-6 pt-6">
            <div className="text-center mb-3">
              <h1 className="text-Gray-500 text-4xl tracking-wide font-bold">
                LOGIN
              </h1>
            </div>
            <div className="flex item-center justify-center">
              <hr className="my-2 w-2/3 border-b-1 border-gray-300" />
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div className="text-Gray-400 text-center mb-3 font-bold">
              <small className="italic text-gray-400">
                login with credentials
              </small>
            </div>
            <form>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase tracking-wide text-Gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  E-mail
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  id="email"
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleClick(e);
                    }
                  }}
                  className="border-0 px-3 py-3 placeholder-Gray-300 text-Gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase tracking-wide text-Gray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleClick(e);
                    }
                  }}
                  className="border-0 px-3 py-3 placeholder-Gray-300 text-Gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={handleClick}
                  className="bg-gray-800 tracking-wider text-white active:bg-Gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"
                >
                  Login{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className="relative pt-2 pb-6 mt-2">
        <div className="container mx-auto px-2">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-gray-500 font-semibold py-1">
                Made with{" "}
                <a
                  // href="https://www.creative-tim.com/product/notus-js"
                  className="text-gray-500 hover:text-gray-800"
                  target="_blank"
                >
                  MERN
                </a>{" "}
                by{" "}
                <a
                  href="https://github.com/hakandincturk"
                  className="text-gray-500 hover:text-gray-900"
                  target="_blank" rel="noreferrer"
                >
                  {" "}
                  Hakan DINCTURK
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="top-right" />
    </section>
  );
}
