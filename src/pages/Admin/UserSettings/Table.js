import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Loading from "../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { visibilityChange } from "../../../redux/modalSlice";
import { addRoute } from "../../../redux/routeSlice";
import UserModal from "../../../components/Modal/NewUserModal/UserModal";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from "react-tooltip";

function Table({ users, loading,  reFetchUser }) {
  const [userModalShow, setUserModalShow] = useState(false);
  console.log(users);

  const handleDeleteUser = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_MAIN_URL}/admin/user/${id}`,
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
      await toast.success(data.message, {duration: 3000});
      await reFetchUser();
    } else {
      await toast.error(data.message, {duration: 3000});
    }
  }

  // const openNewCardModal = async () => {
  //   setUserCardModalShow(true);
  // }

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center font-sans overflow-auto">
      <Tooltip anchorSelect=".tooltipSoon" place="top">Yakında!</Tooltip>
      {loading && <Loading></Loading>}
      {!loading && (
        <>
            <div className="w-full flex flex-row items-center justify-between">
              {userModalShow && <UserModal setUserModalShow={setUserModalShow} reFetchUser={reFetchUser}></UserModal>}
              <button onClick={() => setUserModalShow(true)} className="bg-green-500 text-white tracking-wider font-light rounded px-3 py-1 cursor-pointer">
                <i className="fas fa-plus text-sm"></i>
                <label className="pl-2 cursor-pointer">Yeni Kullanıcı Ekle!</label>
              </button>
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
                    <th className="py-4 px-8 text-center">Ismi Soyisim</th>
                    <th className="py-4 px-8 text-center">Email</th>
                    <th className="py-4 px-8 text-center">Telefon Numarasi</th>
                    <th className="py-4 px-8 text-center">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {users.map((user) =>(
                      <tr
                        key={user.id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-4 px-8 text-center">
                          <span>{user.fullName}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{user.email}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <span>{user.phone_number ?? '-'}</span>
                        </td>
                        <td className="py-4 px-8 text-center">
                          <div className="flex item-center justify-center">
                            <div
                              // onClick={() => handleDetailRoute()}
                              className="w-4 mr-2 transform tooltipSoon"
                            >
                              <i className="fas fa-info-circle"></i>
                            </div>
                            <div
                              to={`/edit-fleet/${user.id}`}
                              className="w-4 mr-2 transform tooltipSoon"
                            >
                              <i className="fas fa-pen"></i>
                            </div>
                            <Link
                              onClick={() => handleDeleteUser(user.id)}
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
      {/* <Toaster position="top-right" /> */}
    </div>
  );
}

export default Table;
