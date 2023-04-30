import React from "react";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-hot-toast";
import moment from "moment";
import InstallmentTable from "./InstallmentTable";

export default function Modal({outgoingId, setOutgoingDetailModalShow}) {

  const { data, loading, error, reFetchUser } = useFetch(`/private/outgoing/installments/${outgoingId}`);
  
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
  
  const closeModal = () => {
    setOutgoingDetailModalShow(false);
  };

  const tlCurr =Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

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
                  Gider Detayı
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
              {loading && (
                <div>
                  <i className="animate-bounce fas fa-lira-sign fa-2x" style={{color:"#080c1a"}}></i>
                  <p className="text-2xl mt-5">Yükleniyor . . .</p>
                </div>
              )}
              {!loading && (
                <div className="relative p-6 flex-auto">
                  <div className="">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-2">
                        <label htmlFor="card-name" className="block text-xs font-medium leading-6 text-gray-900">
                          Satın Alma Tarihi
                        </label>
                        <span className="">{moment(new Date(data.data.purchase_date)).format('DD MMMM YYYY')}</span>  
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="card-name" className="block text-xs font-medium leading-6 text-gray-900">
                          Aylık Tutar
                        </label>
                        <span className="">{tlCurr.format(data.data.monthly_amount)}</span>  
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="card-name" className="block text-xs font-medium leading-6 text-gray-900">
                          Toplam Tutar
                        </label>
                        <span className="">{tlCurr.format(data.data.total_amount)}</span>  
                      </div>

                        <div className="col-span-full sm:col-span-2">
                          <label htmlFor="card-name" className="block text-xs font-medium leading-6 text-gray-900">
                            Toplam Taksit Sayısı
                          </label>
                          <span className="">{data.data.total_installment_count}</span>  
                        </div>

                        <div className="col-span-full sm:col-span-4">
                        <label htmlFor="card-name" className="block text-xs font-medium leading-6 text-gray-900">
                            Açıklama
                          </label>
                          <span className="">{data.data.description}</span>  
                        </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-row items-center justify-end mb-2">
                    <div
                      disabled={true}
                      className="px-3 py-1 text-white font-light tracking-wider bg-gray-300 rounded outline-none"
                    >
                      <i className="fas fa-file-excel outline-none tooltipSoon"></i>
                    </div>
                  </div>
                  <InstallmentTable installments={data.data.installment} reFetchUser={reFetchUser}></InstallmentTable>
                </div>
              )}
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-red-500 text-white rounded font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => closeModal()}
                >
                  Kapat
                </button>
              </div>
            </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
