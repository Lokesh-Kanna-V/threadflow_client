"use client";

//? React & Next Imports
import { useState } from "react";

//? UI Imports
import AddEditProductModal from "@/shared/ui/add_product_modal";

//? NPM UI Imports
import {
  CheckIcon,
  InfoIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

export default function AddEditOrder() {
  const [date, setDate] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    company_id: "",
    customer_id: "",
    due_date: "",
    status: "",
    remarks: "",
  });

  const [itemDetails, setItemDetails] = useState([
    {
      product_id: "",
      size: "",
      size_unit: "",
      colour: "",
      quantity: "",
      qty_unit: "",
    },
  ]);

  const handleOrderDetailsChange = (field: string, value: string) => {
    setOrderDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createOrder = (e: any) => {
    e.preventDefault();
    console.log({ orderDetails, itemDetails });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-2xl lg:py-16">
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            {/* //? Customer Name */}
            <div>
              <label
                htmlFor="customer"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Customer Name
              </label>

              <input
                list="customers"
                id="customer"
                name="customer"
                placeholder="Select or type customer"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
               focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5
               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <datalist id="customers">
                <option value="Zara" />
                <option value="H&M" />
                <option value="Louis Philippe" />
                <option value="Louis Vuitton" />
              </datalist>

              {/* Add New Customer Button */}
              {/* <button
                type="button"
                className="mt-2 text-sm font-medium text-primary-600 hover:underline
               dark:text-primary-400"
              >
                + Add New Customer
              </button> */}
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
                  onChange={(e) => {
                    handleOrderDetailsChange("status", e.target.value);
                  }}
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
                    <th className="px-6 py-4 font-semibold">ETA</th>
                    <th className="px-6 py-4 font-semibold"></th>
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
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full">
                        <TrashIcon
                          size={iconSpecifications.size}
                          color="#800000"
                          weight={iconSpecifications.weight as any}
                        />
                      </span>
                    </td>
                  </tr>
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
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              <PlusIcon />
              Add Item
            </button>

            <button
              type="submit"
              onClick={(e) => {
                createOrder(e);
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>

      {/* <!-- Main modal --> */}
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${
          showAddItemModal ? "flex" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
      >
        <AddEditProductModal
          setItemDetails={setItemDetails}
          setShowAddItemModal={setShowAddItemModal}
        />
      </div>
    </section>
  );
}
