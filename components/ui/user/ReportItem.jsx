import React from "react";

const ReportItem = ({ title, report }) => {
  return (
    <div className="	 flex flex-col gap-2 rounded-custom  p-3 border-2  border-custom-primary-color">
      <h5 className="font-bold">{title}</h5>
      <p className="line-clamp-2  text text-12 text-wrap">{report}</p>
    </div>
  );
};

export default ReportItem;
