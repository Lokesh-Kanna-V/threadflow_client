"use client";

//? React and Next imports
import { useState } from "react";

//? Module Imports
import ProductListDisplay from "../modules/product_list_display";
import SearchAndCreate from "../modules/search_and_create";
import AddEditProduct from "../modules/add_edit_product";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? NPM UI Imports
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";

export default function ProductManagementUI() {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBack = () => {
    setShowCreateProduct(false);
    setEditProductId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div
        className={`flex ${
          showCreateProduct ? "justify-between" : "justify-center"
        } items-baseline`}
      >
        {showCreateProduct ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleBack();
            }}
            className="border rounded-lg border-primary-700 cursor-pointer"
          >
            <ArrowUUpLeftIcon
              size={25}
              color={iconSpecifications.colour}
              weight={iconSpecifications.weight as any}
            />
          </button>
        ) : (
          <></>
        )}
        <h1 className="text-2xl text-center font-bold md:text-3xl border-b border-dashed border-gray-500 uppercase mb-5">
          {!showCreateProduct
            ? "Product List"
            : editProductId
            ? "Edit Product"
            : "Create Product"}
        </h1>
      </div>

      {!showCreateProduct ? (
        <>
          <SearchAndCreate setShowCreateOrder={setShowCreateProduct} />
          <ProductListDisplay
            setShowCreateProduct={setShowCreateProduct}
            setEditProductId={setEditProductId}
            refreshTrigger={refreshTrigger}
          />
        </>
      ) : (
        <>
          <AddEditProduct
            editProductId={editProductId}
            setShowCreateProduct={setShowCreateProduct}
            setEditProductId={setEditProductId}
            setRefreshTrigger={setRefreshTrigger}
          />
        </>
      )}
    </main>
  );
}
