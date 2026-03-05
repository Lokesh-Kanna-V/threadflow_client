"use client";

//? React and Next imports
import { useState } from "react";

//? Module Imports
import CustomerListDisplay from "../modules/customer_list_display";
import SearchAndCreate from "../modules/search_and_create";
import AddEditCustomer from "../modules/add_edit_customer";

//? Shared UI Imports
import AlertBanner from "@/shared/ui/alert_banner";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

//? NPM UI Imports
import { ArrowUUpLeftIcon } from "@phosphor-icons/react";

export default function CustomerManagementUI() {
  const [showCreateCustomer, setShowCreateCustomer] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [alert, setAlert] = useState({ status: "", message: "" });

  const handleBack = () => {
    setShowCreateCustomer(false);
    setEditCustomerId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="p-4 md:ml-64 h-auto pt-20">
      {alert.status && (
        <div className="mb-4">
          <AlertBanner
            type={alert.status === "error" ? "error" : "success"}
            message={alert.message}
            onClose={() => setAlert({ status: "", message: "" })}
          />
        </div>
      )}
      <div
        className={`flex ${
          showCreateCustomer ? "justify-between" : "justify-center"
        } items-baseline`}
      >
        {showCreateCustomer ? (
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
          {!showCreateCustomer
            ? "Customer List"
            : editCustomerId
            ? "Edit Customer"
            : "Create Customer"}
        </h1>
      </div>

      {!showCreateCustomer ? (
        <>
          <SearchAndCreate setShowCreateCustomer={setShowCreateCustomer} />
          <CustomerListDisplay
            setShowCreateCustomer={setShowCreateCustomer}
            setEditCustomerId={setEditCustomerId}
            refreshTrigger={refreshTrigger}
          />
        </>
      ) : (
        <>
          <AddEditCustomer
            editCustomerId={editCustomerId}
            setShowCreateCustomer={setShowCreateCustomer}
            setEditCustomerId={setEditCustomerId}
            setRefreshTrigger={setRefreshTrigger}
            setAlert={setAlert}
          />
        </>
      )}
    </main>
  );
}
