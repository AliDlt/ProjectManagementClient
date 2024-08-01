import React from "react";
import cn from "../../utils/cn";

function StatusBadge({ status = false,className }) {
  return (
    <span
      className={cn([
        "bg-red-400/70 w-[70px] py-1 rounded-lg ring-1 ring-red-600 text-center  text-16",
        status && "bg-green-500/60 ring-green-500 text-green-900", className
      ])}
    >
      <span className={cn(["text-red-900 ", status && " text-green-900"])}>
        {status ? "فعال" : "غیر فعال"}
      </span>
    </span>
  );
}

export default StatusBadge;
