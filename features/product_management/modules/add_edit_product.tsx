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
import { UpdateProductAPI } from "../services/update_product_api";
import { getProductsApi } from "@/shared/services/get_products_api";

type AddEditProductTypes = {
  editProductId: string | null;
  setShowCreateProduct: (value: boolean) => void;
  setEditProductId: (value: string | null) => void;
  setRefreshTrigger?: (fn: (prev: number) => number) => void;
};

export default function AddEditProduct({
  editProductId,
  setShowCreateProduct,
  setEditProductId,
  setRefreshTrigger,
}: AddEditProductTypes) {
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

  const createProduct = async () => {
    let company_id = localStorage.getItem("cid");
    const response = await CreateProductAPI({
      product_detials: productDetails ?? undefined,
    });
    if (response.success) {
      setShowCreateProduct(false);
      setProductDetails({
        company_id: "",
        name: "",
        description: "",
        sku: "",
        hsn_code: "",
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const updateProduct = async () => {
    if (!editProductId) return;
    const response = await UpdateProductAPI({
      id: editProductId,
      name: productDetails.name,
      description: productDetails.description,
      sku: productDetails.sku,
      hsn_code: productDetails.hsn_code,
    });
    if (response.success) {
      setShowCreateProduct(false);
      setEditProductId(null);
      setProductDetails({
        company_id: "",
        name: "",
        description: "",
        sku: "",
        hsn_code: "",
      });
      if (setRefreshTrigger) {
        setRefreshTrigger((prev) => prev + 1);
      }
    }
  };

  const handleCancel = () => {
    setShowCreateProduct(false);
    setEditProductId(null);
    setProductDetails({
      company_id: "",
      name: "",
      description: "",
      sku: "",
      hsn_code: "",
    });
  };

  useEffect(() => {
    let company_id = localStorage.getItem("cid");
    handleProductDetailsChange("company_id", company_id || "");

    if (editProductId) {
      const fetchProduct = async () => {
        const company_id = localStorage.getItem("cid");
        if (company_id) {
          const response = await getProductsApi({ company_id });
          if (response.success && response.data?.data) {
            const product = response.data.data.find(
              (p: any) => p.id === editProductId
            );
            if (product) {
              setProductDetails({
                company_id: product.company_id || company_id || "",
                name: product.name || "",
                description: product.description || "",
                sku: product.sku || "",
                hsn_code: product.hsn_code || "",
              });
            }
          }
        }
      };
      fetchProduct();
    }
  }, [user, editProductId]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {editProductId ? "Edit product" : "Add a new product"}
        </h2>
        <form action="#">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={productDetails.name}
                onChange={(e) => {
                  handleProductDetailsChange("name", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
              <input
                type="text"
                name="sku"
                id="sku"
                value={productDetails.sku}
                onChange={(e) => {
                  handleProductDetailsChange("sku", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter SKU"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">HSN Code</label>
              <input
                type="text"
                name="hsn_code"
                id="hsn_code"
                value={productDetails.hsn_code}
                onChange={(e) => {
                  handleProductDetailsChange("hsn_code", e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Enter HSN Code"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea
                id="description"
                rows={4}
                value={productDetails.description}
                onChange={(e) => {
                  handleProductDetailsChange("description", e.target.value);
                }}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              <PlusIcon />
              Cancel
            </button>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (editProductId) {
                  updateProduct();
                } else {
                  createProduct();
                }
              }}
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
            >
              {editProductId ? "Update Product" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
