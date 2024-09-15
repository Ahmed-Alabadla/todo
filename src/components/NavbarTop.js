import React from "react";
import { Navbar, Dropdown, Tooltip } from "flowbite-react";
import logo from "../assets/checklist-100.png";
import { FiLogIn } from "react-icons/fi";
import { BsPersonLinesFill } from "react-icons/bs";
import { BsGlobe2 } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import US from "country-flag-icons/react/3x2/US";
import PS from "country-flag-icons/react/3x2/PS";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "../redux/modeSlice";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

function NavbarTop() {
  // const route = useNavigate(); // /login
  // useEffect(() => {
  //   const dataUser = localStorage.getItem("user");
  //   if (dataUser) {
  //     const foundUser = JSON.parse(dataUser);
  //     setToken(foundUser.token);
  //   }
  // }, []);

  // const [token, setToken] = useState("");

  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     Accept: "application/json",
  //     "Content-Type": "multipart/form-data",
  //   },
  // };
  const handleClickLogout = (e) => {
    e.preventDefault();

    // axios
    //   .get(`https://tasks-todo-list-api.000webhostapp.com/api/logout`, config)
    //   .then((res) => console.log(res));

    // localStorage.clear();
  };

  // const [name, setName] = useState("");
  // useEffect(() => {
  //   const dataUser = localStorage.getItem("user");
  //   if (dataUser) {
  //     const foundUser = JSON.parse(dataUser);
  //     setName(foundUser.name);
  //   }
  // }, []);

  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const handleClickBtnMode = () => {
    if (mode === "dark") {
      dispatch(lightMode());
      localStorage.setItem("mode", "light");
    }
    if (mode === "light") {
      dispatch(darkMode());
      localStorage.setItem("mode", "dark");
    }
  };

  let option = window.localStorage.getItem("mode");
  if (option !== null) {
    if (option === "dark") {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  }

  // ----------------------------
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "ar") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, [i18n.language]);

  return (
    <div className="dark:bg-slate-800 min-h-screen overflow-hidden">
      <Navbar fluid={true} className="dark:!bg-slate-900 shadow-sm">
        <div>
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-9" alt="Logo" />
            <span className="mt-1 whitespace-nowrap text-xl font-semibold dark:text-white">
              TODO LIST
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 sm:gap-10">
          <Dropdown
            label={<BsGlobe2 size={30} className="text-blue-500 !m-0" />}
            inline={true}
          >
            <Dropdown.Item
              className="gap-2 text-base"
              onClick={() => {
                i18next.changeLanguage("en");
                localStorage.setItem("language", "en");
              }}
            >
              <US title="English" className="w-6 " /> English
            </Dropdown.Item>
            <Dropdown.Item
              className="gap-2 !text-base"
              onClick={() => {
                i18next.changeLanguage("ar");
                localStorage.setItem("language", "ar");
              }}
            >
              <PS title="English" className="w-6" /> العربية
            </Dropdown.Item>
          </Dropdown>
          {/* ----------------- */}
          <Tooltip content="Toggle dark mode" style={mode} placement="bottom">
            <button
              className="rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              onClick={handleClickBtnMode}
            >
              <MdDarkMode size={30} className="hidden dark:block !m-0" />
              <MdLightMode size={30} className="dark:hidden !m-0" />
            </button>
          </Tooltip>
          {/* ----------------- */}
          <Dropdown
            inline={false}
            label={<span className="w-6 sm:w-full">Ahmed Alabadla</span>}
          >
            <Dropdown.Item>
              <Link to="/profile" className="flex">
                <BsPersonLinesFill size={20} className="mr-3" />
                {t("profile")}
              </Link>
            </Dropdown.Item>

            <Dropdown.Divider />
            <Dropdown.Item>
              <button onClick={handleClickLogout} className="flex text-red-500">
                <FiLogIn size={20} className="mr-3" />
                {t("sign_out")}
              </button>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default NavbarTop;
