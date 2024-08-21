import React, { useEffect, useState } from "react";
import CustomButton from "../../modules/CustomButton";
import { MdModeEdit } from "react-icons/md";
import UsersTable from "../users/UsersTable";
import Column from "antd/es/table/Column";
import {
  convertFromInternational,
  convertToLocalDate,
} from "../../../utils/tools";
import StatusBadge from "../../modules/StatusBadge";
import CustomModal from "../../modules/CustomModal";
import CustomInput from "../../modules/CustomInput";
import useUser from "../../../hooks/useUser";
import { Link, useSearchParams } from "react-router-dom";
import useUsers from "../../../hooks/useUsers";
import { GrSearch } from "react-icons/gr";

function CustomUsersList({ projectUsers, modalHandler, emptyText }) {
  const { user, isLoading: userLoading } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openAddUsersModal, setOpenAddUsersModal] = useState(false);
  const [searchAllUsers, setSearchAllUsers] = useState("");
  const [searchUsers, setSearchUsers] = useState(
    searchParams.get("search") || "",
  );
  const [searchedProductUsers, setSearchedProductUsers] =
    useState(projectUsers);
  const { isLoading, users: allUsers } = useUsers("", "", "", searchAllUsers);
  const [selectedRowKeys, setSelectedRowKeys] = useState(() =>
    projectUsers?.map((user) => user._id),
  );
  const [selectedRowUsers, setSelectedRowUsers] = useState(() =>
    projectUsers?.map((user) => user._id),
  );

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
          searchValue.length !== 0 &&
          userInfo.toLowerCase().trim().includes(searchValue)
        ) {
          return user;
        }
        if (searchValue.length === 0) {
          return user;
        }
      });
    setSearchedProductUsers(searchedUsers);
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
      search: e.target.value,
    });
    setSearchUsers(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-10">
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
        <div className="flex justify-center items-center gap-5">
          <span className="hidden md:block">اضافه کردن کاربر </span>
          {!userLoading && user.userRole !== 2 && (
            <CustomButton
              className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group"
              onClick={() => setOpenAddUsersModal(true)}
            >
              <MdModeEdit
                size={25}
                className="text-custom-primary-color rounded-full group-hover:text-white"
              />
            </CustomButton>
          )}
        </div>
      </div>
      {/* Users List */}
      <div className=" mt-5 md:mt-10">
        <UsersTable
          emptyText={emptyText}
          loading={false}
          users={searchedProductUsers}
          rowClassName="lg:border-t lg:border-black lg:last:border-b"
        >
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
        open={openAddUsersModal}
        onCancel={() => setOpenAddUsersModal(false)}
        title="اضافه کردن کاربر به پروژه"
      >
        <CustomInput
          className="hidden py-1 rounded-custom w-72 ml-auto  md:flex mt-5"
          placeholder="جستجو"
          value={searchAllUsers}
          onChange={(e) => setSearchAllUsers(e.target.value)}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <UsersTable
          className="mt-6 h-[438px]"
          loading={isLoading}
          users={allUsers}
          rowSelection={rowSelection}
          rowClassName="lg:border-t lg:border-black lg:last:border-b"
        >
          <Column
            title="نام و نام خانوادگی"
            className="text-nowrap"
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
        <CustomButton
          className="mt-5"
          onClick={() => {
            modalHandler(selectedRowKeys, selectedRowUsers);
            setOpenAddUsersModal(false);
          }}
        >
          اضافه کردن
        </CustomButton>
      </CustomModal>
    </div>
  );
}

export default CustomUsersList;
