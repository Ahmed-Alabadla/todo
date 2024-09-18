import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { hiddenUpdateNameAction } from "../../redux/displaySlice";
import { toast } from "react-toastify";
import api from "../../api";

const ChangeName = (props) => {
  const [displayChangeName, setDisplayChangeName] = useState(props.display);
  const dispatch = useDispatch();
  useEffect(() => {
    setDisplayChangeName(props.display);
  }, [props.display]);

  const { t } = useTranslation();

  // handle Password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const [errorChangeName, setErrorChangeName] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle form events
  const {
    register: registerChangeName,
    handleSubmit: handleSubmitChangeName,
    reset: resetChangeName,
    formState: { errors: errorsChangeName },
  } = useForm();

  const onSubmitChangeName = (data) => {
    setLoading(true);
    console.log(data);
    const token = sessionStorage.getItem("token");
    api
      .put(`/change-name`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("user_name", res.data.user.name);
        window.location.reload();
        console.log(res.data);
        setLoading(false);
        resetChangeName();
        dispatch(hiddenUpdateNameAction());
        toast.success(res.data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setErrorChangeName(true);
        toast.error(err.response.data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  const handleClose = () => {
    dispatch(hiddenUpdateNameAction());
    resetChangeName();
    setErrorChangeName(false);
  };
  return (
    <div className={`relative z-10 ${displayChangeName}`}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"></div>

        <div className="flex items-center justify-center min-h-full p-5 sm:p-0">
          <div className="relative bg-white dark:bg-slate-700 rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
            <div className="p-4 flex justify-between">
              <h3 className="text-xl font-medium uppercase dark:text-white">
                change name
              </h3>
              <button onClick={handleClose}>
                <GrClose style={{ color: "red" }} />
              </button>
            </div>
            {errorChangeName && (
              <div className="uppercase flex items-center justify-center mt-5 mx-6 p-3 rounded-lg text-white bg-red-500">
                Incorrect Password
              </div>
            )}
            <div className="bg-white dark:bg-slate-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form
                className="flex flex-col gap-5"
                method="POST"
                onSubmit={handleSubmitChangeName(onSubmitChangeName)}
              >
                <div className="relative" dir="ltr">
                  <div className="relative">
                    <input
                      type="text"
                      name="new_name"
                      id="labelName"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                        errorsChangeName.name &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      placeholder={t("enter_full_name")}
                      {...registerChangeName("new_name", {
                        required: t("full_name_required"),
                      })}
                    />
                    <label
                      for="labelName"
                      className={`absolute text-sm  dark:bg-slate-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                        errorsChangeName.name && "peer-focus:text-red-500"
                      }`}
                    >
                      {t("full_name")}
                    </label>
                  </div>
                  {errorsChangeName.name && (
                    <span className="text-sm text-red-500">
                      {errorsChangeName.name.message}
                    </span>
                  )}
                </div>

                <div className="relative" dir="ltr">
                  <div className="relative">
                    <input
                      name="password"
                      type={passwordEye === false ? "password" : "text"}
                      id="labelPassword"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                        errorsChangeName.password &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      placeholder="********"
                      {...registerChangeName("password", {
                        required: t("password_required"),
                        minLength: {
                          value: 8,
                          message: t("password_must_at_least_8_characters"),
                        },
                        maxLength: {
                          value: 20,
                          message: t("password_must_at_most_20_characters"),
                        },
                      })}
                    />
                    <label
                      for="labelPassword"
                      className={`absolute text-sm dark:bg-slate-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                        errorsChangeName.password && "peer-focus:text-red-500"
                      }`}
                    >
                      {t("password")}
                    </label>
                  </div>
                  {errorsChangeName.password && (
                    <span className="text-sm text-red-500">
                      {errorsChangeName.password.message}
                    </span>
                  )}
                  {/* eye section */}
                  <div className="text-xl absolute top-4 -translate-y-[2px] right-3 dark:text-slate-400">
                    {passwordEye === false ? (
                      <AiFillEyeInvisible
                        onClick={() => setPasswordEye(!passwordEye)}
                      />
                    ) : (
                      <AiFillEye
                        className="text-slate-300"
                        onClick={() => setPasswordEye(!passwordEye)}
                      />
                    )}
                  </div>
                </div>

                {/* ------------------ */}

                <div className="bg-gray-50 dark:bg-slate-700 mt-1 sm:flex sm:gap-3">
                  <button
                    disabled={loading}
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br disabled:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    {loading ? t("loadingUpdate") : "Change name"}
                  </button>
                  <button
                    onClick={handleClose}
                    type="button"
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeName;
