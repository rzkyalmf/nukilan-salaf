import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const style = tv({
  base: "block w-full rounded-lg font-normal transition duration-200 disabled:opacity-50",
  variants: {
    variant: {
      primary:
        "bg-gradient-to-br from-[#C2B59B] to-[#746C5B] text-white hover:from-[#b3a78e] hover:to-[#665f50] active:from-[#a49981] active:to-[#585245]",
      secondary:
        "border border-slate-200 bg-white text-slate-400 transition duration-500 hover:border-[#C2B59B] hover:text-[#746C5B] hover:shadow-sm",
      danger: "border-rose-500 bg-rose-500 text-rose-100 hover:bg-rose-600 active:bg-rose-700 active:text-rose-50",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-[13px]",
      lg: "px-5 py-3 text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type TButton = VariantProps<typeof style>;
interface Props extends TButton, React.ComponentPropsWithRef<"button"> {}

export const Button = (props: Props) => {
  return (
    <button {...props} className={twMerge(style({ ...props }), props.className)}>
      {props.children}
    </button>
  );
};
