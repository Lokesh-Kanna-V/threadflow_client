"use client";

//? React & Next Imports
import { useState } from "react";

//? NPM UI Imports
import { CheckIcon, InfoIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

export default function AddEditOrder() {
  const [date, setDate] = useState("");
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-2xl lg:py-16">
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* //? Customer Name */}
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer Name
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select customer</option>
                <option value="zara">Zara</option>
                <option value="hnm">H&M</option>
                <option value="lp">Louis Philippe</option>
                <option value="lv">Louis Vuitton</option>
              </select>
            </div>

            <div className="flex gap-3">
              <div className="sm:col-span-2">
                <label
                  htmlFor="due"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Due Date
                </label>

                <input
                  type="date"
                  name="due"
                  id="due"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product status"
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
                    <th className="px-6 py-4 font-semibold">ETA</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-default">
                  <tr className="bg-neutral-primary hover:bg-neutral-secondary-soft transition-colors">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
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
                      100 Kg
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      100%
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Create Order
          </button>
        </form>
      </div>
    </section>
  );
}
