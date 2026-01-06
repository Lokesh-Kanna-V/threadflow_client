// "use client";

// //? React and Next imports
// import { useEffect, useState } from "react";

// //? Icons
// import {
//   XIcon,
//   PlusIcon,
//   ArrowUUpLeftIcon,
//   TreeStructureIcon,
// } from "@phosphor-icons/react";
// import { jobStageApi } from "../services/job_stages_api";

// //? Specification Imports
// import { iconSpecifications } from "../local_db/general_specifications";

// type ItemDetail = {
//   product_id: string;
//   size: string;
//   size_unit: string;
//   colour: string;
//   quantity: string;
//   qty_unit: string;
//   stages: StageDetails[];
//   remarks: string;
// };

// type StageDetails = {
//   id: string;
//   name: string;
//   description: string;
//   status: string;
//   assigned_to: string;
// };

// type AddProductModalType = {
//   index?: number;
//   addItemClick: boolean;
//   itemDetails: ItemDetail[];
//   setItemDetails: React.Dispatch<React.SetStateAction<ItemDetail[]>>;
//   setShowAddItemModal: (value: boolean) => void;
//   itemStages: StageDetails[];
//   setItemStages: React.Dispatch<React.SetStateAction<StageDetails[]>>;
// };

// export default function AddEditProductModal({
//   index,
//   addItemClick,
//   itemDetails,
//   setItemDetails,
//   setShowAddItemModal,
//   itemStages,
//   setItemStages,
// }: AddProductModalType) {
//   const [newItemDetails, setNewItemDetails] = useState<ItemDetail>({
//     product_id: "",
//     size: "",
//     size_unit: "",
//     colour: "",
//     quantity: "",
//     qty_unit: "",
//     stages: [
//       {
//         id: "",
//         name: "",
//         description: "",
//         status: "",
//         assigned_to: "",
//       },
//     ],
//     remarks: "",
//   });

//   const [stages, setStages] = useState([
//     {
//       id: "",
//       name: "",
//       description: "",
//       status: "",
//       assigned_to: "",
//     },
//   ]);

//   const [showAddStages, setShowAddStages] = useState(false);

//   const handleItemDetailsChange = (
//     index: number,
//     field: keyof ItemDetail,
//     value: string
//   ) => {
//     setItemDetails((prev) =>
//       prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
//     );
//   };

//   const handleNewItemDetails = (field: keyof ItemDetail, value: string) => {
//     setNewItemDetails((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Add mode → push new item once
//     if (index === undefined) {
//       setItemDetails((prev) => [...prev, newItemDetails]);
//     }

//     // setShowAddItemModal(false);
//   };

//   useEffect(() => {
//     if (typeof index != "number") {
//       setNewItemDetails({
//         product_id: "",
//         size: "",
//         size_unit: "",
//         colour: "",
//         quantity: "",
//         qty_unit: "",
//         stages: [
//           {
//             id: "",
//             name: "",
//             description: "",
//             status: "",
//             assigned_to: "",
//           },
//         ],
//         remarks: "",
//       });
//     }
//   }, [addItemClick]);

//   useEffect(() => {
//     const fetchStages = async () => {
//       let res = await jobStageApi();
//       console.log({ res });
//       if (res && res.data && res.data.stages) {
//         setStages(res.data.stages);
//       } else {
//         setStages([]);
//       }
//     };
//     fetchStages();
//   }, []);

//   return (
//     <div className="relative p-4 w-full max-w-md max-h-full">
//       {!showAddStages ? (
//         <div className="relative rounded-xl dark:bg-gray-800 border border-gray-500 rounded-base shadow-sm p-4 md:p-6">
//           <div className="flex items-center justify-between border-b border-gray-500 border-default pb-4 md:pb-5">
//             <h3 className="text-lg font-medium text-heading">
//               Create new product
//             </h3>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowAddItemModal(false);
//               }}
//               className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
//             >
//               <XIcon size={20} />
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>

//           {/* //? FORM */}
//           <form>
//             <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
//               {/* //? Name */}
//               <div className="col-span-2">
//                 <label
//                   htmlFor="name"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Item Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={
//                     typeof index === "number"
//                       ? itemDetails[index]?.product_id ?? ""
//                       : newItemDetails.product_id
//                   }
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(
//                         index,
//                         "product_id",
//                         e.target.value
//                       );
//                     } else {
//                       handleNewItemDetails("product_id", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   placeholder="Type product name"
//                   required
//                 />
//               </div>

//               {/* //? Size */}
//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="size"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Size
//                 </label>
//                 <input
//                   id="size"
//                   placeholder="Enter size"
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(index, "size", e.target.value);
//                     } else {
//                       handleNewItemDetails("size", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//               </div>

//               {/* //? Size Unit */}
//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="unit"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Unit
//                 </label>
//                 <select
//                   id="size_unit"
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(
//                         index,
//                         "size_unit",
//                         e.target.value
//                       );
//                     } else {
//                       handleNewItemDetails("size_unit", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 >
//                   <option value="">Select Unit</option>
//                   <option value="centimeter">cm</option>
//                   <option value="meter">m</option>
//                   <option value="inch">In</option>
//                 </select>
//               </div>

//               {/* //? Quantity */}
//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="size"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Quantity
//                 </label>
//                 <input
//                   id="size"
//                   placeholder="Enter quantity"
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(
//                         index,
//                         "quantity",
//                         e.target.value
//                       );
//                     } else {
//                       handleNewItemDetails("quantity", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 />
//               </div>

//               {/* //? Quantity Unit*/}
//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="unit"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Unit
//                 </label>
//                 <select
//                   id="unit"
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(
//                         index,
//                         "qty_unit",
//                         e.target.value
//                       );
//                     } else {
//                       handleNewItemDetails("qty_unit", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                 >
//                   <option value="">Select Unit</option>
//                   <option value="gram">Gram</option>
//                   <option value="kg">KiloGram</option>
//                   <option value="tonne">Tonne</option>
//                 </select>
//               </div>

//               {/* //? Colour */}
//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="unit"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Colour
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   value={
//                     typeof index === "number"
//                       ? itemDetails[index]?.colour ?? ""
//                       : newItemDetails.colour
//                   }
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(index, "colour", e.target.value);
//                     } else {
//                       handleNewItemDetails("colour", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   placeholder="Enter colour"
//                   required
//                 />
//               </div>

//               {/* //? Stage */}
//               <div className="col-span-2 sm:col-span-1">
//                 <label
//                   htmlFor="unit"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Stage
//                 </label>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowAddStages(true);
//                   }}
//                   className="w-full h-11 flex gap-2 justify-center items-center border rounded-lg border-primary-700 cursor-pointer"
//                 >
//                   <TreeStructureIcon
//                     size={25}
//                     color={iconSpecifications.colour}
//                     weight={iconSpecifications.weight as any}
//                   />
//                   <p className="text-primary-700">Select Stages</p>
//                 </button>
//               </div>

//               <div className="col-span-2">
//                 <label
//                   htmlFor="remarks"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Stages
//                 </label>
//                 <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[44px]">
//                   {itemStages.length > 1 ? (
//                     itemStages
//                       .filter((stage) => stage.id !== "")
//                       .map((stage) => (
//                         <span
//                           key={stage.id}
//                           className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded mr-2 mb-1 text-xs"
//                         >
//                           {stage.name}
//                         </span>
//                       ))
//                   ) : (
//                     <span className="text-gray-400 text-xs">
//                       No stages selected
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* //? Remarks */}
//               <div className="col-span-2">
//                 <label
//                   htmlFor="remarks"
//                   className="block mb-2.5 text-sm font-medium text-heading"
//                 >
//                   Remarks
//                 </label>
//                 <textarea
//                   id="remarks"
//                   rows={2}
//                   onChange={(e) => {
//                     if (typeof index === "number") {
//                       handleItemDetailsChange(index, "remarks", e.target.value);
//                     } else {
//                       handleNewItemDetails("remarks", e.target.value);
//                     }
//                   }}
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                   placeholder="Write product description here"
//                 ></textarea>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4 border-t border-gray-500 pt-4 md:pt-6">
//               <button
//                 type="submit"
//                 onClick={(e) => {
//                   handleSubmit(e);
//                   setNewItemDetails({
//                     product_id: "",
//                     size: "",
//                     size_unit: "",
//                     colour: "",
//                     quantity: "",
//                     qty_unit: "",
//                     stages: [
//                       {
//                         id: "",
//                         name: "",
//                         description: "",
//                         status: "",
//                         assigned_to: "",
//                       },
//                     ],
//                     remarks: "",
//                   });
//                 }}
//                 className="inline-flex gap-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
//               >
//                 <PlusIcon />
//                 Add More
//               </button>

//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleSubmit(e);
//                   setShowAddItemModal(false);
//                   if (typeof index === "number") {
//                     setItemDetails((prev) =>
//                       prev.map((item, i) =>
//                         i === index
//                           ? { ...item, stages: [...itemStages] }
//                           : item
//                       )
//                     );

//                     setItemStages([
//                       {
//                         id: "",
//                         name: "",
//                         description: "",
//                         status: "",
//                         assigned_to: "",
//                       },
//                     ]);
//                   }
//                 }}
//                 className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
//               >
//                 Done
//               </button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         //? <--- Select Stages --->
//         <div className="relative rounded-xl dark:bg-gray-800 border border-gray-500 rounded-base shadow-sm p-4 md:p-6">
//           <div className="flex items-center justify-between border-b border-gray-500 border-default mb-4 md:pb-5">
//             <h3 className="text-lg font-medium text-heading">Select Stages</h3>
//             <button
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowAddStages(false);
//               }}
//               className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
//             >
//               <XIcon size={20} />
//               <span className="sr-only">Close modal</span>
//             </button>
//           </div>
//           {stages.map((stage) => {
//             return (
//               <div key={stage.id} className="flex items-center mb-4">
//                 <input
//                   id="checkbox"
//                   type="checkbox"
//                   value={stage.id}
//                   onChange={() => {
//                     setItemStages((prevStages) => {
//                       // Check if this stage is already selected
//                       if (prevStages.some((s) => s.id === stage.id)) {
//                         // Uncheck: remove it from the array
//                         return prevStages.filter((s) => s.id !== stage.id);
//                       } else {
//                         // Check: add it to the array
//                         return [
//                           ...prevStages,
//                           {
//                             id: stage.id,
//                             name: stage.name,
//                             description: stage.description,
//                             status: "Not Started",
//                             assigned_to: "",
//                           },
//                         ];
//                       }
//                     });
//                   }}
//                   checked={itemStages.some((s) => s.id === stage.id)}
//                   className="w-4 h-4 border border-light rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
//                 />
//                 <label
//                   htmlFor="checkbox"
//                   className="select-none ms-2 text-sm font-medium text-fg-disabled"
//                 >
//                   {stage.name}
//                 </label>
//               </div>
//             );
//           })}
//           <div className="flex items-center justify-end space-x-4 border-t border-gray-500 pt-4 ">
//             <button
//               type="submit"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowAddStages(false);
//               }}
//               className="inline-flex gap-2 items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowAddStages(false);
//               }}
//               className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { XIcon, PlusIcon, TreeStructureIcon } from "@phosphor-icons/react";
import { jobStageApi } from "../services/job_stages_api";
import { iconSpecifications } from "../local_db/general_specifications";

type StageDetails = {
  id: string;
  name: string;
  description: string;
  status: string;
  assigned_to: string;
};

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

type AddProductModalType = {
  index?: number;
  addItemClick: boolean;
  itemDetails: ItemDetail[];
  setItemDetails: React.Dispatch<React.SetStateAction<ItemDetail[]>>;
  setShowAddItemModal: (value: boolean) => void;
};

const emptyStage: StageDetails = {
  id: "",
  name: "",
  description: "",
  status: "",
  assigned_to: "",
};

const emptyItem: ItemDetail = {
  product_id: "",
  size: "",
  size_unit: "",
  colour: "",
  quantity: "",
  qty_unit: "",
  stages: [],
  remarks: "",
};

export default function AddEditProductModal({
  index,
  addItemClick,
  itemDetails,
  setItemDetails,
  setShowAddItemModal,
}: AddProductModalType) {
  const [formData, setFormData] = useState<ItemDetail>(emptyItem);
  const [itemStages, setItemStages] = useState<StageDetails[]>([]);
  const [availableStages, setAvailableStages] = useState<StageDetails[]>([]);
  const [showAddStages, setShowAddStages] = useState(false);

  /* ---------------- Load data when modal opens ---------------- */
  useEffect(() => {
    if (typeof index === "number") {
      const item = itemDetails[index];
      setFormData(item);
      setItemStages(item.stages || []);
    } else {
      setFormData(emptyItem);
      setItemStages([]);
    }
  }, [index, addItemClick]);

  /* ---------------- Fetch stages ---------------- */
  useEffect(() => {
    const fetchStages = async () => {
      const res = await jobStageApi();
      setAvailableStages(res?.data?.stages || []);
    };
    fetchStages();
  }, []);

  /* ---------------- Handlers ---------------- */
  const updateField = (field: keyof ItemDetail, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (typeof index === "number") {
      // EDIT
      setItemDetails((prev) =>
        prev.map((item, i) =>
          i === index ? { ...formData, stages: itemStages } : item
        )
      );
    } else {
      // ADD
      setItemDetails((prev) => [...prev, { ...formData, stages: itemStages }]);
    }
    setShowAddItemModal(false);
  };

  /* ---------------- Render ---------------- */
  return (
    <div className="relative p-4 w-full max-w-md max-h-full">
      {!showAddStages ? (
        <div className="rounded-xl border border-gray-500 p-4">
          <div className="flex items-center justify-between border-b border-gray-500 border-default pb-4 md:pb-5">
            <h3 className="text-lg font-medium text-heading">
              Create new product
            </h3>
            <button
              className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
              onClick={() => setShowAddItemModal(false)}
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <input
              placeholder="Item Name"
              value={formData.product_id}
              onChange={(e) => updateField("product_id", e.target.value)}
              className="col-span-2 input"
            />

            <input
              placeholder="Size"
              value={formData.size}
              onChange={(e) => updateField("size", e.target.value)}
              className="input"
            />

            <select
              value={formData.size_unit}
              onChange={(e) => updateField("size_unit", e.target.value)}
              className="input"
            >
              <option value="">Unit</option>
              <option value="cm">cm</option>
              <option value="m">m</option>
            </select>

            <input
              placeholder="Quantity"
              value={formData.quantity}
              onChange={(e) => updateField("quantity", e.target.value)}
              className="input"
            />

            <select
              value={formData.qty_unit}
              onChange={(e) => updateField("qty_unit", e.target.value)}
              className="input"
            >
              <option value="">Unit</option>
              <option value="kg">Kg</option>
              <option value="ton">Ton</option>
            </select>

            <input
              placeholder="Colour"
              value={formData.colour}
              onChange={(e) => updateField("colour", e.target.value)}
              className="input"
            />

            {/* STAGES */}
            <div className="col-span-2">
              <button
                onClick={() => setShowAddStages(true)}
                className="w-full border rounded p-2 flex justify-center gap-2"
              >
                <TreeStructureIcon
                  size={22}
                  color={iconSpecifications.colour}
                />
                Select Stages
              </button>

              <div className="mt-2">
                {itemStages.length ? (
                  itemStages.map((s) => (
                    <span
                      key={s.id}
                      className="inline-block bg-primary-100 text-primary-700 px-2 py-1 rounded mr-2 text-xs"
                    >
                      {s.name}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">
                    No stages selected
                  </span>
                )}
              </div>
            </div>

            <textarea
              placeholder="Remarks"
              value={formData.remarks}
              onChange={(e) => updateField("remarks", e.target.value)}
              className="col-span-2 input"
            />
          </div>

          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              onClick={handleSave}
              className="bg-primary-700 text-white px-4 py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        /* STAGE SELECTOR */
        <div className="rounded-xl border border-gray-500 p-4">
          <h3 className="text-lg font-medium mb-3">Select Stages</h3>

          {availableStages.map((stage) => (
            <label key={stage.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={itemStages.some((s) => s.id === stage.id)}
                onChange={() => {
                  setItemStages((prev) =>
                    prev.some((s) => s.id === stage.id)
                      ? prev.filter((s) => s.id !== stage.id)
                      : [
                          ...prev,
                          {
                            ...stage,
                            status: "Not Started",
                            assigned_to: "",
                          },
                        ]
                  );
                }}
              />
              <span className="ml-2">{stage.name}</span>
            </label>
          ))}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setShowAddStages(false)}
              className="bg-primary-700 text-white px-4 py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
