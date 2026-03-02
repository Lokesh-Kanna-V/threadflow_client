"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetAllWoListAPI } from "../services/get_all_wo_list_api";
import { GetCustomersAPI } from "../services/get_customer_list_api";
import { DeleteOrderAPI } from "../services/delete_order_api";

//? NPM UI Imports
import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

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
  const [allWoList, setAllWoList] = useState<
    { id: string; customer_id: string; status: string; due_date: string }[]
  >([]);
  const [customerList, setCustomerList] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAllWoList = async () => {
    const company_id = localStorage.getItem("cid");
    const response = await GetAllWoListAPI({
      company_id: company_id || undefined,
    });
    if (response.success && response.data?.data) {
      setAllWoList(response.data.data);
    } else {
      setAllWoList([]);
    }
  };

  const fetchCustomerList = async () => {
    const company_id = localStorage.getItem("cid");
    const response = await GetCustomersAPI({
      company_id: company_id || undefined,
    });
    if (response.success && response.data?.data) {
      setCustomerList(response.data.data);
    } else {
      setCustomerList([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchAllWoList(), fetchCustomerList()]);
      } finally {
        setLoading(false);
      }
    };

    load();
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
        {loading ? (
          <ListLoader text="Loading orders..." />
        ) : allWoList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        ) : (
          allWoList.map((wo, index) => {
            const customer: any = customerList.find(
              (customer) => customer.id === wo.customer_id
            );
            return (
              <div
                key={wo.id}
                className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 relative hover:cursor-pointer"
                onClick={() => handleEdit(wo.id)}
              >
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleEdit(wo.id);
                    }}
                    className="cursor-pointer p-1"
                  >
                    <PencilSimpleIcon
                      size={iconSpecifications.size}
                      color={iconSpecifications.colour}
                      weight={iconSpecifications.weight as any}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(wo.id);
                    }}
                    className="cursor-pointer p-1"
                  >
                    <TrashIcon
                      size={iconSpecifications.size}
                      color="#800000"
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
                    Due Date:{" "}
                    {wo.due_date
                      ? new Date(wo.due_date).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
                <p className="text-md text-left">
                  Status: <span className="text-green-600">{wo.status}</span>
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
