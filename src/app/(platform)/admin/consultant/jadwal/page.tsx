"use client";

import React from "react";

import { Button } from "@/components/isomorphic/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  return (
    <form className="mx-auto w-full max-w-md space-y-4 p-4">
      <div>
        <label htmlFor="date">Tanggal</label>
        <Input type="date" id="date" name="date" />
      </div>

      <div>
        <label htmlFor="time">Waktu</label>
        <Input type="time" id="time" name="time" />
      </div>

      <div>
        <label htmlFor="description">Deskripsi</label>
        <Input type="text" id="description" name="description" />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
