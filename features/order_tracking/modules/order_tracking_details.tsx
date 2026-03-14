"use client";

//? React & Next Imports
import { useEffect, useMemo, useState } from "react";

//? Service Imports
import { GetOrderByIdAPI } from "@/features/order_list/services/get_order_by_id_api";
import { GetCustomersAPI } from "@/features/order_list/services/get_customer_list_api";
import { getProductsApi } from "@/shared/services/get_products_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";
import AlertBanner from "@/shared/ui/alert_banner";

type OrderTrackingDetailsProps = {
  woId: string;
};

type Stage = {
  id: string;
  name: string;
  description: string;
  status: string;
  assigned_to: string;
  start_date?: string;
  end_date?: string;
  estimated_completion_date?: string;
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
  items?: WorkOrderItem[];
};

type Customer = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
};

export default function OrderTrackingDetails({ woId }: OrderTrackingDetailsProps) {
  const [order, setOrder] = useState<WorkOrderDetails | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedStage, setSelectedStage] = useState<{
    itemId: string;
    stageId: string;
  } | null>(null);

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
        setOrder(orderData);

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

        const firstItem = (orderData.items || [])[0];
        const firstStage = (firstItem?.stages || [])[0];
        if (firstItem?.id && firstStage?.id) {
          setSelectedStage({ itemId: firstItem.id, stageId: firstStage.id });
        } else {
          setSelectedStage(null);
        }
      } catch (err) {
        setError("Something went wrong while loading tracking details.");
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

  const selectedStageData = useMemo(() => {
    if (!order || !selectedStage) return null;
    const item = (order.items || []).find((i) => i.id === selectedStage.itemId);
    const stage = (item?.stages || []).find((s) => s.id === selectedStage.stageId);
    if (!item || !stage) return null;
    return { item, stage };
  }, [order, selectedStage]);

  const getStageStatusStyles = (status?: string) => {
    const normalized = (status || "").toLowerCase();
    if (normalized.includes("complete")) {
      return {
        dot: "bg-emerald-600",
        pill: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
        line: "bg-emerald-300 dark:bg-emerald-700",
      };
    }
    if (normalized.includes("progress")) {
      return {
        dot: "bg-yellow-500",
        pill: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        line: "bg-yellow-300 dark:bg-yellow-700",
      };
    }
    if (normalized.includes("hold")) {
      return {
        dot: "bg-red-500",
        pill: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        line: "bg-red-300 dark:bg-red-700",
      };
    }
    return {
      dot: "bg-gray-400",
      pill: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
      line: "bg-gray-200 dark:bg-gray-700",
    };
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4">
          <AlertBanner
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        </div>
      )}

      {loading && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <ListLoader text="Loading order status..." />
        </div>
      )}

      {!loading && !error && order && (
        <div className="space-y-6">
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
                  {order.due_date ? new Date(order.due_date).toLocaleDateString() : "-"}
                </span>
              </span>
            </div>
            {order.remarks && (
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">Remarks:</span> {order.remarks}
              </p>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-5">
            <h2 className="text-md font-bold md:text-lg uppercase mb-4 text-gray-900 dark:text-white">
              Timeline
            </h2>

            {(order.items || []).length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No items found for this work order.
              </p>
            ) : (
              <div className="space-y-6">
                {(order.items || []).map((item) => {
                  const stages = item.stages || [];
                  const activeStageId =
                    selectedStage?.itemId === item.id ? selectedStage.stageId : null;

                  return (
                    <div
                      key={item.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-emerald-50 dark:bg-gray-900"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="min-w-0 w-full md:flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                            <div className="min-w-0">
                              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                                Item
                              </p>
                              <p className="text-base font-semibold text-gray-900 dark:text-white truncate">
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

                          {stages.length === 0 ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              No stages have been assigned for this item yet.
                            </p>
                          ) : (
                            <>
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                  Stages
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  Click a stage to view details
                                </p>
                              </div>

                              <div className="mt-3">
                                <ol className="relative border-l border-gray-200 dark:border-gray-700 md:border-l-0 md:flex md:flex-wrap md:gap-3">
                                  {stages.map((stage, idx) => {
                                    const isActive = activeStageId === stage.id;
                                    const styles = getStageStatusStyles(stage.status);

                                    return (
                                      <li
                                        key={stage.id}
                                        className="mb-6 md:mb-3 md:flex-none md:w-[220px]"
                                      >
                                        <div className="flex items-start md:flex-col md:items-stretch gap-3">
                                          <span
                                            className={`absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full ${styles.dot} md:static md:mt-0 md:mx-auto`}
                                          />

                                          <button
                                            type="button"
                                            onClick={() =>
                                              setSelectedStage({
                                                itemId: item.id,
                                                stageId: stage.id,
                                              })
                                            }
                                            className={`w-full rounded-lg border px-3 py-2 text-left bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600 ${isActive
                                                ? "ring-2 ring-primary-600"
                                                : ""
                                              }`}
                                          >
                                            <div className="flex items-start justify-between gap-2">
                                              <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                  {stage.name}
                                                </p>
                                                {stage.description && (
                                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {stage.description}
                                                  </p>
                                                )}
                                              </div>

                                              <span
                                                className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs ${styles.pill}`}
                                              >
                                                {stage.status || "Not Started"}
                                              </span>
                                            </div>
                                          </button>
                                        </div>

                                        {idx !== stages.length - 1 && (
                                          <div className="hidden md:block mt-3">
                                            <div
                                              className={`h-0.5 w-full ${styles.line}`}
                                            ></div>
                                          </div>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ol>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="w-full md:w-[360px]">
                          <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 h-full">
                            {!selectedStageData ||
                              selectedStageData.item.id !== item.id ? (
                              <div>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                  Stage Details
                                </p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                  Select a stage from the timeline to see details here.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {selectedStageData.stage.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {getProductName(selectedStageData.item.product_id)}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                    Status:{" "}
                                    <span className="ml-1 font-semibold">
                                      {selectedStageData.stage.status || "Not Started"}
                                    </span>
                                  </span>
                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                                    Stage ID:{" "}
                                    <span className="ml-1 font-mono">
                                      {selectedStageData.stage.id}
                                    </span>
                                  </span>
                                </div>

                                {(selectedStageData.stage.start_date ||
                                  selectedStageData.stage.end_date ||
                                  selectedStageData.stage.estimated_completion_date) && (
                                  <div className="space-y-1">
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                      Dates
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-sm text-gray-800 dark:text-gray-200">
                                      {selectedStageData.stage.start_date && (
                                        <span>
                                          Start:{" "}
                                          {new Date(
                                            selectedStageData.stage.start_date
                                          ).toLocaleString()}
                                        </span>
                                      )}
                                      {selectedStageData.stage.estimated_completion_date && (
                                        <span>
                                          Est. completion:{" "}
                                          {new Date(
                                            selectedStageData.stage.estimated_completion_date
                                          ).toLocaleDateString()}
                                        </span>
                                      )}
                                      {selectedStageData.stage.end_date && (
                                        <span>
                                          End:{" "}
                                          {new Date(
                                            selectedStageData.stage.end_date
                                          ).toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )}

                                {selectedStageData.stage.description && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                      Description
                                    </p>
                                    <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                                      {selectedStageData.stage.description}
                                    </p>
                                  </div>
                                )}

                                <div>
                                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                    Assigned To
                                  </p>
                                  <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                                    {selectedStageData.stage.assigned_to || "-"}
                                  </p>
                                </div>

                                {selectedStageData.item.remarks && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                      Item Remarks
                                    </p>
                                    <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
                                      {selectedStageData.item.remarks}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

