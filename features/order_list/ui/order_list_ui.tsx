"use client";

//? React and Next imports
import { useState } from "react";

//? Module Imports
import SearchAndCreate from "../modules/search_and_create";
import OrderListDisplay from "../modules/order_list_display";
import AddEditOrder from "../modules/add_edit_order";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? NPM UI Imports
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";

export default function OrderListUI() {
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [editOrderId, setEditOrderId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBack = () => {
    setShowCreateOrder(false);
    setEditOrderId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div
        className={`flex ${
          showCreateOrder ? "justify-between" : "justify-center"
        } items-baseline`}
      >
        {showCreateOrder ? (
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
          {!showCreateOrder
            ? "Order List"
            : editOrderId
            ? "Edit Order"
            : "Create Order"}
        </h1>
      </div>

      {!showCreateOrder ? (
        <>
          <SearchAndCreate setShowCreateOrder={setShowCreateOrder} />
          <OrderListDisplay
            setShowCreateOrder={setShowCreateOrder}
            setEditOrderId={setEditOrderId}
            refreshTrigger={refreshTrigger}
          />
        </>
      ) : (
        <>
          <AddEditOrder
            editOrderId={editOrderId}
            setShowCreateOrder={setShowCreateOrder}
            setEditOrderId={setEditOrderId}
            setRefreshTrigger={setRefreshTrigger}
          />
        </>
      )}
    </main>
  );
}
