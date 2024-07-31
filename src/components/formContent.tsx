"use client";

import React from "react";

import { Button } from "./isomorphic/button";
import { Input } from "./isomorphic/input";
import { Textarea } from "./isomorphic/textarea";

export const FormContent: React.FC = () => {
  return (
    <div className="gradient-ns m-32 max-w-7xl rounded-xl border p-8">
      <h2 className="gradient-ns font-philosopher text-center text-3xl font-medium tracking-normal">Nukilan Salaf</h2>
      <p className="mb-6 text-center text-sm font-light tracking-normal text-gray-400">Masukan konten nukilan dibawah !</p>

      <form className="space-y-4">
        <div>
          <label className="gradient-ns block text-sm font-light">Judul Konten :</label>
          <Input name="content" className="px-28 py-2" />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Orang Yang Berkata :</label>
          <Input className="px-18 py-2" />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Isi Konten Nukilan :</label>
          <Textarea className="px-18 py-2" />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Sumber Nukilan :</label>
          <Input className="px-18 py-2" />
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
