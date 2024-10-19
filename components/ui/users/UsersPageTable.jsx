import { useMemo, useRef, useState } from "react";
import UsersTable from "./UsersTable";
import { useNavigate } from "react-router-dom";
import {
  convertFromInternational,
  convertToLocalDate,
} from "../../../utils/tools";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import CustomConfirm from "../../modules/CustomConfirm";
import useDeleteUser from "../../../hooks/user/useDeleteUser";
import useUser from "../../../hooks/useUser";
import cn from "../../../utils/cn";

function UsersPageTable({ users, loading }) {
  const { user, isLoading } = useUser();
  const [open, setOpen] = useState(false);
  const userId = useRef();
  const { deleteUserFn, isPending } = useDeleteUser();
  const navigate = useNavigate();

  // Delete User Handler
  const deleteUserHandler = async () => {
    try {
      await deleteUserFn({ id: userId.current });
      setOpen(false);
    } catch (error) {}
  };

  const usersColumns = useMemo(() => {
    return [
      {
        dataIndex: "fullName",
        title: "نام و نام خانوادگی",
        render: (fullName, { active }) => (
          <div className=" flex items-center justify-between relative">
            <span
              className={cn([
                "size-3.5 border rounded-full flex ml-1",
                active
                  ? "border-green-500 bg-green-300"
                  : "border-gray-500 bg-gray-400",
              ])}
            ></span>
            <span className="mx-auto text-nowrap">{fullName}</span>
          </div>
        ),
        width: 250,
      },
      { dataIndex: "username", title: "نام کاربری" },
      {
        dataIndex: "phoneNumber",
        title: "شماره تماس",
        render: (phoneNumber) => convertFromInternational(phoneNumber),
      },
      {
        title: "تغییرات",
        dataIndex: "edit",
        render: (_, record) => (
          <div className="flex items-center justify-center gap-2">
            <MdModeEdit
              className="text-custom-primary-color cursor-pointer"
              size={23}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/users/${record.key}`);
              }}
            />
            <FaTrash
              className="text-custom-primary-color cursor-pointer"
              size={20}
              onClick={(e) => {
                e.stopPropagation();
                userId.current = record.key;
                setOpen(true);
              }}
            />
          </div>
        ),
      },
      {
        dataIndex: "lastLogin",
        title: "تاریخ  آخرین ورود",
        render: (lastLogin) => {
          if (!lastLogin) return "-";
          return convertToLocalDate(lastLogin);
        },
      },
    ];
  }, []);

  return (
    <>
      <UsersTable
        users={users}
        loading={loading}
        className="h-[410px] row-cursor-pointer"
        paginationClassName="!mt-auto"
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(`/users/${record.key}`);
            },
          };
        }}
        columns={usersColumns}
      />
      <CustomConfirm
        title="حذف کاربر"
        open={open}
        onCancel={() => setOpen(false)}
        okText="حذف"
        cancelText="لغو"
        okHandler={deleteUserHandler}
        description="آیا از حذف این کاربر اطمینان دارید ؟"
        loading={isPending}
      />
    </>
  );
}

export default UsersPageTable;
