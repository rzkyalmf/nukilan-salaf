import React from "react";

import { FormContent } from "@/components/formContent";

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex-col items-center justify-center font-light text-gray-500">Page Dashboard</div>
      <FormContent />
    </div>
  );
}
