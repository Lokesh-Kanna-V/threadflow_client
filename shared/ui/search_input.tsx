"use client";

//? NPM UI Imports
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

//? Specificaiton Imports
import { iconSpecifications } from "../local_db/general_specifications";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  label = "Search",
}: SearchInputProps) {
  return (
    <div className="max-w-md w-full">
      <label
        htmlFor="search"
        className="block mb-2.5 text-sm font-medium text-heading sr-only"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="search"
          id="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block min-w-64 lg:min-w-96 p-3 ps-9 rounded-lg border border-gray-300 dark:border-gray-600 bg-emerald-100 dark:bg-gray-800 text-heading text-sm rounded-base shadow-xs placeholder:text-body focus:ring-primary-600 focus:border-primary-600"
          placeholder={placeholder}
        />
        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            size={iconSpecifications.size}
            color={iconSpecifications.colour}
            weight={iconSpecifications.weight as any}
          />
        </div>
      </div>
    </div>
  );
}
