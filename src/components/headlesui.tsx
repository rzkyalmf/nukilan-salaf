"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import React from "react";

export const HeadlesUI = () => {
  return (
    <div>
      <Popover className="relative">
        <PopoverButton>Solutions</PopoverButton>
        <PopoverPanel anchor="bottom" className="flex flex-col">
          <a href="/analytics">Analytics</a>
          <a href="/engagement">Engagement</a>
          <a href="/security">Security</a>
          <a href="/integrations">Integrations</a>
        </PopoverPanel>
      </Popover>
    </div>
  );
};
