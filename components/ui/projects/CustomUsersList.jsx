import React, { useEffect, useState } from "react";
import CustomButton from "../../modules/CustomButton";
import UsersTable from "../users/UsersTable";
import Column from "antd/es/table/Column";
import {
  convertFromInternational,
  convertToLocalDate,
  showUserRole,
} from "../../../utils/tools";
import StatusBadge from "../../modules/StatusBadge";
import CustomModal from "../../modules/CustomModal";
import CustomInput from "../../modules/CustomInput";
import useUser from "../../../hooks/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import useUsers from "../../../hooks/useUsers";
import { GrSearch } from "react-icons/gr";
import { useDebounce } from "use-debounce";
import { IoMdAdd } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";

function CustomUsersList({ projectUsers, modalHandler, emptyText }) {
  const { user, isLoading: userLoading } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openAddUsersModal, setOpenAddUsersModal] = useState(false);
  const [searchAllUsers, setSearchAllUsers] = useState("");
  const [value] = useDebounce(searchAllUsers, 500);
  const [searchUsers, setSearchUsers] = useState(
    searchParams.get("search") || "",
  );
  const [searchedProjectUsers, setSearchedProjectUsers] =
    useState(projectUsers);
  const { isLoading, users: allUsers } = useUsers(
    undefined,
    undefined,
    undefined,
    value,
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(() =>
    projectUsers?.map((user) => user._id),
  );
  const [selectedRowUsers, setSelectedRowUsers] = useState(() =>
    projectUsers?.map((user) => user._id),
  );
  const navigate = useNavigate();

  // Project's Users Filter
  useEffect(() => {
    const searchValue = searchUsers?.toLowerCase()?.trim();
    const searchedUsers =
      projectUsers &&
      projectUsers?.filter((user) => {
        const userInfo = user.name
          ? user.name + " " + user?.surName + user.phoneNumber
          : user?.fullName + user.phoneNumber;

        if (
          searchValue?.length !== 0 &&
          userInfo.toLowerCase().trim().includes(searchValue)
        ) {
          return user;
        }
        if (searchValue?.length === 0) {
          return user;
        }
      });
    setSearchedProjectUsers(searchedUsers);
  }, [searchParams, projectUsers]);

  // Table rowSelection
  const rowSelection = {
    selectedRowKeys,
    onChange: (usersId, users) => {
      setSelectedRowKeys(usersId);
      setSelectedRowUsers(users);
    },
    hideSelectAll: true,
  };

  // Search Handler
  const searchHandler = (e) => {
    setSearchParams({
      ...(e.target.value ? { search: e.target.value } : {}),
    });
    setSearchUsers(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-10 flex-wrap gap-2">
        <h3 className="text-20 font-extrabold">لیست کاربران</h3>
        <CustomInput
          className="hidden py-1 rounded-custom w-72 ml-auto mr-12 md:flex"
          placeholder="جستجو"
          onChange={searchHandler}
          value={searchUsers}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <div className="flex justify-center items-center gap-5 mr-auto">
          {!userLoading && user.userRole !== 2 && (
            <CustomButton
              onClick={() => setOpenAddUsersModal(true)}
              className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-9 p-0 hover:bg-custom-primary-color text-custom-primary-color hover:text-white"
            >
              <MdModeEdit size={23} />
            </CustomButton>
          )}
        </div>
      </div>
      {/* Users List */}
      <div className=" mt-5 md:mt-10">
        <UsersTable
          className="row-cursor-pointer [&_.ant-table-placeholder_.ant-table-cell_.ant-empty]:mx-0"
          emptyText={emptyText}
          emptyClassName="my-10"
          loading={false}
          users={searchedProjectUsers}
          rowClassName="border-t border-black last:border-b"
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
            title="نام کاربری"
            dataIndex="username"
            key="username"
            width={100}
          />
          <Column
            title="نقش کاربری"
            dataIndex="userRole"
            key="userRole"
            width={100}
            render={(userRole) => showUserRole(userRole)}
          />
          <Column
            title="شماره تماس"
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
      </div>
      {/* Modal */}
      <CustomModal
        title="افزودن / ویرایش کاربر به پروژه"
        open={openAddUsersModal}
        onCancel={() => {
          setOpenAddUsersModal(false);
          setSearchAllUsers("");
        }}
        width={1000}
      >
        <CustomInput
          className=" py-1 rounded-custom sm:w-72 ml-auto md:flex"
          placeholder="جستجو"
          value={searchAllUsers}
          onChange={(e) => setSearchAllUsers(e.target.value)}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <UsersTable
          className="mt-6 h-[420px] [&_.ant-table]:h-full "
          loading={isLoading}
          users={allUsers}
          rowSelection={rowSelection}
          rowClassName="border-t border-black last:border-b"
          pageSize={4}
        >
          <Column
            title="نام و نام خانوادگی"
            className="text-nowrap"
            dataIndex="fullName"
            key="fullName"
            width={100}
          />
          <Column
            title="نام کاربری"
            className="text-nowrap"
            dataIndex="username"
            key="username"
            width={100}
          />
          <Column
            title="نقش کاربری"
            dataIndex="userRole"
            key="userRole"
            width={100}
            render={(userRole) => showUserRole(userRole)}
          />
          <Column
            title="شماره تماس"
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
            title=""
            dataIndex=""
            key=""
            width={100}
            render={(_, record) => (
              <CustomButton onClick={() => navigate(`/users/${record.key}`)}>
                مشاهده اطلاعات کاربر
              </CustomButton>
            )}
          />
        </UsersTable>
        <CustomButton
          className="mt-5"
          onClick={() => {
            modalHandler(selectedRowKeys, selectedRowUsers);
            setOpenAddUsersModal(false);
          }}
        >
          افزودن
        </CustomButton>
      </CustomModal>
    </div>
  );
}

export default CustomUsersList;
