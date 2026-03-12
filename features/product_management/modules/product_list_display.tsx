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

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";

type ProductListDisplayTypes = {
  setShowCreateProduct: (value: boolean) => void;
  setEditProductId: (value: string | null) => void;
  refreshTrigger?: number;
  searchText?: string;
};

export default function ProductListDisplay({
  setShowCreateProduct,
  setEditProductId,
  refreshTrigger,
  searchText,
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
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    const company_id = localStorage.getItem("cid");
    if (company_id) {
      const response = await getProductsApi({ company_id });
      if (response.success && response.data?.data) {
        setProductList(response.data.data);
      } else {
        setProductList([]);
      }
    } else {
      setProductList([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchProducts();
      } finally {
        setLoading(false);
      }
    };

    load();
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

  const filteredProductList = productList.filter((product) => {
    if (!searchText || !searchText.trim()) return true;
    const query = searchText.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      (product.sku || "").toLowerCase().includes(query) ||
      (product.hsn_code || "").toLowerCase().includes(query) ||
      (product.description || "").toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        {loading ? (
          <ListLoader text="Loading products..." />
        ) : productList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No products found.
          </p>
        ) : filteredProductList.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No products match your search.
          </p>
        ) : (
          filteredProductList.map((product, index) => (
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
                  className="rounded-lg border-primary-700 cursor-pointer p-1"
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
                  className="rounded-lg border-red-700 cursor-pointer p-1"
                >
                  <Trash
                    size={iconSpecifications.size}
                    color="#800000"
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
          ))
        )}
      </div>
    </div>
  );
}