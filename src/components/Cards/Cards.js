import React from "react";
import TotalPaidAmount from "./TotalPaidAmount";
import NextMonthWillPay from "./NextMonthWillPay";
import CurrentMonthPaid from "./CurrentMonthPaid";

function Cards({data, loading}) {
  return (
    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-3 mt-5 flex-row w-full items-center justify-center">
      <TotalPaidAmount data={data} loading={loading}></TotalPaidAmount>
      <NextMonthWillPay data={data} loading={loading}></NextMonthWillPay>
      <CurrentMonthPaid data={data} loading={loading}></CurrentMonthPaid>
    </div>
  );
}

export default Cards;
