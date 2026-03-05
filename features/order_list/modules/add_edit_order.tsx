"use client";

//? React & Next Imports
import { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";
import AlertBanner from "@/shared/ui/alert_banner";

//? UI Imports
import AddEditProductModal from "@/shared/ui/add_product_modal";

//? NPM UI Imports
import {
  PencilSimpleIcon,
  InfoIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Service Imports
import { CreateOrderApi } from "../services/create_order_api";
import { UpdateOrderAPI } from "../services/update_order_api";
import { GetCustomersAPI } from "../services/get_customer_list_api";
import { GetOrderByIdAPI } from "../services/get_order_by_id_api";

type AddEditOrderTypes = {
  editOrderId: string | null;
  setShowCreateOrder: (value: boolean) => void;
  setEditOrderId: (value: string | null) => void;
  setRefreshTrigger?: (fn: (prev: number) => number) => void;
  setAlert?: (value: { status: string; message: string }) => void;
};

export default function AddEditOrder({
  editOrderId,
  setShowCreateOrder,
  setEditOrderId,
  setRefreshTrigger,
  setAlert: setParentAlert,
}: AddEditOrderTypes) {
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [addItemClick, setAddItemClick] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [orderDetails, setOrderDetails] = useState({
    company_id: "",
    customer_id: "",
    due_date: "",
    status: "",
    remarks: "",
  });

  const [customerList, setCustomerList] = useState([{ id: "", name: "" }]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ status: "", message: "" });

  const [itemDetails, setItemDetails] = useState([
    {
      product_id: "",
      size: "",
      size_unit: "",
      colour: "",
      quantity: "",
      qty_unit: "",
      stages: [
        {
          id: "",
          name: "",
          description: "",
          status: "",
          assigned_to: "",
        },
      ],
      remarks: "",
    },
  ]);

  const handleOrderDetailsChange = (field: string, value: string) => {
    setOrderDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const removeItem = (index: number) => {
    setItemDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const createOrder = async (e: any) => {
    e.preventDefault();

    const consolidatedItemDetails = {
      orderDetails,
      itemDetails: itemDetails.slice(1),
    };

    const response = await CreateOrderApi(consolidatedItemDetails);
    if (response.success) {
      const msg = { status: "success", message: "Order created successfully." };
      if (setParentAlert) {
        setParentAlert(msg);
      } else {
        setAlert(msg);
      }
      setShowCreateOrder(false);
      setOrderDetails({
        company_id: "",
        customer_id: "",
        due_date: "",
        status: "",
        remarks: "",
      });
      setItemDetails([
        {
          product_id: "",
          size: "",
          size_unit: "",
          colour: "",
          quantity: "",
          qty_unit: "",
          stages: [
            {
              id: "",
              name: "",
              description: "",
              status: "",
              assigned_to: "",
            },
          ],
          remarks: "",
        },
      ]);
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    } else {
      setAlert({
        status: "error",
        message:
          response.error ||
          "Unable to create order. Please check the details and try again.",
      });
    }
  };

  const updateOrder = async (e: any) => {
    e.preventDefault();
    if (!editOrderId) return;

    const payload = {
      id: editOrderId,
      orderDetails,
      itemDetails: itemDetails.slice(1),
    };

    const response = await UpdateOrderAPI(payload);
    if (response.success) {
      const msg = { status: "success", message: "Order updated successfully." };
      if (setParentAlert) {
        setParentAlert(msg);
      } else {
        setAlert(msg);
      }
      setShowCreateOrder(false);
      setEditOrderId(null);
      setOrderDetails({
        company_id: "",
        customer_id: "",
        due_date: "",
        status: "",
        remarks: "",
      });
      setItemDetails([
        {
          product_id: "",
          size: "",
          size_unit: "",
          colour: "",
          quantity: "",
          qty_unit: "",
          stages: [
            {
              id: "",
              name: "",
              description: "",
              status: "",
              assigned_to: "",
            },
          ],
          remarks: "",
        },
      ]);
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    } else {
      setAlert({
        status: "error",
        message:
          response.error ||
          "Unable to update order. Please try again in a moment.",
      });
    }
  };

  const handleCancel = () => {
    setShowCreateOrder(false);
    setEditOrderId(null);
    setOrderDetails({
      company_id: "",
      customer_id: "",
      due_date: "",
      status: "",
      remarks: "",
    });
    setItemDetails([
      {
        product_id: "",
        size: "",
        size_unit: "",
        colour: "",
        quantity: "",
        qty_unit: "",
        stages: [
          {
            id: "",
            name: "",
            description: "",
            status: "",
            assigned_to: "",
          },
        ],
        remarks: "",
      },
    ]);
  };

  useEffect(() => {
    let company_id = localStorage.getItem("cid");
    handleOrderDetailsChange("company_id", company_id || "");

    const load = async () => {
      setLoading(true);
      try {
        if (company_id) {
          const GetCustomersList = async () => {
            let res = await GetCustomersAPI({ company_id });
            if (res.success && res.data?.data) {
              setCustomerList(res.data.data);
            }
          };
          await GetCustomersList();
        }

        if (editOrderId) {
          const fetchOrder = async () => {
            const response = await GetOrderByIdAPI({ id: editOrderId });
            if (response.success && response.data?.data) {
              const order = response.data.data;
              setOrderDetails({
                company_id: order.company_id || company_id || "",
                customer_id: order.customer_id || "",
                due_date: order.due_date || "",
                status: order.status || "",
                remarks: order.remarks || "",
              });
              if (order.due_date) {
                const dateObj = new Date(order.due_date);
                setDate(dateObj.toISOString().split("T")[0]);
              }
              if (order.items && order.items.length > 0) {
                setItemDetails([
                  {
                    product_id: "",
                    size: "",
                    size_unit: "",
                    colour: "",
                    quantity: "",
                    qty_unit: "",
                    stages: [
                      {
                        id: "",
                        name: "",
                        description: "",
                        status: "",
                        assigned_to: "",
                      },
                    ],
                    remarks: "",
                  },
                  ...order.items.map((item: any) => ({
                    product_id: item.product_id || "",
                    size: item.size || "",
                    size_unit: item.size_unit || "",
                    colour: item.colour || "",
                    quantity: item.quantity || "",
                    qty_unit: item.qty_unit || "",
                    stages: item.stages || [
                      {
                        id: "",
                        name: "",
                        description: "",
                        status: "",
                        assigned_to: "",
                      },
                    ],
                    remarks: item.remarks || "",
                  })),
                ]);
              }
            }
          };
          await fetchOrder();
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [user, editOrderId]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-2xl lg:py-16">
        {alert.status && (
          <div className="mb-4">
            <AlertBanner
              type={alert.status === "error" ? "error" : "success"}
              message={alert.message}
              onClose={() => setAlert({ status: "", message: "" })}
            />
          </div>
        )}
        {loading ? (
          <ListLoader text={editOrderId ? "Loading order..." : "Loading..."} />
        ) : (
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* //? Customer Name */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="unit"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Unit
                </label>
                <select
                  id="size_unit"
                  value={orderDetails.customer_id}
                  onChange={(e) => {
                    handleOrderDetailsChange("customer_id", e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Customer</option>
                  {customerList.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex gap-3">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="due_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="due_date"
                    id="due_date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      handleOrderDetailsChange("due_date", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-whitedark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    id="status"
                    value={orderDetails.status}
                    onChange={(e) => {
                      handleOrderDetailsChange("status", e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Order status"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="remarks"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  name="remarks"
                  rows={4}
                  value={orderDetails.remarks}
                  onChange={(e) => {
                    handleOrderDetailsChange("remarks", e.target.value);
                  }}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your remarks here"
                ></textarea>
              </div>
            </div>

            {/* //? Items Table */}
            <div className="mt-5">
              <label
                htmlFor="item"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Item List
              </label>
              <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-sm rounded-xl border-[0.5px] border-neutral-500">
                <table className="w-full text-sm text-left text-body">
                  <thead className="text-xs uppercase tracking-wide bg-emerald-900 border-b-[0.5px] border-neutral-500 text-white dark:text-stone-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold"></th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Item</th>
                      <th className="px-6 py-4 font-semibold">Qty</th>
                      <th className="px-6 py-4 font-semibold">Size</th>
                      <th className="px-6 py-4 font-semibold">Colour</th>
                      <th className="px-6 py-4 font-semibold"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-default">
                    {itemDetails.map((item, index) => {
                      if (item.product_id) {
                        return (
                          <tr
                            key={index}
                            className="bg-neutral-primary hover:bg-neutral-secondary-soft transition-colors"
                          >
                            <td
                              scope="row"
                              onClick={() => {
                                setSelectedIndex(index);
                                setShowAddItemModal(true);
                              }}
                              className="cursor-pointer px-6 py-4 font-medium text-heading whitespace-nowrap"
                            >
                              <InfoIcon
                                size={iconSpecifications.size}
                                color={iconSpecifications.colour}
                                weight={iconSpecifications.weight as any}
                              />
                            </td>

                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                            >
                              Queued
                            </th>

                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                            >
                              {item.product_id}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                            >
                              {item.quantity} {item.qty_unit}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                            >
                              {item.size} {item.size_unit}
                            </th>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                            >
                              {item.colour}
                            </th>
                            <td className="px-6 py-4 text-center">
                              <div className="flex">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedIndex(index);
                                    setShowAddItemModal(true);
                                  }}
                                  className="cursor-pointer inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
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
                                    removeItem(index);
                                  }}
                                  className="cursor-pointer inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                                >
                                  <TrashIcon
                                    size={iconSpecifications.size}
                                    color="#800000"
                                    weight={iconSpecifications.weight as any}
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setShowAddItemModal(true);
                  setAddItemClick(!addItemClick);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                <PlusIcon />
                Add Item
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                <PlusIcon />
                Cancel
              </button>

              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (editOrderId) {
                    updateOrder(e);
                  } else {
                    createOrder(e);
                  }
                }}
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                {editOrderId ? "Update Order" : "Create Order"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* <!-- Main modal --> */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${showAddItemModal ? "flex" : "hidden"
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        <AddEditProductModal
          index={selectedIndex}
          addItemClick={addItemClick}
          itemDetails={itemDetails}
          setItemDetails={setItemDetails}
          setShowAddItemModal={setShowAddItemModal}
        />
      </div>
    </section>
  );
}
