"use client";

//? React and Next imports
import { useEffect, useState } from "react";

//? Icons
import {
  XIcon,
  PlusIcon,
  ArrowUUpLeftIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import { jobStageApi } from "../services/job_stages_api";

//? Specification Imports
import { iconSpecifications } from "../local_db/general_specifications";

//? Service Imports
import { getProductsApi } from "../services/get_products_api";
import { GetJobWorkersAPI } from "@/features/job_worker_management/services/get_job_workers_api";

type ItemDetail = {
  product_id: string;
  size: string;
  size_unit: string;
  colour: string;
  quantity: string;
  qty_unit: string;
  stages: StageDetails[];
  remarks: string;
};

type StageDetails = {
  id: string;
  name: string;
  description: string;
  status: string;
  assigned_to: string;
};

type AddProductModalType = {
  index?: number;
  addItemClick: boolean;
  itemDetails: ItemDetail[];
  setItemDetails: React.Dispatch<React.SetStateAction<ItemDetail[]>>;
  setShowAddItemModal: (value: boolean) => void;
  // itemStages: StageDetails[];
  // setItemStages: React.Dispatch<React.SetStateAction<StageDetails[]>>;
};

export default function AddEditProductModal({
  index,
  addItemClick,
  itemDetails,
  setItemDetails,
  setShowAddItemModal,
}: // itemStages,
  // setItemStages,
  AddProductModalType) {

  const [newItemDetails, setNewItemDetails] = useState<ItemDetail>({
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
  });


  const [products, setProducts] = useState([{
    id: "",
    cutomer_id: "",
    name: "",
    sku: "",
    hsn_code: "",
    description: ""
  }])

  const [stages, setStages] = useState([
    {
      id: "",
      name: "",
      description: "",
      status: "",
      assigned_to: "",
    },
  ]);

  const [jobWorkers, setJobWorkers] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const [showAddStages, setShowAddStages] = useState(false);

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
      });
    }
  }, [addItemClick]);

  useEffect(() => {
    let company_id = localStorage.getItem("cid");
    const fetchProducts = async () => {
      if (company_id) {
        let res = await getProductsApi({ company_id });
        console.log({ products: res });
        setProducts(res.data.data)
      }
    }

    const fetchStages = async () => {
      let res = await jobStageApi();
      console.log({ res });
      if (res && res.data && res.data.stages) {
        setStages(res.data.stages);
      } else {
        setStages([]);
      }
    };

    const fetchJobWorkers = async () => {
      if (company_id) {
        let res = await GetJobWorkersAPI({ company_id });
        console.log({ jobWorkers: res });
        setJobWorkers(res.data.data)
      }
    }

    fetchJobWorkers()
    fetchProducts()
    fetchStages();
  }, []);

  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      {!showAddStages ? (
        <div className="relative rounded-xl dark:bg-gray-800 border border-gray-500 rounded-base shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-gray-500 border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">
              Add product
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
                <select
                  id="item_name"
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
                  value={itemDetails[0].product_id || newItemDetails.product_id}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Product</option>
                  {products.map((prod) => {
                    return (
                      <option key={prod.id} value={prod.id}>{prod.name}</option>
                    )
                  })}


                </select>
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
                  placeholder="Enter size"
                  value={itemDetails[0].size || newItemDetails.size}
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
                  value={itemDetails[0].size_unit || newItemDetails.size_unit}
                  onChange={(e) => {
                    if (typeof index === "number") {
                      handleItemDetailsChange(
                        index,
                        "size_unit",
                        e.target.value
                      );
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
                  placeholder="Enter quantity"
                  value={itemDetails[0].quantity || newItemDetails.quantity}
                  onChange={(e) => {
                    if (typeof index === "number") {
                      handleItemDetailsChange(
                        index,
                        "quantity",
                        e.target.value
                      );
                    } else {
                      handleNewItemDetails("quantity", e.target.value);
                    }
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              {/* //? Quantity Unit*/}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="unit"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Unit
                </label>
                <select
                  id="unit"
                  value={itemDetails[0].qty_unit || newItemDetails.qty_unit}
                  onChange={(e) => {
                    if (typeof index === "number") {
                      handleItemDetailsChange(
                        index,
                        "qty_unit",
                        e.target.value
                      );
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
              {/* //? Colour */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="unit"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Colour
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={itemDetails[0].colour || newItemDetails.colour}
                  onChange={(e) => {
                    if (typeof index === "number") {
                      handleItemDetailsChange(index, "colour", e.target.value);
                    } else {
                      handleNewItemDetails("colour", e.target.value);
                    }
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter colour"
                  required
                />
              </div>
              {/* //? Stage */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  htmlFor="unit"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Stage
                </label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddStages(true);
                  }}
                  className="w-full h-11 flex gap-2 justify-center items-center border rounded-lg border-primary-700 cursor-pointer"
                >
                  <TreeStructureIcon
                    size={25}
                    color={iconSpecifications.colour}
                    weight={iconSpecifications.weight as any}
                  />
                  <p className="text-primary-700">Select Stages</p>
                </button>
              </div>

              {/* //? Stages Display */}
              <div className="col-span-2">
                <label
                  htmlFor="remarks"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Assign Stages
                </label>
                <div
                  className="flex flex-col bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[44px] max-h-40 overflow-y-auto"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {
                    (itemDetails[0]?.stages
                      ? itemDetails[0]?.stages
                      : newItemDetails.stages
                    )
                      .filter((stage) => stage.id !== "")
                      .map((stage) => (
                        <div key={stage.id} className="flex flex-col mb-5">
                          <span
                            className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded mr-2 mb-1 text-xs"
                          >
                            {stage.name}
                          </span>
                          <div className="flex">
                            <select
                              id="size_unit"
                              onChange={(e) => {
                                if (typeof index === "number") {
                                  handleItemDetailsChange(
                                    index,
                                    "size_unit",
                                    e.target.value
                                  );
                                } else {
                                  handleNewItemDetails("size_unit", e.target.value);
                                }
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="internal">Internal</option>
                              {jobWorkers.map((worker) => {
                                return (
                                  <option key={worker.id} value={worker.id}>{worker.name}</option>
                                )
                              })}
                            </select>

                            <input
                              type="text"
                              name="name"
                              id="name"
                              // value={
                              //   typeof index === "number"
                              //     ? itemDetails[index]?.colour ?? ""
                              //     : newItemDetails.colour
                              // }
                              onChange={(e) => {
                                // if (typeof index === "number") {
                                //   handleItemDetailsChange(index, "colour", e.target.value);
                                // } else {
                                //   handleNewItemDetails("colour", e.target.value);
                                // }
                              }}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Qty"
                              required
                            />
                          </div>
                        </div>
                      ))}
                </div>
              </div>
              {/* //? Remarks */}
              <div className="col-span-2">
                <label
                  htmlFor="remarks"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  rows={2}
                  value={itemDetails[0].remarks || newItemDetails.remarks}
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
      ) : (
        //? <--- Select Stages --->
        <div className="relative rounded-xl dark:bg-gray-800 border border-gray-500 rounded-base shadow-sm p-4 md:p-6">
          <div className="flex items-center justify-between border-b border-gray-500 border-default mb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">Select Stages</h3>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowAddStages(false);
              }}
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
            >
              <XIcon size={20} />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {stages.map((stage) => {
            return (
              <div key={stage.id} className="flex items-center mb-4">
                <input
                  id="checkbox"
                  type="checkbox"
                  value={stage.id}
                  onChange={() => {
                    if (typeof index === "number") {
                      // Editing existing item
                      setItemDetails((prev) =>
                        prev.map((item, i) => {
                          if (i === index) {
                            const currentStages = item.stages ?? [];
                            const isSelected = currentStages.some(
                              (s) => s.id === stage.id
                            );
                            if (isSelected) {
                              // Uncheck: remove it from the array
                              return {
                                ...item,
                                stages: currentStages.filter(
                                  (s) => s.id !== stage.id
                                ),
                              };
                            } else {
                              // Check: add it to the array
                              return {
                                ...item,
                                stages: [
                                  ...currentStages,
                                  {
                                    id: stage.id,
                                    name: stage.name,
                                    description: stage.description,
                                    status: "Not Started",
                                    assigned_to: "",
                                  },
                                ],
                              };
                            }
                          }
                          return item;
                        })
                      );
                    } else {
                      // Creating new item
                      const currentStages = newItemDetails.stages ?? [];
                      const isSelected = currentStages.some(
                        (s) => s.id === stage.id
                      );
                      if (isSelected) {
                        // Uncheck: remove it from the array
                        setNewItemDetails((prev) => ({
                          ...prev,
                          stages: currentStages.filter(
                            (s) => s.id !== stage.id
                          ),
                        }));
                      } else {
                        // Check: add it to the array
                        setNewItemDetails((prev) => ({
                          ...prev,
                          stages: [
                            ...currentStages,
                            {
                              id: stage.id,
                              name: stage.name,
                              description: stage.description,
                              status: "Not Started",
                              assigned_to: "",
                            },
                          ],
                        }));
                      }
                    }
                  }}
                  checked={(typeof index === "number"
                    ? itemDetails[index]?.stages ?? []
                    : newItemDetails.stages
                  ).some((s) => s.id === stage.id)}
                  className="w-4 h-4 border border-light rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                />
                <label
                  htmlFor="checkbox"
                  className="select-none ms-2 text-sm font-medium text-fg-disabled"
                >
                  {stage.name}
                </label>
              </div>
            );
          })}
          <div className="flex items-center justify-end space-x-4 border-t border-gray-500 pt-4 ">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setShowAddStages(false);
              }}
              className="inline-flex gap-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowAddStages(false);
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
