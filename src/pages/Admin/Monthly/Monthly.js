import React, {useState} from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import Loading from "../../../components/Loading/Loading";
import Navbar from "../../../components/Navbar/Navbar";
import useFetch from "../../../hooks/useFetch";
import Table from "./Table";

import moment from "moment";
import 'moment/locale/tr'

function Monthly() {
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedYear, setSelectedYear] = useState(moment().year());

  const { data, loading, error, reFetchUser } = useFetch(`/private/installment/specificMonth/${selectedYear}/${selectedMonth}`);

  console.log('selectedMonth -->', selectedMonth);
  console.log('selectedYear -->', selectedYear);
  
  const nextMonth = () => {
    console.log(1);
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }

  const prevMonth = () => {
    console.log(2);
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Navbar></Navbar>

      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        <Header></Header>
          <main className="w-full flex-grow p-6">
            <h1 className="text-3xl text-black pb-6">Aylık Hesap</h1>
            <div className="w-full flex flex-row items-center justify-center">
                <button onClick={() => prevMonth()}>
                <i className="fas fa-chevron-left mr-5 text-lg cursor-pointer"></i>
                </button>
                
                <div className="w-1/12 text-center text-xl">
                  <span>{moment(`01-${selectedMonth}-2000`, 'dd-MM-YYYY').format('MMMM')}</span>
                  <span className="ml-1">{selectedYear}</span>
                </div>

                <button onClick={() => nextMonth()}>
                  <i className="fas fa-chevron-right ml-5 text-lg cursor-pointer"></i>
                </button>
                
            </div>
              {data.data && data.data.length === 0 ? (
                <>
                  Herhangi bir gideriniz yok
                </>
              ) : (
                <>
                  {loading && <Loading></Loading>}
                  {!loading && (
                  <>
                    <Table installments={data.data} loading={loading} reFetchUser={reFetchUser}></Table>
                  </>
                  )}
                </>
              )}
          </main>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Monthly;
