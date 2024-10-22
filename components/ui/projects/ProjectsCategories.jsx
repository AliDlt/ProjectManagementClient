import React from "react";
import Categories from "../category/Categories";
import CustomModal from "../../modules/CustomModal";

function ProjectsCategories({
  isCategoriesModalOpen,
  setIsCategoriesModalOpen,
}) {
  // Select Category Handler
  const selectCategoryHandler = (category) => {
    console.log(category);
  };

  return (
    <CustomModal
      open={isCategoriesModalOpen}
      onCancel={() => setIsCategoriesModalOpen(false)}
      title="انتخاب دسته بندی"
    >
      <Categories sectionType="project" selectHandler={selectCategoryHandler} />
    </CustomModal>
  );
}

export default ProjectsCategories;
