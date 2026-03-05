"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { GetOrderByIdAPI } from "@/features/order_list/services/get_order_by_id_api";
import { GetCustomersAPI } from "@/features/order_list/services/get_customer_list_api";
import { getProductsApi } from "@/shared/services/get_products_api";
import { UpdateOrderAPI } from "@/features/order_list/services/update_order_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";
import AlertBanner from "@/shared/ui/alert_banner";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

type WorkerUpdatePageProps = {
  woId: string;
};

type Stage = {
  id: string;
  name: string;
  description: string;
  status: string;
  assigned_to: string;
};

type WorkOrderItem = {
  id: string;
  product_id: string;
  size: string;
  size_unit: string;
  colour: string;
  quantity: string;
  qty_unit: string;
  stages?: Stage[];
  remarks?: string;
};

type WorkOrderDetails = {
  id: string;
  company_id: string;
  customer_id: string;
  status: string;
  remarks: string | null;
  due_date: string | null;
};

type Customer = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
};

export default function WorkerUpdateUI({ woId }: WorkerUpdatePageProps) {
  const [order, setOrder] = useState<WorkOrderDetails | null>(null);
  const [items, setItems] = useState<WorkOrderItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const orderRes = await GetOrderByIdAPI({ id: woId });
        if (!orderRes.success || !orderRes.data?.data) {
          setError("Unable to find this work order.");
          return;
        }

        const orderData = orderRes.data.data;
        setOrder({
          id: orderData.id,
          company_id: orderData.company_id,
          customer_id: orderData.customer_id,
          status: orderData.status,
          remarks: orderData.remarks,
          due_date: orderData.due_date,
        });
        setItems(orderData.items || []);

        const company_id = orderData.company_id;
        if (!company_id) return;

        const [customerRes, productRes] = await Promise.all([
          GetCustomersAPI({ company_id }),
          getProductsApi({ company_id }),
        ]);

        if (customerRes.success && customerRes.data?.data) {
          setCustomers(customerRes.data.data);
        }

        if (productRes.success && productRes.data?.data) {
          setProducts(productRes.data.data);
        }
      } catch (err) {
        setError("Something went wrong while loading work order.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [woId]);

  const getCustomerName = (customerId: string) => {
    return customers.find((c) => c.id === customerId)?.name || "-";
  };

  const getProductName = (productId: string) => {
    return products.find((p) => p.id === productId)?.name || productId || "-";
  };

  const handleStageStatusChange = (
    itemId: string,
    stageId: string,
    status: string
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              stages: (item.stages || []).map((stage) =>
                stage.id === stageId ? { ...stage, status } : stage
              ),
            }
          : item
      )
    );
  };

  const handleSave = async () => {
    if (!order) return;
    setSaving(true);
    setSaveMessage(null);
    setError(null);

    try {
      const payload = {
        id: order.id,
        orderDetails: {
          company_id: order.company_id,
          customer_id: order.customer_id,
          due_date: order.due_date,
          status: order.status,
          remarks: order.remarks || "",
        },
        itemDetails: items.map((item) => ({
          product_id: item.product_id,
          size: item.size,
          size_unit: item.size_unit,
          colour: item.colour,
          quantity: item.quantity,
          qty_unit: item.qty_unit,
          stages: item.stages || [],
          remarks: item.remarks || "",
        })),
      };

      const res = await UpdateOrderAPI(payload);
      if (!res.success) {
        setError(
          typeof res.error === "string"
            ? res.error
            : "Failed to update work order."
        );
        return;
      }

      setSaveMessage("Job status updated successfully.");
    } catch (err) {
      setError("Something went wrong while saving updates.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-10 pb-16 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Update Job Status
        </h1>

        {(error || saveMessage) && (
          <div className="mb-4">
            <AlertBanner
              type={error ? "error" : "success"}
              message={
                error ||
                saveMessage ||
                "Status updated. This message will close automatically."
              }
              onClose={() => {
                setError(null);
                setSaveMessage(null);
              }}
            />
          </div>
        )}

        {loading && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <ListLoader text="Loading work order..." />
          </div>
        )}

        {!loading && !error && order && (
          <div className="space-y-6">
            {/* //? Order header */}
            <div className="bg-emerald-100 dark:bg-gray-800 border border-emerald-300 dark:border-gray-700 rounded-lg shadow-sm p-5">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Work Order
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Order:{" "}
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {order.id}
                </span>
              </p>
              <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                Customer:{" "}
                <span className="font-semibold">
                  {getCustomerName(order.customer_id)}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                  {order.status || "Status not set"}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  Due Date:{" "}
                  <span className="ml-1 font-medium">
                    {order.due_date
                      ? new Date(order.due_date).toLocaleDateString()
                      : "-"}
                  </span>
                </span>
              </div>
            </div>

            {/* //? Items and editable stages */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5">
              <h2 className="text-md font-bold md:text-lg uppercase mb-4 text-gray-900 dark:text-white">
                Job Stages
              </h2>

              {items.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No items found for this work order.
                </p>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-emerald-50 dark:bg-gray-900"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <div>
                          <p className="text-sm italic text-gray-600 dark:text-gray-400">
                            Item
                          </p>
                          <p className="text-base font-semibold text-gray-900 dark:text-white">
                            {getProductName(item.product_id)}
                          </p>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">
                            {item.quantity} {item.qty_unit}
                          </span>
                          {item.size && (
                            <span className="ml-3">
                              Size: {item.size} {item.size_unit}
                            </span>
                          )}
                          {item.colour && (
                            <span className="ml-3">Colour: {item.colour}</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">
                          Update Stages
                        </p>
                        {(!item.stages || item.stages.length === 0) && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            No stages have been assigned for this item yet.
                          </p>
                        )}
                        <div className="space-y-3">
                          {(item.stages || []).map((stage) => (
                            <div
                              key={stage.id}
                              className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {stage.name}
                                </p>
                                {stage.description && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stage.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto">
                                <select
                                  value={stage.status || "Not Started"}
                                  onChange={(e) =>
                                    handleStageStatusChange(
                                      item.id,
                                      stage.id,
                                      e.target.value
                                    )
                                  }
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full md:w-40 p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                  <option value="Not Started">
                                    Not Started
                                  </option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="On Hold">On Hold</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || !order}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Saving..." : "Save Updates"}
                </button>
              </div>
            </div>

            <p className="text-xs text-center text-gray-400 dark:text-gray-500">
              Powered by ThreadFlow Sync
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

