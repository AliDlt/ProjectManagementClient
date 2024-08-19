import { useRef, useState } from "react";
import UsersTable from "./UsersTable";
import Column from "antd/es/table/Column";
import { Link } from "react-router-dom";
import {
  convertFromInternational,
  convertToLocalDate,
} from "../../../utils/tools";
import StatusBadge from "../../modules/StatusBadge";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import CustomConfirm from "../../modules/CustomConfirm";
import useDeleteUser from "../../../hooks/user/useDeleteUser";

function UsersPageTable({ users, loading }) {
  const [open, setOpen] = useState(false);
  const userId = useRef();
  const { deleteUserFn, isPending } = useDeleteUser();

  // Delete User Handler
  const deleteUserHandler = async () => {
    await deleteUserFn(userId.current);
  };

  return (
    <>
      <UsersTable users={users} loading={loading}>
        <Column
          title="نام و نام خانوادگی"
          dataIndex="fullName"
          key="fullName"
          width={100}
          render={(fullName, record) => (
            <Link
              to={`/users/${record.key}`}
              className="cursor-pointer flex justify-center"
            >
              {fullName}
            </Link>
          )}
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
          render={(_, record) => (
            <div className="flex items-center justify-center gap-2">
              <MdOutlineEdit
                className="text-custom-primary-color cursor-pointer"
                size={23}
                onClick={() => console.log(5)}
              />
              <FaTrash
                className="text-custom-primary-color cursor-pointer"
                size={20}
                onClick={() => {
                  userId.current = record.key;
                  setOpen(true);
                }}
              />
            </div>
          )}
        />
        <Column
          responsive={["lg"]}
          title="تاریخ  آخرین ورود"
          dataIndex="lastLogin"
          key="lastLogin"
          width={100}
          render={(lastLogin) => {
            if (!lastLogin) return "-";
            return convertToLocalDate(lastLogin);
          }}
        />
      </UsersTable>
      <CustomConfirm
        title="حذف کاربر"
        open={open}
        onCancel={() => setOpen(false)}
        okText="حذف"
        cancelText="لغو"
        okHandler={deleteUserHandler}
        description="آیا از حذف این کاربر اطمینان دارید ؟"
      />
    </>
  );
}

export default UsersPageTable;
