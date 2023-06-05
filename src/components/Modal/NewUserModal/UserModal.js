import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visibilityChange } from "../../../redux/modalSlice";
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from "../../../helpers/cardHelper";
import { toast } from "react-hot-toast";

export default function Modal({setUserModalShow, reFetchUser}) {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('')
  const [userSurname, setUserSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const route = useSelector((state) => state.routes.route);
  // const filtered = routes.filter((item) => item.customer_id === user._id);

  const handleDetailRoute = () => {
    setUserModalShow(false);
  };

  const handleSubmitForm = async (e) => {
    try {
      const requestBody = {
        name: userName,
        surname: userSurname,
        email: email,
        password: password
      }

      const res = await fetch(
        `${process.env.REACT_APP_MAIN_URL}/admin/user/`,
        {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
            "access-token": localStorage.getItem("access-token"),
          },
        }
      );
      const data = await res.json();
      if (data.type) {
        toast.success(data.message, {duration: 3000});
      } else {
        toast.error(data.message, {duration: 3000});
      }
      await reFetchUser();

      // setUserModalShow(false); 
    } catch (error) {
      toast.error('Beklenmedik bir hata oluştu!!')
    }
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <form onSubmit={(e) => handleSubmitForm(e)}>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Yeni Kullanıcı Oluştur
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => handleDetailRoute()}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <i className="fas fa-times text-sm"></i>
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div className="">
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="user-name" className="block text-sm font-medium leading-6 text-gray-900">Adı</label>
                      <div className="mt-2">
                        <input 
                          type="text"
                          name="user-name"
                          id="user-name"
                          autoComplete="user-name"
                          style={{border: 0}}
                          onChange={(e) => setUserName(e.target.value)}
                          className="block w-full border-2 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="user-surname" className="block text-sm font-medium leading-6 text-gray-900">Soyadı</label>
                      <div className="mt-2">
                        <input 
                          type="text"
                          name="user-surname"
                          id="user-surname"
                          autoComplete="user-surname"
                          style={{border: 0}}
                          onChange={(e) => setUserSurname(e.target.value)}
                          className="block w-full border-2 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">E-mail</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        style={{border: 0}}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Şifre</label>
                      <div className="mt-2">
                        <input 
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="password"
                          style={{border: 0}}
                          onChange={(e) => setPassword(e.target.value)}
                          className="block w-full border-2 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="password-again" className="block text-sm font-medium leading-6 text-gray-900">Şifre Tekrar</label>
                      <div className="mt-2">
                        <input 
                          type="password"
                          name="password-again"
                          id="password-again"
                          autoComplete="password-again"
                          style={{border: 0}}
                          onChange={(e) => setPasswordAgain(e.target.value)}
                          className="block w-full border-2 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleDetailRoute()}
                >
                  Kapat
                </button>
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => handleSubmitForm()}
                >
                  Kaydet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
