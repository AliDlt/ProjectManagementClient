import AddNewCategory from "../components/ui/category/AddNewCategory";
import useAddCategory from "../hooks/Categories/useAddCategory";

function AddNewReportCategory() {
    const { mutate, isPending } = useAddCategory()
    const addCategory = (values) => {
        console.log(values)
        mutate({ ...values, type: 'report' }, { onError: (e) => console.log(e), onSuccess: (e) => console.log(e) })
    }
    return (
        <section className="px-5 lg:px-0 lg:col-span-9 2xl:col-span-10 flex flex-col">
            <AddNewCategory addCategoryHandler={addCategory} />
        </section>
    );
}

export default AddNewReportCategory;
