"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetAllWoListAPI } from "../services/get_all_wo_list_api";
import { GetCustomersAPI } from "../services/get_customer_list_api";

export default function OrderListDisplay() {
  const [allWoList, setAllWoList] = useState([{id:"", customer_id:"", status:"", due_date: ""}]);
  const [customerList, setCustomerList] = useState([{id: ""}]);

  useEffect(() => {
    let company_id = localStorage.getItem("cid");
    const fetchAllWoList = async () => {
      const response = await GetAllWoListAPI({ company_id: company_id || undefined });
      setAllWoList(response.data.data);
      console.log("allWoList", response.data.data);
    };
    const fetchCustomerList = async () => {
      const response = await GetCustomersAPI({ company_id: company_id || undefined });
      setCustomerList(response.data.data);
      console.log("customerList", response.data.data);
    };
    fetchAllWoList();
    fetchCustomerList()
  }, []);



  return (
    <div>
      {/* //? <--- List ---> */}
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {allWoList.map((wo, index) => {
          const customer: any = customerList.find((customer) => customer.id === wo.customer_id);
          return (
            <button key={wo.id} className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 hover:cursor-pointer">
          <div className="mb-3">
            <p className="text-sm italic text-left">Order-{index + 1}</p>
            <p className="text-xl text-left">
              Customer: <span className="font-bold">{customer?.name}</span>
            </p>
            <hr className="text-gray-400"></hr>
          </div>
          <div className="mb-2">
            {/* <p className="text-sm italic text-left">Order Items: 5</p>
            <p className="text-sm italic text-left">Total Order Qty: 500 Kg</p> */}
            <p className="text-sm italic text-left">Due Date: {new Date(wo.due_date).toLocaleDateString()}</p>
          </div>
          <p className="text-md text-left">
            Status: <span className="text-green-600">{wo.status}</span>
          </p>
        </button>
          );
        })}
      </div>
    </div>
  );
}
