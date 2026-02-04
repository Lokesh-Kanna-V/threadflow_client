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
              setShowCreateProduct(false);
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
          {!showCreateProduct ? "Product List" : "Create Product"}
        </h1>
      </div>

      {!showCreateProduct ? (
        <>
          <SearchAndCreate setShowCreateOrder={setShowCreateProduct} />
          {<ProductListDisplay />}
        </>
      ) : (
        <>
          <AddEditProduct />
        </>
      )}
    </main>
  );
}
