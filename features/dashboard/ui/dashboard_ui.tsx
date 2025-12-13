"use client";

//? NPM UI Imports
import { CheckIcon, WarningIcon, PlusIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

export default function DashboardUI() {
  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      {/* //? <---- Statistics ----> */}
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-md font-bold md:text-lg uppercase">Statistics</h1>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* //? active orders */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-emerald-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">
              40
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Active Orders
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-emerald-800 bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 rounded-full">
              <CheckIcon
                size={18}
                color={iconSpecifications.colour}
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Up to date
            </div>
          </div>

          {/* //? delayed orders */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-amber-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-amber-700 mb-2">6</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Delayed Stages
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-emerald-800 bg-amber-200 dark:bg-amber-900 dark:text-orange-200 px-2 py-1 rounded-full">
              <WarningIcon
                size={18}
                color="orange"
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Up to date
            </div>
          </div>

          {/* //? on hold */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-red-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-red-700 mb-2">2</div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              On Hold
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-red-900 bg-red-200 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full">
              <WarningIcon
                size={18}
                color="red"
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Up to date
            </div>
          </div>

          {/* //? Ready for Dispatch */}
          <div className="flex flex-col justify-center items-center border-2 rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72 bg-emerald-100 dark:bg-gray-800 shadow-sm p-4">
            <div className="text-4xl font-extrabold text-emerald-700 mb-2">
              10
            </div>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Dispatch Ready
            </div>
            <div className="mt-3 inline-flex items-center text-xs text-emerald-800 bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 rounded-full">
              <CheckIcon
                size={18}
                color={iconSpecifications.colour}
                weight={iconSpecifications.weight as any}
                className="mr-1"
              />
              Up to date
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
          <table className="w-full text-sm text-left text-body">
            <thead className="text-xs uppercase tracking-wide bg-emerald-900 border-b-[0.5px] border-neutral-500 text-white dark:text-stone-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Order</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Buyer</th>
                <th className="px-6 py-4 font-semibold">Qty</th>
                <th className="px-6 py-4 font-semibold">Progress</th>
                <th className="px-6 py-4 font-semibold">ETA</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default">
              <tr className="bg-neutral-primary hover:bg-neutral-secondary-soft transition-colors">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  ORD-1090
                </th>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full">
                    <CheckIcon
                      size={iconSpecifications.size}
                      color={iconSpecifications.colour}
                      weight={iconSpecifications.weight as any}
                    />
                  </span>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  Walrus
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  100 Kg
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  100%
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  21-12-25
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  8978******
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* //? <---- Quick Actions ----> */}
      <div className="flex flex-col gap-4 mb-4">
        <h1 className="text-md font-bold md:text-lg uppercase">
          Quick Actions
        </h1>

        <div className="grid grid-cols-2 gap-4">
          {/* Action 1 */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition">
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            Add Employee
          </button>

          {/* Action 2 */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition">
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            New User
          </button>

          {/* Action 3 */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition">
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            Create Report
          </button>

          {/* Action 4 */}
          <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-sm font-medium text-gray-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-gray-800 transition">
            <PlusIcon
              size={18}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
            Settings
          </button>
        </div>
      </div>
    </main>
  );
}
