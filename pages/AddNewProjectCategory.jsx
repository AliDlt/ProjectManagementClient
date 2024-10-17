import AddNewCategory from "../components/ui/category/AddNewCategory";

function AddNewProjectCategory() {
  return (
    <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col">
      <AddNewCategory addCategoryHandler={(values) => console.log(values)} />
    </section>
  );
}

export default AddNewProjectCategory;
