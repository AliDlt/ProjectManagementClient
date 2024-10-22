import AddNewCategory from "../components/ui/category/AddNewCategory";
import useAddCategory from "../hooks/Categories/useAddCategory";

function AddNewProjectCategory() {
  const { addCategorError, addCategorLoading, addCategoryFn } =
    useAddCategory();

  //  Add Category Handler
  const addCategoryHandler = async (values) => {
    console.log(values);
    try {
      await addCategoryFn({ ...values, type: "project" });
    } catch (error) {}
  };

  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col">
      <AddNewCategory
        addCategoryHandler={addCategoryHandler}
        loading={addCategorLoading}
      />
    </section>
  );
}

export default AddNewProjectCategory;
