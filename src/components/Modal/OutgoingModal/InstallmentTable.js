import React, { useState } from "react";
import PayInstallmentModal from "../../../components/Modal/OutgoingModal/PayInstallmentModal";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

import moment from "moment";
import 'moment/locale/tr'
// moment.locale("tr");

function InstallmentTable({ installments, reFetchUser }) {

  const [installmentId, setInstallmentId] = useState(0);
  const [payInstallmentModalShow, setPayInstallmentModalShow] = useState(false);

  const tlCurr =Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

  return (
    <div className="col-span-full flex flex-col items-center justify-center font-sans overflow-auto">
      {payInstallmentModalShow && <PayInstallmentModal installmentId={installmentId} setPayInstallmentModalShow={setPayInstallmentModalShow} reFetchInstallments={reFetchUser} ></PayInstallmentModal>}
      <Tooltip anchorSelect=".tooltipSoon" place="top">Yakında!</Tooltip>
        <>
          <div className="w-full">
            <div style={{maxHeight: '35vh'}} className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-4 px-8 text-center">Dönem</th>
                    <th className="py-4 px-8 text-center">Taksit</th>
                    <th className="py-4 px-8 text-center">Aylık Tutar</th>
                    <th className="py-4 px-8 text-center">Toplam Ödenen</th>
                    <th className="py-4 px-8 text-center">Durumu</th>
                    <th className="py-4 px-8 text-center">Ödeme Tarihi</th>
                    <th className="pr-2"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {installments.map((installment) =>(
                      <tr
                        key={installment.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-4 px-8 text-center">
                          <span>{moment().month(installment.month - 1).format('MMM')}/{installment.year}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{installment.installment}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{tlCurr.format(installment.amount)}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{tlCurr.format(((installment.installment === 0 ? 1 : installment.installment ) - 1) * installment.amount)}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{installment.is_paid ? <span className="text-green-600">Ödendi</span> : <span className="text-red-600">Ödenmedi</span> }</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                        <span>{installment.is_paid ? <span className="text-green-600">{moment(new Date(installment.paid_date)).format('DD MMMM YYYY')}</span> : '-' }</span>
                        </td>
                        <td className="pr-2 text-center">
                          <div
                            onClick={() => {
                              setInstallmentId(installment.id);
                              setPayInstallmentModalShow(true)
                            }}
                            className="flex flex-row">
                            <button
                              className="mr-2 p-1 bg-green-500 text-white transform rounded hover:scale-110 cursor:pointer outline-none focus:outline-none"
                            >                              
                              <i className="fas fa-lira-sign text-xs"></i>
                            <span className="ml-1">Öde</span>

                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
    </div>
  );
}

export default InstallmentTable;
