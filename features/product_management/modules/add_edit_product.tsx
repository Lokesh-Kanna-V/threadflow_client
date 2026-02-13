"use client";

//? React & Next Imports
import { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";

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

//? Service Imports
// import { CreateProductApi } from "../services/create_Product_api";
// import { GetCustomersAPI } from "../services/get_customer_list_api";
import { CreateProductAPI } from "../services/create_product_api";

export default function AddEditProduct() {
  const { user } = useAuth();

  const [productDetails, setProductDetails] = useState({
    company_id: "",
    name: "",
    description: "",
    sku: "",
    hsn_code: "",
  });


  const handleProductDetailsChange = (field: string, value: string) => {
    setProductDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createProduct = () => {
    let company_id = localStorage.getItem("cid");
    CreateProductAPI({ product_detials: productDetails ?? undefined });
  }


  useEffect(() => {
    let company_id = localStorage.getItem("cid");
    handleProductDetailsChange("company_id", company_id || "");
    if (company_id) {
      const GetCustomersList = async () => {
        // let res = await GetCustomersAPI({ company_id });
        // setCustomerList(res.data.data);
      };
      GetCustomersList();
    }
  }, [user]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
              <input type="text" name="name" id="name"
                onChange={(e) => { handleProductDetailsChange("name", e.target.value) }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
              <input type="text" name="sku" id="sku"
                onChange={(e) => { handleProductDetailsChange("sku", e.target.value) }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter SKU" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HSN Code</label>
              <input type="text" name="name" id="name"
                onChange={(e) => { handleProductDetailsChange("hsn_code", e.target.value) }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter HSN Code" required />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea
                id="description"
                rows={4}
                onChange={(e) => { handleProductDetailsChange("description", e.target.value) }}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              <PlusIcon />
              Cancel
            </button>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                console.log({ productDetails });
                createProduct()
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
