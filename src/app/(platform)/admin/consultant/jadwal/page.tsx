import React from "react";

import { Input } from "@/components/isomorphic/input";

export default function Page() {
  return (
    <div>
      <Input type="date" />
      <Input type="time" />
    </div>
  );
}
