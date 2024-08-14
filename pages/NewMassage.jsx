import React from "react";

const NewMassage = () => {
  return (
    <>
      <section className="mt-10">
        <div className="flex items-center gap-x-10 justify-between">
          <p className="text-16 whitespace-nowrap">لیست کاربران</p>
          <CustomInput
            placeholder={"جستجو"}
            className={"px-3 py-1 text-14"}
            icon={
              <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
            }
          />
        </div>
      </section>
      <SendMessage />
    </>
  );
};

export default NewMassage;
