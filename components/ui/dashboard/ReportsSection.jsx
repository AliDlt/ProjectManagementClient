import React from "react";
import CustomButton from "../../modules/CustomButton";

function ReportsSection() {
  return (
    <div className="shadow-custom p-6 flex flex-col gap-5 rounded-custom border-b-4 border-r-4 border-custom-primary-color-300 lg:p-7">
      <h3 className="text-lg">گزارش ها</h3>
      <div className="flex flex-col gap-3">
        <ReportItem
          desc={
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
          }
          projectNumber={"1"}
          title={"متن گزارش: "}
        />
        <ReportItem
          desc={
            "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
          }
          projectNumber={"2"}
          title={"متن گزارش: "}
        />
        <ReportItem
          desc={"لسا مورد استفاده قرار گیرد."}
          projectNumber={"3"}
          title={"متن گزارش: "}
        />
      </div>
      <CustomButton className="self-end text-sm">همه گزارش ها</CustomButton>
    </div>
  );
}

export default ReportsSection;

// Reports Item
const ReportItem = ({ title, desc, projectNumber }) => {
  return (
    <div className="flex justify-center items-center px-2.5 py-3 border-2 border-custom-primary-color rounded-custom gap-3 lg:px-3 lg:py-4 xl:gap-10">
      <div className="flex items-center truncate">
        <span className="font-bold ml-2 xl:ml-10">پروژه {projectNumber}</span>
        <span className="font-bold xs:bg-red-400">{title}</span>
        <p className="text-sm truncate"> &nbsp; {desc}</p>
      </div>
      <CustomButton className="px-2 py-1 text-xs mr-auto mt-auto">
        مشاهده
      </CustomButton>
    </div>
  );
};
