"use client";

//? React imports
import { useState } from "react";

//? Module Imports
import OrderTrackingListDisplay from "@/features/order_tracking/modules/order_tracking_list_display";
import OrderTrackingDetails from "@/features/order_tracking/modules/order_tracking_details";

//? NPM UI Imports
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

export default function OrderTrackingUI() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBack = () => {
    setSelectedOrderId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      <div
        className={`flex ${
          selectedOrderId ? "justify-between" : "justify-center"
        } items-baseline`}
      >
        {selectedOrderId ? (
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
          {selectedOrderId ? "Order Details" : "Order Tracking"}
        </h1>
      </div>

      {!selectedOrderId ? (
        <OrderTrackingListDisplay
          refreshTrigger={refreshTrigger}
          onSelectOrder={(orderId) => setSelectedOrderId(orderId)}
        />
      ) : (
        <OrderTrackingDetails woId={selectedOrderId} />
      )}
    </main>
  );
}

