import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...classNames) {
  return twMerge(clsx(classNames));
}

export default cn;
