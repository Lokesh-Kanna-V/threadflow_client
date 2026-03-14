"use client";

//? React & Next Imports
import { useState, useEffect } from "react";

//? Service Imports
import { GetCompanyByIdAPI } from "../services/get_company_by_id_api";
import { UpdateCompanyAPI } from "../services/update_company_api";

//? Shared UI Imports
import ListLoader from "@/shared/ui/list_loader";
import AlertBanner from "@/shared/ui/alert_banner";

type CompanyDetailsFormProps = {
  companyId: string | null;
  setAlert?: (value: { status: string; message: string }) => void;
};

export default function CompanyDetailsForm({
  companyId,
  setAlert: setParentAlert,
}: CompanyDetailsFormProps) {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    gst: "",
    logo_url: "",
    type: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
  });
  const [companyIdState, setCompanyIdState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ status: "", message: "" });

  const handleChange = (field: string, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (!companyId) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await GetCompanyByIdAPI({ id: companyId });
        if (res.success && res.data?.data) {
          const d = res.data.data as Record<string, unknown>;
          setDetails({
            name: (d.name as string) ?? "",
            email: (d.email as string) ?? "",
            phone: (d.phone as string) ?? "",
            gst: (d.gst as string) ?? "",
            logo_url: (d.logo_url as string) ?? "",
            type: (d.type as string) ?? "",
            address_line_1: (d.address_line_1 as string) ?? "",
            address_line_2: (d.address_line_2 as string) ?? "",
            city: (d.city as string) ?? "",
            state: (d.state as string) ?? "",
          });
          setCompanyIdState((d.id as string) ?? null);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [companyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId || !companyIdState) return;
    setSaving(true);
    const msg = { status: "", message: "" };
    try {
      const res = await UpdateCompanyAPI({
        id: companyIdState,
        name: details.name,
        email: details.email,
        phone: details.phone,
        gst: details.gst,
        logo_url: details.logo_url,
        type: details.type,
        address_line_1: details.address_line_1,
        address_line_2: details.address_line_2,
        city: details.city,
        state: details.state,
      });
      if (res.success) {
        msg.status = "success";
        msg.message = "Company details updated successfully.";
      } else {
        msg.status = "error";
        msg.message = res.error || "Failed to update company details.";
      }
    } catch {
      msg.status = "error";
      msg.message = "Failed to update company details.";
    }
    setSaving(false);
    if (msg.status) {
      if (setParentAlert) setParentAlert(msg);
      else setAlert(msg);
    }
  };

  if (!companyId) {
    return (
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
        No company selected. Please log in with a company account.
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        {alert.status && (
          <div className="mb-4">
            <AlertBanner
              type={alert.status === "error" ? "error" : "success"}
              message={alert.message}
              onClose={() => setAlert({ status: "", message: "" })}
            />
          </div>
        )}
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Company Details
        </h2>
        {loading ? (
          <ListLoader text="Loading company..." />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={details.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Company name"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={details.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={details.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Phone"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="gst"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  GST
                </label>
                <input
                  type="text"
                  name="gst"
                  id="gst"
                  value={details.gst}
                  onChange={(e) => handleChange("gst", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="GST number"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="logo_url"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Logo URL
                </label>
                <input
                  type="text"
                  name="logo_url"
                  id="logo_url"
                  value={details.logo_url}
                  onChange={(e) => handleChange("logo_url", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Logo URL"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="type"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  id="type"
                  value={details.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Company type"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address_line_1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="address_line_1"
                  id="address_line_1"
                  value={details.address_line_1}
                  onChange={(e) => handleChange("address_line_1", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Address line 1"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address_line_2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address Line 2
                </label>
                <input
                  type="text"
                  name="address_line_2"
                  id="address_line_2"
                  value={details.address_line_2}
                  onChange={(e) => handleChange("address_line_2", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Address line 2"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={details.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="City"
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={details.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Details"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
