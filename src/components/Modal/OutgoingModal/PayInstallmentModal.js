import React, {useState} from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-hot-toast";

export default function PayInstallmentModal({installmentId, setPayInstallmentModalShow, reFetchInstallments}) {

  const [installmentDate, setInstallmentDate] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  
  const closeModal = () => {
    setPayInstallmentModalShow(false);
  };

  const handleSubmitForm = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_MAIN_URL}/private/installment/pay`,
        { id: installmentId, date: installmentDate},
        {'headers': {'access-token': localStorage.getItem('access-token')}}
      );
  
      if (res.data.type) {
        await toast.success(res.data.message);
        setPayInstallmentModalShow(false);
        reFetchInstallments();
      }
      else {
        await toast.error(res.data.message);
      }
    } catch (err) {
      await toast.error('Sistemsel bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      setPayInstallmentModalShow(false);
    }
  }

  return (
    <>
    <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-auto my-6 mx-auto">
          {/*content*/}
            <div className="w-80 sm:w-min border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Taksit Öde
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => closeModal()}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  <i className="fas fa-times text-sm"></i>
                  </span>
                </button>
              </div>
              {/*body*/}
                <form>
                <div
                  className="relative m-3 text-center">
                  <input
                    type="datetime-local"
                    defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => setInstallmentDate(e.target.value)}
                    placeholder="Select a date" />
                </div>
                </form>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => closeModal()}
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
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
