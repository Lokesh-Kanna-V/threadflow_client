"use client";

//? React & Next Imports
import { useState } from "react";

//? Module Imports
import CompanyDetailsForm from "../modules/company_details_form";

//? Shared UI Imports
import AlertBanner from "@/shared/ui/alert_banner";

export default function CompanyDetailsUI() {
  const [alert, setAlert] = useState({ status: "", message: "" });
  const companyId =
    typeof window !== "undefined" ? localStorage.getItem("cid") : null;

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
      <h1 className="text-2xl text-center font-bold md:text-3xl border-b border-dashed border-gray-500 uppercase mb-5">
        Company Details
      </h1>
      <CompanyDetailsForm companyId={companyId} setAlert={setAlert} />
    </main>
  );
}
