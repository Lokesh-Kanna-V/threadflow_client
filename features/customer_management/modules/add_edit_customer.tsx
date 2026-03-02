"use client";

//? React & Next Imports
import { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";

//? NPM UI Imports
import { PlusIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Service Imports
import { CreateCustomerAPI } from "../services/create_customer_api";
import { UpdateCustomerAPI } from "../services/update_customer_api";
import { GetCustomersAPI } from "../services/get_customers_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

type AddEditCustomerTypes = {
  editCustomerId: string | null;
  setShowCreateCustomer: (value: boolean) => void;
  setEditCustomerId: (value: string | null) => void;
  setRefreshTrigger?: (fn: (prev: number) => number) => void;
};

export default function AddEditCustomer({
  editCustomerId,
  setShowCreateCustomer,
  setEditCustomerId,
  setRefreshTrigger,
}: AddEditCustomerTypes) {
  const { user } = useAuth();

  const [customerDetails, setCustomerDetails] = useState({
    company_id: "",
    name: "",
    phone: "",
    email: "",
    billing_address: "",
    shipping_address: "",
    gst: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCustomerDetailsChange = (field: string, value: string) => {
    setCustomerDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createCustomer = async (e: any) => {
    e.preventDefault();
    const response = await CreateCustomerAPI({
      customer_details: customerDetails,
    });
    if (response.success) {
      setShowCreateCustomer(false);
      setCustomerDetails({
        company_id: "",
        name: "",
        phone: "",
        email: "",
        billing_address: "",
        shipping_address: "",
        gst: "",
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const updateCustomer = async (e: any) => {
    e.preventDefault();
    if (!editCustomerId) return;
    const response = await UpdateCustomerAPI({
      id: editCustomerId,
      name: customerDetails.name,
      phone: customerDetails.phone,
      email: customerDetails.email,
      billing_address: customerDetails.billing_address,
      shipping_address: customerDetails.shipping_address,
      gst: customerDetails.gst,
    });
    if (response.success) {
      setShowCreateCustomer(false);
      setEditCustomerId(null);
      setCustomerDetails({
        company_id: "",
        name: "",
        phone: "",
        email: "",
        billing_address: "",
        shipping_address: "",
        gst: "",
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const handleCancel = () => {
    setShowCreateCustomer(false);
    setEditCustomerId(null);
    setCustomerDetails({
      company_id: "",
      name: "",
      phone: "",
      email: "",
      billing_address: "",
      shipping_address: "",
      gst: "",
    });
  };

  useEffect(() => {
    const company_id = localStorage.getItem("cid");
    handleCustomerDetailsChange("company_id", company_id || "");

    if (editCustomerId) {
      const fetchCustomer = async () => {
        const cid = localStorage.getItem("cid");
        const response = await GetCustomersAPI({
          company_id: cid || undefined,
        });
        if (response.success && response.data?.data) {
          const customer = response.data.data.find(
            (c: any) => c.id === editCustomerId
          );
          if (customer) {
            setCustomerDetails({
              company_id: customer.company_id || cid || "",
              name: customer.name || "",
              phone: customer.phone || "",
              email: customer.email || "",
              billing_address: customer.billing_address || "",
              shipping_address: customer.shipping_address || "",
              gst: customer.gst || "",
            });
          }
        }
      };
      const load = async () => {
        setLoading(true);
        try {
          await fetchCustomer();
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [user, editCustomerId]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {editCustomerId ? "Edit customer" : "Add a new customer"}
        </h2>
        {loading ? (
          <ListLoader text="Loading customer..." />
        ) : (
          <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={customerDetails.name}
                onChange={(e) => {
                  handleCustomerDetailsChange("name", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type customer name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={customerDetails.phone}
                onChange={(e) => {
                  handleCustomerDetailsChange("phone", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter phone number"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={customerDetails.email}
                onChange={(e) => {
                  handleCustomerDetailsChange("email", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter email address"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="billing_address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Billing Address
              </label>
              <textarea
                id="billing_address"
                rows={4}
                value={customerDetails.billing_address}
                onChange={(e) => {
                  handleCustomerDetailsChange("billing_address", e.target.value);
                }}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter billing address"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="shipping_address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Shipping Address
              </label>
              <textarea
                id="shipping_address"
                rows={4}
                value={customerDetails.shipping_address}
                onChange={(e) => {
                  handleCustomerDetailsChange("shipping_address", e.target.value);
                }}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter shipping address"
              ></textarea>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="gst"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                GST
              </label>
              <input
                type="text"
                name="gst"
                id="gst"
                value={customerDetails.gst}
                onChange={(e) => {
                  handleCustomerDetailsChange("gst", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter GST number"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              <PlusIcon
                size={iconSpecifications.size}
                color={iconSpecifications.colour}
                weight={iconSpecifications.weight as any}
              />
              Cancel
            </button>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (editCustomerId) {
                  updateCustomer(e);
                } else {
                  createCustomer(e);
                }
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {editCustomerId ? "Update Customer" : "Create Customer"}
            </button>
          </div>
        </form>
        )}
      </div>
    </section>
  );
}
