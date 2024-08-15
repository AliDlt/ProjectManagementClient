import React from "react";
import CustomButton from "../../modules/CustomButton";
import { MdDelete } from "react-icons/md";

const TextMessage = () => {
  return (
    <div className="border-2  border-custom-primary-color rounded-custom rounded-br-none flex flex-col gap-6 bg-white p-4">
      <div className="flex  justify-between items-center">
        <h5>امیر سحر خیز</h5>
        <div>
          <CustomButton className="bg-white rounded-full text-custom-primary-color hover:text-white hover:bg-custom-primary-color border-custom-primary-color border-2 border-solid p-1 w-9 h-9">
            <MdDelete className="text-24" />
          </CustomButton>
        </div>
      </div>
      <p>
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
        از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و
        سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای
        متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
        درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با
        نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
        خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
      </p>
    </div>
  );
};

export default TextMessage;
