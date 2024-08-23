"use client";

import { ImageUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  slots: {
    base: "flex w-full items-center gap-2 overflow-hidden rounded-lg border border-slate-200 bg-white font-normal text-slate-600 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100",
    button:
      "flex gap-2.5 border-r bg-slate-50 px-3 py-2.5 font-normal text-gray-400 hover:text-slate-600 focus:ring-1 focus:ring-[#C2B59B]",
  },
});

type TFileInput = VariantProps<typeof style>;
interface Props extends TFileInput, React.ComponentPropsWithRef<"input"> {}

export const FileInput = (props: Props) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={style.slots.base}>
      <button type="button" className={style.slots.button} onClick={() => inputRef.current?.click()}>
        <ImageUp size={22} strokeWidth={1.4} /> Pilih Gambar
      </button>
      <input
        {...props}
        ref={inputRef}
        hidden
        type="file"
        onChange={(e) => {
          setFiles(e.target.files);
          props.onChange?.(e);
        }}
      />
      {files ? <div>Kamu telah menambahkan {files.length} file</div> : <div>{props.placeholder}</div>}
    </div>
  );
};
