"use client";

//? UI imports
import SearchInput from "@/shared/ui/search_input";

//? NPM UI Imports
import { PlusIcon } from "@phosphor-icons/react";

//? Specification Imports
import { iconSpecifications } from "@/shared/local_db/general_specifications";

type SearchCreateTypes = {
  setShowCreateOrder: (value: boolean) => void;
};

export default function SearchAndCreate({
  setShowCreateOrder,
}: SearchCreateTypes) {
  return (
    <div className="w-full mb-5 lg:mb-10 flex justify-between items-center">
      <SearchInput />
      <div>
        <button
          data-tooltip-target="tooltip-default"
          onClick={(e) => {
            e.preventDefault();
            setShowCreateOrder(true);
          }}
          className="border rounded-lg border-primary-700 cursor-pointer"
        >
          <PlusIcon
            size={35}
            color={iconSpecifications.colour}
            weight={iconSpecifications.weight as any}
          />
        </button>

        <div
          id="tooltip-default"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-dark rounded-base shadow-xs opacity-0 tooltip"
        >
          Tooltip content
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
}
