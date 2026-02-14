"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetCustomersAPI } from "../services/get_customers_api";

export default function CustomerListDisplay() {
  const [customerList, setCustomerList] = useState<
    { id: string; name: string; contact?: string; address?: string }[]
  >([]);

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    const fetchCustomers = async () => {
      const response = await GetCustomersAPI({
        company_id: company_id || undefined,
      });
      if (response.success && response.data?.data) {
        setCustomerList(response.data.data);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {customerList.map((customer, index) => (
          <button
            key={customer.id}
            className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 hover:cursor-pointer"
          >
            <div className="mb-3">
              <p className="text-sm italic text-left">Cust-{index + 1}</p>
              <p className="text-xl text-left">
                Name: <span className="font-bold">{customer.name}</span>
              </p>
              <hr className="text-gray-400"></hr>
            </div>
            <div className="mb-2">
              {customer.contact && (
                <p className="text-sm italic text-left">
                  Contact: {customer.contact}
                </p>
              )}
              {customer.address && (
                <p className="text-sm italic text-left">
                  Address: {customer.address}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
