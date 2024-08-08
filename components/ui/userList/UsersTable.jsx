import Table from "antd/es/table";
import { useEffect, useState } from "react";
import StatusBadge from "../../modules/StatusBadge";
import Column from "antd/es/table/Column";
import { Empty, Modal } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import {
  convertFromInternational,
  convertToLocalDate,
} from "../../../utils/tools";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

function UsersTable({ users, loading }) {
  const [current, setCurrent] = useState(1);
  const [showGuide, setShowGuide] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const data = users?.map((user) => {
    const { name, surName, ...rest } = user;
    return {
      fullName: `${name} ${surName}`,
      ...rest,
    };
  });

  useEffect(() => {
    const hasSeenGuide = localStorage.getItem("hasSeenGuide");

    if (!hasSeenGuide) {
      setShowGuide(false);
    } else {
      localStorage.setItem("hasSeenGuide", "true");
    }
  }, [showGuide]);

  return (
    <div className="lg:bg-white lg:rounded-custom lg:py-8 lg:shadow-custom lg:border-b-4 lg:border-custom-primary-color-300  lg:w-[25rem] xl:w-auto">
      <Table
        loading={loading}
        dataSource={data}
        locale={{
          emptyText: (
            <Empty description="کاربری وجود ندارد" className="my-24" />
          ),
        }}
        pagination={{
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
      >
        <Column
          title="نام و نام خانوادگی"
          dataIndex="fullName"
          key="fullName"
          width={100}
          onCell={(record) => {
            return {
              onClick: () => navigate(`/user/${record._id}`),
            };
          }}
        />
        <Column
          title="شماره تماس "
          dataIndex="phoneNumber"
          key="phoneNumber"
          width={100}
          render={(phoneNumber) => convertFromInternational(phoneNumber)}
        />
        <Column
          title="وضعیت"
          dataIndex="active"
          key="active"
          width={100}
          render={(active) => (
            <StatusBadge className="mx-auto" status={active} />
          )}
        />
        <Column
          responsive={["lg"]}
          title="تغییرات"
          dataIndex="edit"
          key="edit"
          width={100}
          render={() => (
            <div className="flex items-center justify-center gap-2">
              <MdOutlineEdit
                className="text-custom-primary-color cursor-pointer"
                size={23}
                onClick={() => console.log(5)}
              />
              <FaTrash
                className="text-custom-primary-color cursor-pointer"
                size={20}
                onClick={() => console.log(5)}
              />
            </div>
          )}
        />
        <Column
          responsive={["lg"]}
          title="تاریخ  اخرین ورود"
          dataIndex="lastLogin"
          key="lastLogin"
          width={100}
          render={(lastLogin) => convertToLocalDate(lastLogin)}
        />
      </Table>
      {/* <Modal
        closeIcon={null}
        open={showGuide}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      ></Modal> */}
    </div>
  );
}

export default UsersTable;
