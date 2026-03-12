"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetCustomersAPI } from "../services/get_customers_api";
import { DeleteCustomerAPI } from "../services/delete_customer_api";

//? NPM UI Imports
import { PencilSimple, Trash } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

type CustomerListDisplayTypes = {
  setShowCreateCustomer: (value: boolean) => void;
  setEditCustomerId: (value: string | null) => void;
  refreshTrigger?: number;
  searchText?: string;
};

export default function CustomerListDisplay({
  setShowCreateCustomer,
  setEditCustomerId,
  refreshTrigger,
  searchText,
}: CustomerListDisplayTypes) {
  const [customerList, setCustomerList] = useState<
    {
      id: string;
      name: string;
      phone?: string;
      email?: string;
      billing_address?: string;
      shipping_address?: string;
      gst?: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomers = async () => {
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
        await fetchCustomers();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [refreshTrigger]);

  const handleEdit = (customerId: string) => {
    setEditCustomerId(customerId);
    setShowCreateCustomer(true);
  };

  const handleDelete = async (customerId: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      const response = await DeleteCustomerAPI({ id: customerId });
      if (response.success) {
        fetchCustomers();
      }
    }
  };

  const filteredCustomerList = customerList.filter((customer) => {
    if (!searchText || !searchText.trim()) return true;
    const query = searchText.toLowerCase();
    return (
      customer.name.toLowerCase().includes(query) ||
      (customer.phone || "").toLowerCase().includes(query) ||
      (customer.email || "").toLowerCase().includes(query) ||
      (customer.billing_address || "").toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {loading ? (
          <ListLoader text="Loading customers..." />
        ) : customerList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No customers found.
          </p>
        ) : filteredCustomerList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No customers match your search.
          </p>
        ) : (
          filteredCustomerList.map((customer, index) => (
            <div
              key={customer.id}
              className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(customer.id);
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
                    handleDelete(customer.id);
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
                <p className="text-sm italic text-left">Cust-{index + 1}</p>
                <p className="text-xl text-left">
                  Name: <span className="font-bold">{customer.name}</span>
                </p>
                <hr className="text-gray-400"></hr>
              </div>
              <div className="mb-2">
                {customer.phone && (
                  <p className="text-sm italic text-left">
                    Phone: {customer.phone}
                  </p>
                )}
                {customer.email && (
                  <p className="text-sm italic text-left">
                    Email: {customer.email}
                  </p>
                )}
                {customer.billing_address && (
                  <p className="text-sm italic text-left">
                    Billing: {customer.billing_address}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
