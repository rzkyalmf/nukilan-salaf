"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  base: "block w-full rounded-lg border border-slate-200 bg-white px-4 py-2 font-light text-gray-800 shadow-sm shadow-slate-100 transition duration-200 placeholder:font-normal focus:outline-none focus:ring-1 focus:ring-[#C2B59B]",
});

type TInput = VariantProps<typeof style>;
interface Props extends TInput, React.ComponentPropsWithRef<"input"> {}
interface SelectProps extends TInput, React.ComponentPropsWithRef<"select"> {}

export const Input = (props: Props) => {
  return <input {...props} className={twMerge(style({ ...props }), props.className)} />;
};

export const Select = (props: SelectProps) => {
  return (
    <select {...props} className={twMerge(style({ ...props }), props.className)}>
      {props.children}
    </select>
  );
};
