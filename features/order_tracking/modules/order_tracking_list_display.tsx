"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetAllWoListAPI } from "@/features/order_list/services/get_all_wo_list_api";
import { GetCustomersAPI } from "@/features/order_list/services/get_customer_list_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

type OrderTrackingListDisplayProps = {
  refreshTrigger?: number;
  onSelectOrder: (orderId: string) => void;
};

type WorkOrderListItem = {
  id: string;
  customer_id: string;
  status: string;
  due_date: string;
};

type Customer = {
  id: string;
  name: string;
};

export default function OrderTrackingListDisplay({
  refreshTrigger,
  onSelectOrder,
}: OrderTrackingListDisplayProps) {
  const [allWoList, setAllWoList] = useState<WorkOrderListItem[]>([]);
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
   const [searchText, setSearchText] = useState("");

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

  const getCustomerName = (customerId: string) => {
    return customerList.find((c) => c.id === customerId)?.name || "-";
  };

  const filteredWoList = allWoList.filter((wo) => {
    if (!searchText.trim()) return true;
    const query = searchText.toLowerCase();
    const customerName = getCustomerName(wo.customer_id).toLowerCase();
    const status = (wo.status || "").toLowerCase();
    const idMatch = wo.id.toLowerCase().includes(query);

    return (
      customerName.includes(query) ||
      status.includes(query) ||
      idMatch
    );
  });

  return (
    <div>
      <div className="mb-4 flex justify-center">
        <div className="w-full max-w-md">
          <label
            htmlFor="order-tracking-search"
            className="block mb-2 text-sm font-medium text-heading"
          >
            Search orders
          </label>
          <div className="relative">
            <input
              id="order-tracking-search"
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by customer, status or order id"
              className="block w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-emerald-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-primary-600 focus:border-primary-600"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {loading ? (
          <ListLoader text="Loading orders..." />
        ) : allWoList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No orders found.
          </p>
        ) : filteredWoList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No orders match your search.
          </p>
        ) : (
          filteredWoList.map((wo, index) => (
            <button
              key={wo.id}
              type="button"
              className="block w-xs text-left border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 relative hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-600"
              onClick={() => onSelectOrder(wo.id)}
            >
              <div className="mb-3">
                <p className="text-sm italic text-left">Order-{index + 1}</p>
                <p className="text-xl text-left">
                  Customer:{" "}
                  <span className="font-bold">
                    {getCustomerName(wo.customer_id)}
                  </span>
                </p>
                <hr className="text-gray-400"></hr>
              </div>
              <div className="mb-2">
                <p className="text-sm italic text-left">
                  Due Date:{" "}
                  {wo.due_date ? new Date(wo.due_date).toLocaleDateString() : "-"}
                </p>
              </div>
              <p className="text-md text-left">
                Status: <span className="text-green-600">{wo.status}</span>
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

