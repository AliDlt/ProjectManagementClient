import Table from "antd/es/table";
import { useState } from "react";
import { Empty } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CustomLoading from "../../modules/CustomLoading";
import cn from "../../../utils/cn";

function UsersTable({
  users,
  loading,
  children,
  className,
  paginationClassName,
  emptyText,
  emptyClassName,
  ...rest
}) {
  const [current, setCurrent] = useState(1);

  const data = users?.map((user) => {
    const { name, surName, _id, ...rest } = user;
    return {
      fullName: `${name} ${surName}`,
      key: _id,
      ...rest,
    };
  });

  return (
    <Table
      className={className}
      dataSource={data}
      loading={{
        spinning: loading,
        indicator: <CustomLoading className="p-0 w-auto h-auto" />,
      }}
      locale={{
        emptyText: (
          <Empty
            description={emptyText || "کاربری وجود ندارد"}
            className={cn(["my-24", emptyClassName])}
          />
        ),
      }}
      pagination={{
        className: paginationClassName,
        position: ["bottomCenter"],
        current,
        onChange: (pageNum) => setCurrent(pageNum),
        pageSize: 5,
        hideOnSinglePage: true,
        showLessItems: true,
        prevIcon: () => (
          <FaAngleRight className="mt-2 text-custom-primary-color" />
        ),
        nextIcon: () => (
          <FaAngleLeft className="mt-2 text-custom-primary-color" />
        ),
      }}
      {...rest}
    >
      {children}
    </Table>
  );
}

export default UsersTable;
