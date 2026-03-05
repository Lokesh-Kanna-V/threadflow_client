"use client";

//? React & Next Imports
import { useEffect } from "react";

//? UI NPM Imports
import { X, Check, Info } from "lucide-react";

type AlertType = "success" | "error" | "info" | "warning";

type AlertBannerProps = {
  type: AlertType;
  message: string;
  onClose: () => void;
  durationMs?: number;
};

export default function AlertBanner({
  type,
  message,
  onClose,
  durationMs = 5000,
}: AlertBannerProps) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [message, durationMs, onClose]);

  if (!message) {
    return null;
  }

  let bgClass = "bg-gray-50 border-gray-200 text-gray-800";
  let icon = <Info className="w-4 h-4 text-gray-500" />;

  if (type === "success") {
    bgClass = "bg-emerald-50 border-emerald-200 text-emerald-900";
    icon = <Check className="w-4 h-4 text-emerald-600" />;
  } else if (type === "error") {
    bgClass = "bg-red-50 border-red-200 text-red-900";
    icon = <X className="w-4 h-4 text-red-600" />;
  } else if (type === "warning") {
    bgClass = "bg-amber-50 border-amber-200 text-amber-900";
    icon = <Info className="w-4 h-4 text-amber-600" />;
  }

  return (
    <div
      className={`flex items-start gap-2 px-3 py-2 rounded-lg border text-xs md:text-sm shadow-sm ${bgClass}`}
    >
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 leading-snug">{message}</div>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 inline-flex items-center justify-center rounded-full p-1 hover:bg-black/5 focus:outline-none"
        aria-label="Close alert"
      >
        <X className="w-3 h-3 opacity-60" />
      </button>
    </div>
  );
}

