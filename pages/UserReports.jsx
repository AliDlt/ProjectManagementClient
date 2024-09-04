import React from "react";
import useUserReports from "../hooks/Report/useUserReports";
import { useParams } from "react-router-dom";
import CustomLoading from "../components/modules/CustomLoading";

const UserReports = () => {
  const { id } = useParams();
  const { data, error, isPending } = useUserReports(id);
  console.log(data)
  if (isPending) {
    return (
      <div className="container-grid">
        <div className="col-span-1 lg:col-span-11">
          <CustomLoading />
        </div>
      </div>
    );
  }
  return <div className="container-grid"></div>;
};

export default UserReports;
