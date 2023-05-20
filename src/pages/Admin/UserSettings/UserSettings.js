import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import Navbar from "../../../components/Navbar/Navbar";
import useFetch from "../../../hooks/useFetch";
import Table from "./Table";

function UserSettings() {
  const { data, loading, error, reFetchUser } = useFetch("/admin/user");

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>

        {loading && <Loading></Loading>}
        {!loading && (
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Kartlarım</h1>
            {data.data && data.data.length === 0 ? (
              <>
                Kullanıcı bulunmamaktadir.
              </>
            ) : (
              <Table users={data.data} loading={loading} reFetchUser={reFetchUser}></Table>  
            )}
          </main>
        )}

        <Footer></Footer>
      </div>
    </div>
  );
}

export default UserSettings;
