import React from "react";

const tlCurr =Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' })

function NextMonthWillPay({data, loading}) {
  return (
    <div className="flex flex-wrap flex-row sm:flex-col w-full sm:w-1/4 p-5 bg-white rounded-md shadow-xl border-l-4 border-r-4 border-green-300">
      <div className="flex justify-between w-full">
        <div>
          <div className="p-2">
            Gelecek Ay Ödenecek Toplam Tutar
          </div>
        </div>
      </div>
      <div className="py-2">
        <label className="font-bold text-4xl text-center">{tlCurr.format(loading ? 0 : data.nextMonthWillPay)}</label>
      </div>
    </div>
  );
}

export default NextMonthWillPay;
