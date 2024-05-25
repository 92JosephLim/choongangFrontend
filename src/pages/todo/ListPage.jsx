import ListGocampingComponent from "../../components/todo/ListGocampingComponent";
import BasicLayout from "../../layouts/BasicLayout";

const ListPage = () => {
  return (
    <div className="p-4 w-full">
      <div className="text-3xl font-extrabold"></div>

      <BasicLayout>
        <ListGocampingComponent />
      </BasicLayout>
    </div>
  );
};

export default ListPage;
