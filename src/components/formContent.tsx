"use client";

import React from "react";

import { Button } from "./isomorphic/button";
import { Input } from "./isomorphic/input";
import { Textarea } from "./isomorphic/textarea";

export const FormContent: React.FC = () => {
  return (
    <div className="m-32 mx-auto flex items-center justify-center">
      <form className="w-[400px] space-y-4 rounded-xl border p-8">
        <div>
          <h2 className="gradient-ns font-philosopher text-center text-3xl font-medium tracking-normal">Nukilan Salaf</h2>
          <p className="mb-6 text-center text-sm font-light tracking-normal text-gray-400">Masukan konten nukilan dibawah !</p>
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Judul Konten :</label>
          <Input className="" />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Orang Yang Berkata :</label>
          <Input className="" />
        </div>

        <div className="">
          <label className="gradient-ns text-sm font-light">Isi Konten Nukilan :</label>
          <Textarea className="h-32" />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Sumber Nukilan :</label>
          <Input className="" />
        </div>

        <div className="flex justify-end pt-3">
          <div className="flex gap-3">
            <Button variant="secondary" size="md">
              Cancel
            </Button>
            <Button variant="primary" size="md">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
