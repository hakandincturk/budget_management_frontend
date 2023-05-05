import React, { useState } from "react";
import Loading from "../../../components/Loading/Loading";
import OutgoingDetailModal from "../../../components/Modal/OutgoingModal/OutgoingDetailModal";
import NewOutgoingModal from "../../../components/Modal/OutgoingModal/NewOutgoingModal";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

import moment from "moment";
import 'moment/locale/tr'
// moment.locale("tr");

function Table({ installments, loading,  reFetchUser }) {
  const [newOutgoingModalShow, setNewOutgoingModalShow] = useState(false);
  const [outgoingDetailModalShow, setOutgoingDetailModalShow] = useState(false);
  const [outgoingId, setOutgoingId] = useState(0);

  const openOutgoingDetailModal = async (outgoingId) => {
    setOutgoingId(outgoingId)
    setOutgoingDetailModalShow(!outgoingDetailModalShow);
  }

  const tlCurr =Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })


  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center font-sans overflow-auto">
      <Tooltip anchorSelect=".tooltipSoon" place="top">Yakında!</Tooltip>
      <Tooltip id="tooltipDate" place="top"></Tooltip>
      {loading && <Loading></Loading>}
      {!loading && (
        <>
            <div className="w-full flex flex-row items-center justify-end">
            {outgoingDetailModalShow && <OutgoingDetailModal outgoingId={outgoingId} setOutgoingDetailModalShow={setOutgoingDetailModalShow} reFetchUser={reFetchUser}></OutgoingDetailModal>}
              <div
                disabled={true}
                className="px-3 py-1 text-white font-light tracking-wider bg-gray-300 rounded outline-none"
              >
                <i className="fas fa-file-excel outline-none tooltipSoon"></i>
              </div>
            </div>
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto bg-white">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-4 px-8 text-center">Taksit</th>
                    <th className="py-4 px-8 text-center">Toplam Taksit</th>
                    <th className="py-4 px-8 text-center">Aylık Ödeme</th>
                    <th className="py-4 px-8 text-center">Toplam Ödeme</th>
                    <th className="py-4 px-8 text-center">Kart</th>
                    <th className="py-4 px-8 text-center">Durumu</th>
                    <th className="py-4 px-8 text-center">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {installments.map((installment) =>(
                      <tr
                        key={installment.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        {/* <td className="py-4 px-8 text-center">
                          <span className="tooltipDate" data-tooltip-id="tooltipDate" data-tooltip-content={moment(new Date(outgoing.purchase_date)).format('DD MMM YYYY')}>{moment(new Date(outgoing.purchase_date)).format('DD/MM/YYYY')}</span>
                        </td> */}
                        <td className="py-4 px-8 text-center">
                          <span>{installment.installment}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{installment.total_installment_count}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{tlCurr.format(installment.amount)}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{tlCurr.format(installment.total_amount)}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{ installment.outgoing.userCard.name }</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{installment.is_paid ? <span className="text-green-600">Ödendi</span> : <span className="text-red-600">Ödenmedi</span> }</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              // onClick={() => openInstallmentDetailModal(outgoing.id)}
                              className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor:pointer"
                            >
                              <i className="fas fa-info-circle"></i>
                            </div>
                            <div
                              to={`/edit-fleet/${installment.id}`}
                              className="w-4 mr-2 transform tooltipSoon"
                            >
                              <i className="fas fa-pen"></i>
                            </div>
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
      )}
    </div>
  );
}

export default Table;
