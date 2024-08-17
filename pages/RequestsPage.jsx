import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { requestSchema } from "../yup/yup";
import RequestForm from "../components/modules/RequestForm";

function RequestsPage() {
  const formData = useForm({
    mode: "onChange",
    resolver: yupResolver(requestSchema),
  });
  const { getValues, watch } = formData;

  return (
    <div className="container-grid ">
      <div className="lg:col-span-full">
        <h3 className="text-24 mb-6  ">درخواست ها</h3>
        <section className="flex flex-col gap-4">
          <RequestForm formData={formData} />
        </section>
      </div>
    </div>
  );
}

export default RequestsPage;
