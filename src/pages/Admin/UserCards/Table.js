import React from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import drivers from "../../../data/drivers.json";
import useCarFetch from "../../../hooks/useCarFetch";
import { visibilityChange } from "../../../redux/modalSlice";
import { addRoute } from "../../../redux/routeSlice";
import Modal from "../../../components/Modal/Modal";
import ExcelJS from "exceljs";
import moment from "moment";

function Table({ cards, reFetchUser }) {
  const { data, loading, error } = useFetch(`/private/usercard`);

  const user = useSelector((state) => state.users.user);

  const modal = useSelector((state) => state.modals.modal);

  const dispatch = useDispatch();

  // const filtered = data.filter((item) => item.fleetOwner === user._id);

  const handleDetailRoute = (route) => {
    dispatch(addRoute(route));
    dispatch(visibilityChange(true));
  };

  const handleDeleteUserCard = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_MAIN_URL}/private/usercard/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "access-token": localStorage.getItem("access-token"),
        },
      }
    );
    const data = await res.json();
    if (data.type) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    reFetchUser();
  }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center font-sans overflow-auto">
      {loading && <Loading></Loading>}
      {!loading && (
        <>
          <div className="w-full flex flex-col items-end justify-end disabled">
            <button
              disabled={true}
              className="px-3 py-1 text-white font-light tracking-wider bg-green-500 rounded"
            >
              <i class="fas fa-file-excel"></i>
            </button>
          </div>
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-4 px-8 text-center">Ismi</th>
                    <th className="py-4 px-8 text-center">Numarasi</th>
                    <th className="py-4 px-8 text-center">Son Kullanma Tarihi</th>
                    <th className="py-4 px-8 text-center">CCV</th>
                    <th className="py-4 px-8 text-center">Limit</th>
                    <th className="py-4 px-8 text-center">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {cards.map((card) =>(
                      <tr
                        key={card.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-4 px-8 text-center">
                          <span>{card.name}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{card.number}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{card.expire_date}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{card.ccv}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{card.limit}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <div className="flex item-center justify-center">
                            <Link
                              onClick={() => handleDetailRoute()}
                              className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110 cursor:pointer"
                            >
                              <i class="fas fa-info-circle"></i>
                            </Link>
                            <Link
                              to={`/edit-fleet/${card.id}`}
                              className="w-4 mr-2 transform hover:text-green-500 hover:scale-110 cursor:pointer"
                            >
                              <i className="fas fa-pen"></i>
                            </Link>
                            <Link
                              onClick={() => handleDeleteUserCard(card.id)}
                              className="w-4 mr-2 transform hover:text-red-500 hover:scale-110 cursor:pointer"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </Link>
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
      <Toaster position="top-right" />
    </div>
  );
}

export default Table;
