"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const BasicShadcnForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="date">Tanggal</Label>
        <Input type="date" id="date" name="date" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Waktu</Label>
        <Input type="time" id="time" name="time" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea id="description" name="description" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Input type="text" id="description" name="description" />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
};

export default BasicShadcnForm;
