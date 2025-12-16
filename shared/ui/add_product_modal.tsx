"use client";

import { XIcon, PlusIcon } from "@phosphor-icons/react";

type ItemDetail = {
  product_id: string;
  size: string;
  size_unit: string;
  colour: string;
  quantity: string;
  qty_unit: string;
};

type AddProductModalType = {
  setItemDetails: React.Dispatch<React.SetStateAction<ItemDetail[]>>;
  setShowAddItemModal: (value: boolean) => void;
};

export default function AddProductModal({
  setItemDetails,
  setShowAddItemModal,
}: AddProductModalType) {
  const handleItemDetailsChange = (
    index: number,
    field: keyof ItemDetail,
    value: string
  ) => {
    setItemDetails((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative rounded-xl dark:bg-gray-800 border border-gray-500 rounded-base shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between border-b border-gray-500 border-default pb-4 md:pb-5">
          <h3 className="text-lg font-medium text-heading">
            Create new product
          </h3>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowAddItemModal(false);
            }}
            className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            data-modal-hide="crud-modal"
          >
            <XIcon size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form action="#">
          <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Item Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="price"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="category"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Category
              </label>
              <select
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select category</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Product Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center space-x-4 border-t border-gray-500 pt-4 md:pt-6">
            <button
              type="submit"
              className="inline-flex gap-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              <PlusIcon />
              Add Item
            </button>
            <button
              data-modal-hide="crud-modal"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowAddItemModal(false);
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
