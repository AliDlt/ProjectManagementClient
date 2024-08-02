import Table from "antd/es/table";
import { useState } from "react";
import StatusBadge from "../../modules/StatusBadge";
import Column from "antd/es/table/Column";
import { Empty } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const dataSource = [
  {
    key: "1",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "2",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "3",
    name: "محمد کریم پور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "4",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "5",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "6",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "7",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "8",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "9",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "10",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "11",
    name: "محمد زمانپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "12",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "13",
    name: "محمد کریم پور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "14",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "15",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "16",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "17",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "18",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "19",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "20",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "21",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "22",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "23",
    name: "محمد کریم پور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "24",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "25",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "26",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
  {
    key: "27",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "28",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "29",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: false,
  },
  {
    key: "30",
    name: "لاله شیرپور",
    phoneNumber: "09347612980",
    status: true,
  },
];

function MembersTable() {
  const [current, setCurrent] = useState(1);

  return (
    <Table
      dataSource={dataSource}
      locale={{
        emptyText: <Empty description="کاربری وجود ندارد" className="my-24" />,
      }}
      pagination={{
        position: ["bottomCenter"],
        current,
        onChange: (pageNum) => setCurrent(pageNum),
        hideOnSinglePage: true,
        showLessItems: true,
        prevIcon: () => <FaAngleRight className="mt-2" />,
        nextIcon: () => <FaAngleLeft className="mt-2" />,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: () => {
            console.log(record);
          },
        };
      }}
    >
      <Column title="نام" dataIndex="name" key="name" />
      <Column title="شماره تماس " dataIndex="phoneNumber" key="phoneNumber" />
      <Column
        title="وضعیت"
        dataIndex="status"
        key="status"
        render={(status) => <StatusBadge className="mx-auto" status={status} />}
      />
    </Table>
  );
}

export default MembersTable;
