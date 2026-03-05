"use client";

//? React & Next Imports
import { useParams } from "next/navigation";

//? UI Imports
import CustomerTrackingUI from "@/features/order_tracking/ui/customer_tracking_ui";

export default function TrackingPage() {
  const params = useParams<{ wo_id: string }>();
  const woId = params.wo_id;

  return (
    <div>
      <CustomerTrackingUI woId={woId} />
    </div>
  );
}

