import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { visibilityChange } from "../../../redux/modalSlice";
import { formatCVC, formatCreditCardNumber, formatExpirationDate } from "../../../helpers/cardHelper";
import { toast } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";

import moment from "moment";
import axios from "axios";

export default function NewOutgoingModal({setNewOutgoingModalShow, reFetchOutogings}) {

  const [userCards, setUserCards] = useState()
  const { data, loading, error, reFetchUser } = useFetch("/private/usercard");
  const user = useSelector((state) => state.users.user);
  const tlCurr =Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

  if (!loading && (!data.type || error.length > 0)) {
    toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    console.log('data', data);
    console.log('error', error);
    if (!data.type) {
      console.error(1, data.message);
    }

    if (error) {
      console.error(2, error.message);
    }
  }
  else if (!loading && !userCards) {
    console.log(1);
    setUserCards(data.data.userCards);
  }

  const [userCardId, setUserCardId] = useState(0)

  const [purchaseDate, setPurchaseDate] = useState(moment().format('YYYY-MM-DDTHH:mm'))
  const [formattedTotalAmount, setFormattedTotalAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalInstallmentCount, setTotalInstallmentCount] = useState(0)
  const [formattedcardNumber, setFormattedCardNumber] = useState('')
  const [description, setDescription] = useState(0)

  const handleDetailRoute = () => {
    setNewOutgoingModalShow(false);
  };

  const handleSubmitForm = async (e) => {
    try {
      if (userCardId === 0) {
        return toast.error('Lütfen kart seçiniz!!')
      }
      const requestBody = {
        userId: user.user_id,
        userCardId: userCardId,
        total_amount: totalAmount,
        total_installment_count: totalInstallmentCount,
        purchase_date: purchaseDate,
        description: description
      }

      
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/private/outgoing`,
        requestBody,
        {'headers': {'access-token': localStorage.getItem('access-token')}}
      );

      if (res.data.type) {
        toast.success(res.data.message, {duration: 3000});
      } else {
        toast.error(res.data.message, {duration: 3000});
      }
      await reFetchOutogings();

      setNewOutgoingModalShow(false); 
    } catch (error) {
      console.log('error --> ', error);
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

                      <label htmlFor="userCards" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kart</label>
                      <select onChange={(e) => setUserCardId(e.target.value)} id="userCards" className="d-none sm:d-block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option key={0} value={0}>Seciniz</option>
                        {userCards && userCards.length > 0 && (
                          userCards.map((card, index) => (
                            <option key={index} value={card.id}>{card.name}</option>
                          ))
                        )}
                      </select>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="card-number" className="block text-sm font-medium leading-6 text-gray-900">Satın Alma Tarihi</label>
                      <div className="mt-2">
                      <input
                        type="datetime-local"
                        className="py-1 px-2 bg-gray-100 border border-gray-300 rounded"
                        defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        placeholder="Select a date"
                      />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="total_amount" className="block text-sm font-medium leading-6 text-gray-900">Tutar</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="total_amount"
                        id="total_amount"
                        autoComplete="total_amount"
                        style={{border: 0}}
                        value={totalAmount}
                        onFocus={(e) => {
                          e.target.value = totalAmount
                        }}
                        onBlur={(e) => {
                          e.target.value = formattedTotalAmount
                        }}
                        onChange={(e) => {
                          setFormattedTotalAmount(tlCurr.format(e.target.value))
                          setTotalAmount(e.target.value)
                        }}
                        onKeyDown={(event) => {
                          if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== '.' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
                            event.preventDefault();
                          }
                        }}
                        className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="total_installment_count" className="block text-sm font-medium leading-6 text-gray-900">Taksit Tutarı</label>
                      <div className="mt-2">
                        <input
                        type="number"
                        name="total_installment_count"
                        id="total_installment_count"
                        autoComplete="total_installment_count"
                        style={{border: 0}}
                        maxLength={3}
                        value={totalInstallmentCount}
                        onChange={(e) => setTotalInstallmentCount(e.target.value)}
                        onKeyDown={(event) => {
                          if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
                            event.preventDefault();
                          }
                        }}
                        className="block w-full rounded-md px-3 py-3 mt-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      </div>
                    </div>

                    <div className="sm:col-span-full">
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Açıklama</label>
                      <div className="mt-2">
                        <input
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="description"
                        style={{border: 0}}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
