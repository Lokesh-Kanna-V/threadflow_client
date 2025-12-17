"use client";

//? React and Next imports
import { useEffect, useState } from "react";

//? Icons
import { XIcon, PlusIcon } from "@phosphor-icons/react";

type ItemDetail = {
  product_id: string;
  size: string;
  size_unit: string;
  colour: string;
  quantity: string;
  qty_unit: string;
  remarks: string;
};

type AddProductModalType = {
  index?: number;
  addItemClick: boolean;
  itemDetails: ItemDetail[];
  setItemDetails: React.Dispatch<React.SetStateAction<ItemDetail[]>>;
  setShowAddItemModal: (value: boolean) => void;
};

export default function AddEditProductModal({
  index,
  addItemClick,
  itemDetails,
  setItemDetails,
  setShowAddItemModal,
}: AddProductModalType) {
  const [newItemDetails, setNewItemDetails] = useState<ItemDetail>({
    product_id: "",
    size: "",
    size_unit: "",
    colour: "",
    quantity: "",
    qty_unit: "",
    remarks: "",
  });

  const handleItemDetailsChange = (
    index: number,
    field: keyof ItemDetail,
    value: string
  ) => {
    setItemDetails((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleNewItemDetails = (field: keyof ItemDetail, value: string) => {
    setNewItemDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add mode → push new item once
    if (index === undefined) {
      setItemDetails((prev) => [...prev, newItemDetails]);
    }

    // setShowAddItemModal(false);
  };

  useEffect(() => {
    if (typeof index != "number") {
      setNewItemDetails({
        product_id: "",
        size: "",
        size_unit: "",
        colour: "",
        quantity: "",
        qty_unit: "",
        remarks: "",
      });
    }
  }, [addItemClick]);

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
          >
            <XIcon size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* //? FORM */}
        <form>
          <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
            {/* //? Name */}
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
                value={
                  typeof index === "number"
                    ? itemDetails[index]?.product_id ?? ""
                    : newItemDetails.product_id
                }
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(
                      index,
                      "product_id",
                      e.target.value
                    );
                  } else {
                    handleNewItemDetails("product_id", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Type product name"
                required
              />
            </div>

            {/* //? Colour */}
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Colour
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={
                  typeof index === "number"
                    ? itemDetails[index]?.colour ?? ""
                    : newItemDetails.colour
                }
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(index, "colour", e.target.value);
                  } else {
                    handleNewItemDetails("colour", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Type product name"
                required
              />
            </div>

            {/* //? Size */}
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="size"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Size
              </label>
              <input
                id="size"
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(index, "size", e.target.value);
                  } else {
                    handleNewItemDetails("size", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* //? Size Unit */}
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="unit"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Unit
              </label>
              <select
                id="size_unit"
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(index, "size_unit", e.target.value);
                  } else {
                    handleNewItemDetails("size_unit", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Unit</option>
                <option value="centimeter">cm</option>
                <option value="meter">m</option>
                <option value="inch">In</option>
              </select>
            </div>

            {/* //? Quantity */}
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="size"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Quantity
              </label>
              <input
                id="size"
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(index, "quantity", e.target.value);
                  } else {
                    handleNewItemDetails("quantity", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="unit"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Unit
              </label>
              <select
                id="unit"
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(index, "qty_unit", e.target.value);
                  } else {
                    handleNewItemDetails("qty_unit", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Unit</option>
                <option value="gram">Gram</option>
                <option value="kg">KiloGram</option>
                <option value="tonne">Tonne</option>
              </select>
            </div>

            <div className="col-span-2">
              <label
                htmlFor="remarks"
                className="block mb-2.5 text-sm font-medium text-heading"
              >
                Remarks
              </label>
              <textarea
                id="remarks"
                rows={4}
                onChange={(e) => {
                  if (typeof index === "number") {
                    handleItemDetailsChange(index, "remarks", e.target.value);
                  } else {
                    handleNewItemDetails("remarks", e.target.value);
                  }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Write product description here"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center space-x-4 border-t border-gray-500 pt-4 md:pt-6">
            <button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
                setNewItemDetails({
                  product_id: "",
                  size: "",
                  size_unit: "",
                  colour: "",
                  quantity: "",
                  qty_unit: "",
                  remarks: "",
                });
              }}
              className="inline-flex gap-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
            >
              <PlusIcon />
              Add More
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
                setShowAddItemModal(false);
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
            >
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
