"use client";

export default function ProductListDisplay() {
    return (
        <>
        <div className="flex gap-5 flex-wrap justify-center md:border border-dashed border-gray-500 p-5">
        
          
            <button className="block w-xs border rounded-lg shadow-xs border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 p-4 hover:cursor-pointer">
          <div className="mb-3">
            <p className="text-sm italic text-left">Prod-1001</p>
            <p className="text-xl text-left">
              Product: <span className="font-bold">11Kg Micro</span>
            </p>
            <hr className="text-gray-400"></hr>
          </div>
          <div className="mb-2">
            <p className="text-sm italic text-left">SKU: 501</p>
            <p className="text-sm italic text-left">HSN Code: 6090068</p>
          </div>
          <p className="text-md text-left">
            Status: <span className="text-green-600">Active</span>
          </p>
        </button>

      </div>
        </>
    )
}