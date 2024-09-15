import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import ChangeName from "./Auth/ChangeName";
import {
  blockUpdateNameAction,
  blockUpdatePasswordAction,
} from "../redux/displaySlice";
import ChangePassword from "./Auth/ChangePassword";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

function Profile() {
  const displayName = useSelector(
    (state) => state.displaySlice.displayChangeName
  );

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const dataUser = localStorage.getItem("user");
    if (dataUser) {
      const foundUser = JSON.parse(dataUser);
      setName(foundUser.name);
      setEmail(foundUser.email);
    }
  }, []);

  const { t } = useTranslation();

  const { confirm } = Modal;

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this account?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      theme: "dark",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <div className="container mt-16 flex flex-col gap-8">
      <div className="flex flex-col gap-10 p-10 bg-white dark:bg-slate-900 rounded-lg shadow">
        <h2 className="text-center text-2xl font-semibold dark:text-white">
          {t("your_profile")}
        </h2>
        <div className="relative w-full">
          <input
            name="email"
            type="email"
            id="labelEmail"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent "
            value={email}
            disabled
          />
          <label
            for="labelEmail"
            className="absolute text-sm dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ltr:left-1 rtl:-right-3"
          >
            {t("email")}
          </label>
        </div>
        <div className="relative flex items-center ">
          <div className="w-full">
            <input
              name="name"
              type="text"
              id="labelName"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent "
              value={name}
              readOnly
            />
            <label
              for="labelName"
              className="absolute text-sm dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ltr:left-1 rtl:right-0"
            >
              {t("your_name")}
            </label>
          </div>

          <button
            type="button"
            onClick={() => dispatch(blockUpdateNameAction())}
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ltr:ml-5 ltr:sm:ml-10 rtl:mr-5 rtl:sm:mr-10"
          >
            {t("change")}
          </button>
        </div>
        {/* <div className="relative flex items-center">
          <div className="w-full">
            <input
              name="phone"
              type="text"
              id="labelPhone"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent "
              readOnly
            />
            <label
              for="labelPhone"
              className="absolute text-sm dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ltr:left-1 rtl:-right-1.5  "
            >
              {t("phone")}
            </label>
          </div>
          <button
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ltr:ml-5 ltr:sm:ml-10 rtl:mr-5 rtl:sm:mr-10"
          >
            {t("change")}
          </button>
        </div> */}
        <div className="relative flex items-center">
          <div className="w-full">
            <input
              name="password"
              type="text"
              id="labelPassword"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent "
              value="********"
              readOnly
            />
            <label
              for="labelPassword"
              className="absolute text-sm dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ltr:left-1 rtl:-right-1.5"
            >
              {t("password")}
            </label>
          </div>
          <button
            onClick={() => dispatch(blockUpdatePasswordAction())}
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none ltr:ml-5 ltr:sm:ml-10 rtl:mr-5 rtl:sm:mr-10"
          >
            {t("change")}
          </button>
        </div>
      </div>
      <div className="flex flex-col p-10 bg-white dark:bg-slate-900 mb-5 rounded-lg shadow">
        <p className="text-lg font-medium dark:text-white"> {t("delete")}</p>
        <p className="text-sm text-gray-500 mt-3"> {t("delete_details")}</p>
        <button
          onClick={showDeleteConfirm}
          className="w-fit mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 uppercase"
        >
          {t("delete")}
        </button>
      </div>
      {/* -------------Modal Change Name------------- */}
      <ChangeName display={displayName} />

      {/* -------------Modal Change Password------------- */}
      <ChangePassword />
    </div>
  );
}

export default Profile;
