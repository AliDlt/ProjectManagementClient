import { useRef, useState } from "react";
import UsersTable from "./UsersTable";
import Column from "antd/es/table/Column";
import { Link, useNavigate } from "react-router-dom";
import {
  convertFromInternational,
  convertToLocalDate,
} from "../../../utils/tools";
import StatusBadge from "../../modules/StatusBadge";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import CustomConfirm from "../../modules/CustomConfirm";
import useDeleteUser from "../../../hooks/user/useDeleteUser";
import CustomButton from "../../modules/CustomButton";

function UsersPageTable({ users, loading }) {
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
      >
        <Column
          title="نام و نام خانوادگی"
          dataIndex="fullName"
          key="fullName"
          width={100}
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
          )}
        />
        <Column
          title="تاریخ  آخرین ورود"
          dataIndex="lastLogin"
          key="lastLogin"
          width={100}
          render={(lastLogin) => {
            if (!lastLogin) return "-";
            return convertToLocalDate(lastLogin);
          }}
        />
        <Column
          title="پروژه های کاربر"
          dataIndex="userProject"
          key="userProject"
          width={100}
          render={(_, record) =>
            record?.totalProjects === 0 ? (
              "پروژه ای ندارد"
            ) : (
              <CustomButton
                className="py-1 h-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`project/${record.key}`);
                }}
              >
                مشاهده پروژه ها
              </CustomButton>
            )
          }
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
        loading={isPending}
      />
    </>
  );
}

export default UsersPageTable;
