"use client";

import { Files, UserRoundCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import Logo from "@/public/images/Logo.png";

import { Button } from "./isomorphic/button";
import { Input } from "./isomorphic/input";
import { Textarea } from "./isomorphic/textarea";

export const FormContent: React.FC = () => {
  const [konten, setKonten] = useState({
    title: "",
    author: "",
    content: "",
    source: "",
  });

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setKonten({ ...konten, [name]: value });
  };

  return (
    <div className="mx-72 my-32 flex items-center justify-center">
      <form className="mx-auto w-[400px] space-y-4 rounded-xl border p-8 shadow-[#C2B59B] transition duration-1000 hover:shadow-md">
        <div>
          <h2 className="gradient-ns font-philosopher text-center font-medium tracking-tight">Nukilan Salaf</h2>
          <p className="mb-6 text-center text-sm font-light tracking-normal text-gray-400">Masukan konten nukilan dibawah !</p>
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Judul Konten :</label>
          <Input name="title" onChange={handleEventChange} />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Orang Yang Berkata : </label>
          <Input name="author" onChange={handleEventChange} />
        </div>

        <div className="">
          <label className="gradient-ns text-sm font-light">Isi Konten Nukilan :</label>
          <Textarea name="content" onChange={handleEventChange} className="h-32" />
        </div>

        <div>
          <label className="gradient-ns text-sm font-light">Sumber Nukilan :</label>
          <Input name="source" onChange={handleEventChange} />
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

      <div className="flex min-h-[700px] w-[560px] flex-col items-center justify-between rounded-xl border bg-[#262626] px-16 py-8 text-center text-white shadow-[#C2B59B] transition duration-1000 hover:rotate-1 hover:shadow-lg">
        <Image src={Logo} alt="logo" className="mb-8 w-16" priority={true} width={100} height={100} />

        <div className="flex flex-grow flex-col justify-center pb-3">
          <h1 className="gradient-ns font-philosopher mb-8 text-6xl"> {konten.title} </h1>

          {konten.author && (
            <h6 className="flex items-center justify-center gap-2 text-[12px] font-extralight text-gray-300">
              <UserRoundCheck className="ml-1 h-5 w-5" />
              {konten.author}
            </h6>
          )}

          <h3 className="my-2 font-light"> {konten.content} </h3>
          {konten.source && (
            <h6 className="flex items-center justify-center gap-2 text-[12px] font-extralight text-gray-300">
              <Files className="ml-1 h-5 w-5" />
              {konten.source}
            </h6>
          )}
        </div>

        <h6 className="font-thin -tracking-tight">@nukilansalaf</h6>
      </div>
    </div>
  );
};
