"use client";

//? NPM UI Imports
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

//? Specificaiton Imports
import { iconSpecifications } from "../local_db/general_specifications";

export default function SearchInput() {
  return (
    <form className="max-w-md">
      <label
        htmlFor="search"
        className="block mb-2.5 text-sm font-medium text-heading sr-only"
      >
        Search
      </label>
      <div className="relative">
        {/* <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none"></div> */}
        <input
          type="search"
          id="search"
          className="block min-w-64 lg:min-w-96 p-3 ps-9 rounded-lg border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 text-heading text-sm rounded-base shadow-xs placeholder:text-body"
          placeholder="Search"
          required
        />
        <button
          type="button"
          className="w-15 cursor-pointer flex justify-center absolute end-1.5 bottom-0.5 text-white hover:bg-brand-strong box-border border border-primary-700 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
        >
          <MagnifyingGlassIcon
            size={iconSpecifications.size}
            color={iconSpecifications.colour}
            weight={iconSpecifications.weight as any}
          />
        </button>
      </div>
    </form>
  );
}
