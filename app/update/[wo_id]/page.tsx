"use client";

//? React & Next Imports
import { useParams } from "next/navigation";

//? UI Imports
import WorkerUpdateUI from "@/features/order_tracking/ui/worker_update_ui";

export default function UpdatePage() {
  const params = useParams<{ wo_id: string }>();
  const woId = params.wo_id;

  return (
    <div>
      <WorkerUpdateUI woId={woId} />
    </div>
  );
}

