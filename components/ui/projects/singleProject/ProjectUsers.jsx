import { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { Link, useSearchParams } from "react-router-dom";
import Column from "antd/es/table/Column";
import { MdModeEdit } from "react-icons/md";
import useUser from "../../../../hooks/useUser";
import useUsers from "../../../../hooks/useUsers";
import CustomInput from "../../../modules/CustomInput";
import CustomButton from "../../../modules/CustomButton";
import UsersTable from "../../users/UsersTable";
import useUpdateProject from "../../../../hooks/projects/useUpdateProject";
import { useToast } from "../../../../Context/ToastContext";
import CustomModal from "../../../modules/CustomModal";
import { convertFromInternational, convertToLocalDate } from "../../../../utils/tools";
import StatusBadge from "../../../modules/StatusBadge";

function ProjectUsers({ users, projectId }) {
  const { user, isLoading: userLoading } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [userSearch, setUserSearch] = useState(
    searchParams.get("search") || "",
  );
  const [search, setSearch] = useState("");
  const [finalUsers, setFinalUsers] = useState(users);
  const { isLoading, users: allUsers } = useUsers("", "", "", search);
  const { mutateAsync } = useUpdateProject(projectId);
  const toast = useToast();
  const [selectedRowKeys, setSelectedRowKeys] = useState(() =>
    users?.map((user) => user._id),
  );

  // Project's Users Filter
  useEffect(() => {
    const searchValue = userSearch?.toLowerCase()?.trim();
    const searchedUsers =
      users &&
      users?.filter((user) => {
        const userInfo = user.name + " " + user?.surName + user.phoneNumber;
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
    setFinalUsers(searchedUsers);
  }, [searchParams, users]);

  // Table rowSelection
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    hideSelectAll: true,
  };

  // Add User To Product Handler
  const addUserHandler = async () => {
    try {
      await mutateAsync({
        id: projectId,
        usersIds: selectedRowKeys,
      });
      setOpen(false);
      toast("لیست کاربران آپدیت شد", "success");
    } catch (error) {
      toast(error?.response?.data?.message, "error");
    }
  };

  // Search Handler
  const searchHandler = (e) => {
    setSearchParams({
      search: e.target.value,
    });
    setUserSearch(e.target.value);
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-10">
        <h3 className="text-20 font-extrabold">لیست کاربران</h3>
        <CustomInput
          className="hidden py-1 rounded-custom w-72 ml-auto mr-12 md:flex"
          placeholder="جستجو"
          onChange={searchHandler}
          value={userSearch}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <div className="flex justify-center items-center gap-5">
          <span className="hidden md:block">اضافه کردن کاربر </span>
          {!userLoading && user.userRole !== 2 && (
            <CustomButton
              className=" flex justify-center items-center ring-2 ring-custom-primary-color bg-white rounded-full size-10 p-0 hover:bg-custom-primary-color group"
              onClick={() => setOpen(true)}
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
          loading={false}
          users={finalUsers}
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
        open={open}
        onCancel={() => setOpen(false)}
        title="اضافه کردن کاربر به پروژه"
      >
        <CustomInput
          className="hidden py-1 rounded-custom w-72 ml-auto  md:flex mt-5"
          placeholder="جستجو"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={
            <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
          }
        />
        <UsersTable
          className="mt-6"
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
        <CustomButton className="mt-5" onClick={addUserHandler}>
          اضافه کردن
        </CustomButton>
      </CustomModal>
    </div>
  );
}

export default ProjectUsers;
