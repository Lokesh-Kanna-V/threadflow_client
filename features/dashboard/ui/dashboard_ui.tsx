"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? NPM UI Imports
import { CheckIcon, WarningIcon, PlusIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? Service Imports
import { GetAllWoListAPI } from "@/features/order_list/services/get_all_wo_list_api";
import { GetCustomersAPI } from "@/features/order_list/services/get_customer_list_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

type WorkOrder = {
  id: string;
  customer_id: string;
  status: string;
  due_date: string | null;
  created_at?: string | null;
};

type Customer = {
  id: string;
  name: string;
};

type DashboardUIProps = {
  onAddWorkOrder: () => void;
  onAddCustomer: () => void;
  onAddJobWorker: () => void;
  onViewSettings: () => void;
};

export default function DashboardUI({
  onAddWorkOrder,
  onAddCustomer,
  onAddJobWorker,
  onViewSettings,
}: DashboardUIProps) {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const company_id = localStorage.getItem("cid");

        const [ordersRes, customersRes] = await Promise.all([
          GetAllWoListAPI({ company_id: company_id || undefined }),
          GetCustomersAPI({ company_id: company_id || undefined }),
        ]);

        if (ordersRes.success && ordersRes.data?.data) {
          setOrders(ordersRes.data.data);
        } else {
          setOrders([]);
        }

        if (customersRes.success && customersRes.data?.data) {
          setCustomers(customersRes.data.data);
        } else {
          setCustomers([]);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status && o.status.toLowerCase() === "active"
  ).length;
  const completedOrders = orders.filter(
    (o) => o.status && o.status.toLowerCase() === "completed"
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueOrders = orders.filter((wo) => {
    if (!wo.due_date) return false;
    const due = new Date(wo.due_date);
    if (Number.isNaN(due.getTime())) return false;
    return due < today && wo.status?.toLowerCase() !== "completed";
  }).length;

  const getCustomerName = (customerId: string) => {
    return customers.find((c) => c.id === customerId)?.name || "-";
  };

  const ordersThisWeek = orders.filter((wo) => {
    if (!wo.created_at) return false;
    const created = new Date(wo.created_at);
    if (Number.isNaN(created.getTime())) return false;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const completionRate =
    totalOrders === 0 ? 0 : Math.round((completedOrders / totalOrders) * 100);

  const nextDueOrder = (() => {
    const upcoming = orders
      .filter((wo) => {
        if (!wo.due_date) return false;
        const due = new Date(wo.due_date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        if (Number.isNaN(due.getTime())) return false;
        return (
          due >= now && wo.status?.toLowerCase() !== "completed"
        );
      })
      .sort((a, b) => {
        const da = new Date(a.due_date || "").getTime();
        const db = new Date(b.due_date || "").getTime();
        return da - db;
      });
    return upcoming[0] || null;
  })();

  const topCustomers = (() => {
    const counts: Record<string, number> = {};
    orders.forEach((wo) => {
      if (!wo.customer_id) return;
      counts[wo.customer_id] = (counts[wo.customer_id] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([customerId, count]) => ({
        customerId,
        count,
        name: getCustomerName(customerId),
      }));
  })();

  const StatValue = ({ value }: { value: string | number }) => {
    if (loading) {
      return (
        <div className="h-10 w-20 rounded-md bg-black/10 dark:bg-white/10 animate-pulse mb-2" />
      );
    }
    return <>{value}</>;
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      {/* //? <---- Statistics ----> */}
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-md font-bold md:text-lg uppercase">Statistics</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* //? Total orders */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-emerald-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">
              <StatValue value={totalOrders} />
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Total Orders
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-emerald-800 bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 rounded-full">
              <CheckIcon
                size={18}
                color={iconSpecifications.colour}
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Based on live data
            </div>
          </div>

          {/* //? Active orders */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-amber-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-amber-700 mb-2">
              <StatValue value={ordersThisWeek} />
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Orders This Week
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-emerald-800 bg-amber-200 dark:bg-amber-900 dark:text-orange-200 px-2 py-1 rounded-full">
              <WarningIcon
                size={18}
                color="orange"
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Created in last 7 days
            </div>
          </div>

          {/* //? Overdue orders */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-red-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-red-700 mb-2">
              <StatValue value={overdueOrders} />
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Overdue Orders
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-red-900 bg-red-200 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full">
              <WarningIcon
                size={18}
                color="red"
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Past due date
            </div>
          </div>

          {/* //? Completed orders */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-emerald-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">
              {loading ? <StatValue value="" /> : `${completionRate}%`}
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Completion Rate
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-emerald-800 bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 rounded-full">
              <CheckIcon
                size={18}
                color={iconSpecifications.colour}
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Based on total orders
            </div>
          </div>
        </div>
      </div>

      {/* //? <---- Live Orders Summary ----> */}
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-md font-bold md:text-lg uppercase">
          Live Orders Summary
        </h1>

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-sm rounded-xl border-[0.5px] border-neutral-500">
          {loading ? (
            <div className="p-6">
              <ListLoader text="Loading dashboard data..." />
            </div>
          ) : (
            <table className="w-full text-sm text-left text-body">
              <thead className="text-xs uppercase tracking-wide bg-emerald-900 border-b-[0.5px] border-neutral-500 text-white dark:text-stone-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Due Date</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-default">
                {orders.length === 0 ? (
                  <tr className="bg-neutral-primary">
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                    >
                      No work orders found.
                    </td>
                  </tr>
                ) : (
                  orders.slice(0, 10).map((wo) => (
                    <tr
                      key={wo.id}
                      className="bg-neutral-primary hover:bg-neutral-secondary-soft transition-colors"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                      >
                        {wo.id}
                      </th>
                      <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {getCustomerName(wo.customer_id)}
                      </td>
                      <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {wo.status || "-"}
                      </td>
                      <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {wo.due_date
                          ? new Date(wo.due_date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                        {wo.created_at
                          ? new Date(wo.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* //? <---- Insights ----> */}
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-md font-bold md:text-lg uppercase">Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-4">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Next Due Order
            </h2>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-28 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
                <div className="h-3 w-40 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
                <div className="h-3 w-24 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              </div>
            ) : nextDueOrder ? (
              <div>
                <p className="text-sm text-gray-900 dark:text-white font-medium">
                  {nextDueOrder.id}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  {getCustomerName(nextDueOrder.customer_id)}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Due{" "}
                  {nextDueOrder.due_date
                    ? new Date(nextDueOrder.due_date).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No upcoming due orders.
              </p>
            )}
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 p-4">
            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Top Customers by Orders
            </h2>
            {loading ? (
              <div className="space-y-2">
                <div className="h-3 w-56 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
                <div className="h-3 w-48 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
                <div className="h-3 w-52 rounded bg-black/10 dark:bg-white/10 animate-pulse" />
              </div>
            ) : topCustomers.length === 0 ? (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Not enough data yet.
              </p>
            ) : (
              <ul className="space-y-1">
                {topCustomers.map((c) => (
                  <li
                    key={c.customerId}
                    className="flex items-center justify-between text-xs text-gray-800 dark:text-gray-100"
                  >
                    <span className="truncate">{c.name}</span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">
                      {c.count} orders
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* //? <---- Quick Actions ----> */}
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-md font-bold md:text-lg uppercase">
          Quick Actions
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Action 1 */}
          <button
            onClick={onAddWorkOrder}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition"
          >
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            Add Work Order
          </button>

          {/* Action 2 */}
          <button
            onClick={onAddCustomer}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition"
          >
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            Add Customer
          </button>

          {/* Action 3 */}
          <button
            onClick={onAddJobWorker}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition"
          >
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            Add Job Worker
          </button>

          {/* Action 4 */}
          <button
            onClick={onViewSettings}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition"
          >
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            View Settings
          </button>
        </div>
      </div>
    </main>
  );
}
