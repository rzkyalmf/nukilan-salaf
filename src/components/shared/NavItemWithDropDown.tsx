"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface ISimpleNavItem {
  label: string;
  href: string;
}

export interface INavItemWithChildren {
  label: string;
  children?: ISimpleNavItem[];
}

export const NavItemWithDropdown: React.FC<{ item: INavItemWithChildren }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 70);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="group flex items-center px-2 py-1 text-white focus:outline-none">
        {item.label}
        {item.children && <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />}
        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#C2B59B] transition-all duration-300 ease-out group-hover:w-full" />
      </button>

      {item.children && isOpen && (
        <div
          className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-col py-1">
            {item.children.map((child) => (
              <Link key={child.href} href={child.href} className="px-4 py-2 text-gray-700 hover:bg-gray-100">
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
