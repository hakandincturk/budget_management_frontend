import React from "react";
import Cards from "../Cards/Cards";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import useFetch from "../../hooks/useFetch";

function Dashboard() {
  const { data, loading, error, reFetchUser } = useFetch("/private/init/dashboard");

  if (error.length > 0) {
    toast.error("Bir hata oluştu");
  }

  return (
    <div>
      <main className="w-full flex-grow p-6">
        <>
          <h1 className="text-3xl text-black">Dashboard</h1>
          <Cards data={data.data} loading={loading}></Cards>
        </>
      </main>
    </div>
  );
}

export default Dashboard;
