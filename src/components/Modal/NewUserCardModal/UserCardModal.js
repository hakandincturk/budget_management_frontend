import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visibilityChange } from "../../../redux/modalSlice";
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from "../../../helpers/cardHelper";
import { toast } from "react-hot-toast";

export default function Modal({setUserCardModalShow}) {
  const dispatch = useDispatch();

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [formattedcardNumber, setFormattedCardNumber] = useState('')
  const [expireDate, setExpireDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [limit, setLimit] = useState(0)

  const route = useSelector((state) => state.routes.route);
  // const filtered = routes.filter((item) => item.customer_id === user._id);

  const handleDetailRoute = () => {
    setUserCardModalShow(false);
  };

  const handleSubmitForm = async (e) => {
    try {
      console.log('submit form')
      const requestBody = {
        name: cardName,
        number: cardNumber,
        ccv: cvv,
        expire_date: expireDate,
        limit: limit
      }
      console.log(requestBody);
      setUserCardModalShow(false); 
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
                  Yeni Kart Oluştur
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
                      <label htmlFor="card-name" className="block text-sm font-medium leading-6 text-gray-900">Kart Ismi</label>
                      <div className="mt-2">
                        <input 
                          type="text"
                          name="card-name"
                          id="card-name"
                          autoComplete="card-name"
                          style={{border: 0}}
                          onChange={(e) => setCardName(e.target.value)}
                          className="block w-full border-2 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="card-number" className="block text-sm font-medium leading-6 text-gray-900">Kart Numarasi</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="card-number"
                        id="card-number"
                        autoComplete="card-number"
                        style={{border: 0}}
                        value={formattedcardNumber}
                        maxLength={19}
                        onChange={(e) => {
                          setCardNumber(e.target.value)
                          setFormattedCardNumber(formatCreditCardNumber(e.target.value))
                        }}
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="expire-date" className="block text-sm font-medium leading-6 text-gray-900">Son Kullanma Tarihi</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="expire-date"
                        id="expire-date"
                        autoComplete="expire-date"
                        style={{border: 0}}
                        value={expireDate}
                        onChange={(e) => setExpireDate(formatExpirationDate(e.target.value))}
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="cvv" className="block text-sm font-medium leading-6 text-gray-900">CVV</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="cvv"
                        id="cvv"
                        autoComplete="cvv"
                        style={{border: 0}}
                        maxLength={3}
                        onChange={(e) => setCvv(e.target.value)}
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="limit" className="block text-sm font-medium leading-6 text-gray-900">Limit</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="limit"
                        id="limit"
                        autoComplete="limit"
                        style={{border: 0}}
                        onChange={(e) => setLimit(e.target.value)}
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
