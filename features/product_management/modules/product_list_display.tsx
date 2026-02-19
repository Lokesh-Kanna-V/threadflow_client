"use client";

//? React & Next Imports
import { useEffect, useState } from "react";

//? Service Imports
import { getProductsApi } from "@/shared/services/get_products_api";
import { DeleteProductAPI } from "../services/delete_product_api";

//? NPM UI Imports
import { PencilSimple, Trash } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

type ProductListDisplayTypes = {
  setShowCreateProduct: (value: boolean) => void;
  setEditProductId: (value: string | null) => void;
  refreshTrigger?: number;
};

export default function ProductListDisplay({
  setShowCreateProduct,
  setEditProductId,
  refreshTrigger,
}: ProductListDisplayTypes) {
  const [productList, setProductList] = useState<
    {
      id: string;
      name: string;
      sku?: string;
      hsn_code?: string;
      description?: string;
    }[]
  >([]);

  const fetchProducts = async () => {
    const company_id = localStorage.getItem("cid");
    if (company_id) {
      const response = await getProductsApi({ company_id });
      if (response.success && response.data?.data) {
        setProductList(response.data.data);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [refreshTrigger]);

  const handleEdit = (productId: string) => {
    setEditProductId(productId);
    setShowCreateProduct(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const response = await DeleteProductAPI({ id: productId });
      if (response.success) {
        fetchProducts();
      }
    }
  };

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {productList.map((product, index) => (
          <div
            key={product.id}
            className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 relative"
          >
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(product.id);
                }}
                className="border rounded-lg border-primary-700 cursor-pointer p-1"
              >
                <PencilSimple
                  size={iconSpecifications.size}
                  color={iconSpecifications.colour}
                  weight={iconSpecifications.weight as any}
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(product.id);
                }}
                className="border rounded-lg border-red-700 cursor-pointer p-1"
              >
                <Trash
                  size={iconSpecifications.size}
                  color={iconSpecifications.colour}
                  weight={iconSpecifications.weight as any}
                />
              </button>
            </div>
            <div className="mb-3">
              <p className="text-sm italic text-left">Prod-{index + 1}</p>
              <p className="text-xl text-left">
                Product: <span className="font-bold">{product.name}</span>
              </p>
              <hr className="text-gray-400"></hr>
            </div>
            <div className="mb-2">
              {product.sku && (
                <p className="text-sm italic text-left">SKU: {product.sku}</p>
              )}
              {product.hsn_code && (
                <p className="text-sm italic text-left">
                  HSN Code: {product.hsn_code}
                </p>
              )}
            </div>
            <p className="text-md text-left">
              Status: <span className="text-green-600">Active</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}