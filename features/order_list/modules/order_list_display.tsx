"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetAllWoListAPI } from "../services/get_all_wo_list_api";
import { GetCustomersAPI } from "../services/get_customer_list_api";
import { DeleteOrderAPI } from "../services/delete_order_api";

//? NPM UI Imports
import { PencilSimple, Trash } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

type OrderListDisplayTypes = {
  setShowCreateOrder: (value: boolean) => void;
  setEditOrderId: (value: string | null) => void;
  refreshTrigger?: number;
};

export default function OrderListDisplay({
  setShowCreateOrder,
  setEditOrderId,
  refreshTrigger,
}: OrderListDisplayTypes) {
  const [allWoList, setAllWoList] = useState([
    { id: "", customer_id: "", status: "", due_date: "" },
  ]);
  const [customerList, setCustomerList] = useState([{ id: "", name: "" }]);

  const fetchAllWoList = async () => {
    let company_id = localStorage.getItem("cid");
    const response = await GetAllWoListAPI({
      company_id: company_id || undefined,
    });
    if (response.success && response.data?.data) {
      setAllWoList(response.data.data);
    }
  };

  useEffect(() => {
    let company_id = localStorage.getItem("cid");
    fetchAllWoList();
    const fetchCustomerList = async () => {
      const response = await GetCustomersAPI({
        company_id: company_id || undefined,
      });
      if (response.success && response.data?.data) {
        setCustomerList(response.data.data);
      }
    };
    fetchCustomerList();
  }, [refreshTrigger]);

  const handleEdit = (orderId: string) => {
    setEditOrderId(orderId);
    setShowCreateOrder(true);
  };

  const handleDelete = async (orderId: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      const response = await DeleteOrderAPI({ id: orderId });
      if (response.success) {
        fetchAllWoList();
      }
    }
  };



  return (
    <div>
      {/* //? <--- List ---> */}
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {allWoList.map((wo, index) => {
          const customer: any = customerList.find(
            (customer) => customer.id === wo.customer_id
          );
          return (
            <div
              key={wo.id}
              className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(wo.id);
                  }}
                  className="border rounded-lg border-primary-700 cursor-pointer p-1"
                >
                  <PencilSimple
                    size={iconSpecifications.size}
                    color={iconSpecifications.colour}
                    weight={iconSpecifications.weight as any}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(wo.id);
                  }}
                  className="border rounded-lg border-red-700 cursor-pointer p-1"
                >
                  <Trash
                    size={iconSpecifications.size}
                    color={iconSpecifications.colour}
                    weight={iconSpecifications.weight as any}
                  />
                </button>
              </div>
              <div className="mb-3">
                <p className="text-sm italic text-left">Order-{index + 1}</p>
                <p className="text-xl text-left">
                  Customer: <span className="font-bold">{customer?.name}</span>
                </p>
                <hr className="text-gray-400"></hr>
              </div>
              <div className="mb-2">
                <p className="text-sm italic text-left">
                  Due Date: {new Date(wo.due_date).toLocaleDateString()}
                </p>
              </div>
              <p className="text-md text-left">
                Status: <span className="text-green-600">{wo.status}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
