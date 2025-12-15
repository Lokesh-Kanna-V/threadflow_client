"use client";

export default function OrderListDisplay() {
  return (
    <div>
      {/* //? <--- List ---> */}
      <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        <button className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4">
          <div className="mb-3">
            <p className="text-sm italic text-left">Order-102039</p>
            <p className="text-xl text-left">
              Customer: <span className="font-bold">Louis Vitton</span>
            </p>
            <hr className="text-gray-400"></hr>
          </div>
          <div className="mb-2">
            <p className="text-sm italic text-left">Order Items: 5</p>
            <p className="text-sm italic text-left">Total Order Qty: 500 Kg</p>
            <p className="text-sm italic text-left">Due Date: 15/01/2026</p>
          </div>
          <p className="text-md text-left">
            Status: <span className="text-green-600">On-Schedule</span>
          </p>
        </button>
      </div>
    </div>
  );
}
