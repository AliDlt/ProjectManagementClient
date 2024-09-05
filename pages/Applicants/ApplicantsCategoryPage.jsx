import React, { useState } from "react";
import CategoryCard from "../../components/ui/Applicants/CategoryCard";
import MetaTag from "../../components/modules/MetaTag";
import CustomInput from "../../components/modules/CustomInput";
import CustomButton from "../../components/modules/CustomButton";
import { GrSearch } from "react-icons/gr";

const ApplicantsCategoryPage = () => {
    const categories = [
        { id: 1, name: "دسته بندی ۱", description: "نتالغعبفغتقیفبنعلهاتمخکمندتمذانرلتزافبغعلهاهمتندتذنارتنذتدن" },
        { id: 2, name: "دسته بندی ۲", description: "نتالغعبفغتقیفبنعلهاتمخکمندتمذانرلتزافبغعلهاهمتندتذنارتنذتدن" },
        { id: 3, name: "دسته بندی ۳", description: "نتالغعبفغتقیفبنعلهاتمخکمندتمذانرلتزافبغعلهاهمتندتذنارتنذتدن" },
    ];

    const handleEdit = (id) => {
        console.log("Editing category", id);
    };

    const handleShow = (id) => {
        console.log("Showing category", id);
    };
    const [applicantSearchValue, setApplicantSearchValue] = useState("");

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <h1 className="text-2xl w-full text-center py-4">
                دسته بندی متقاضیان
            </h1>
            <CustomInput
                className="hidden py-1 rounded-custom w-72 ml-auto md:flex mt-5"
                placeholder="جستجو"
                value={applicantSearchValue}
                onChange={(e) => { setApplicantSearchValue(e.target.value) }}
                icon={
                    <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
                }
            />
            <CustomButton onClick={() => navigate("new-category")}>
                ایجاد دسته بندی جدید
            </CustomButton>
            {/* Cards Container */}
            <div className="container mx-auto p-4 flex gap-5 bg-yellow-500">
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        description={category.description}
                        onEdit={() => handleEdit(category.id)}
                        onShow={() => handleShow(category.id)}
                    />
                ))}
                <MetaTag title={"متقاضیان"} description="متقاضیان" />
            </div>
        </div>
    );
};

export default ApplicantsCategoryPage;
