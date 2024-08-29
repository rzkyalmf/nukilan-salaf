import React from "react";

import { Card } from "@/components/isomorphic/card";
import { currencyFormat } from "@/libs/currency-format";

export default function Page() {
  return (
    <main className="space-y-4 py-12">
      <section className="space-y-1 px-4 sm:px-12">
        <h1 className="gradient-ns font-philosopher text-3xl font-bold tracking-tight sm:text-4xl">Analytics</h1>
        <h4 className="font-light tracking-normal text-gray-500">Here is all time analytics</h4>
      </section>
      <section className="grid grid-cols-3 gap-4 px-12 text-sm font-semibold tracking-normal text-gray-700 sm:text-base">
        <Card>
          <h2>{currencyFormat(100000000)}</h2>
          <p className="font-light tracking-normal text-gray-500">Current Revenues</p>
        </Card>
        <Card>
          <h2>200</h2>
          <p className="font-light tracking-normal text-gray-500">Total Users</p>
        </Card>
        <Card>
          <h2>20</h2>
          <p className="font-light tracking-normal text-gray-500">Total Schedules</p>
        </Card>
      </section>
    </main>
  );
}
