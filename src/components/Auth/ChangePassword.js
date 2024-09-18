import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { hiddenUpdatePasswordAction } from "../../redux/displaySlice";
import { toast } from "react-toastify";
import api from "../../api";

const ChangePassword = () => {
  const displayPassword = useSelector(
    (state) => state.displaySlice.displayChangePassword
  );
  const [displayChangePass, setDisplayChangePass] = useState(displayPassword);

  useEffect(() => {
    setDisplayChangePass(displayPassword);
  }, [displayPassword]);

  const { t } = useTranslation();

  // handle Password eye
  const [oldPasswordEye, setOldPasswordEye] = useState(false);
  const [newPasswordEye, setNewPasswordEye] = useState(false);
  const [conNewPasswordEye, setConNewPasswordEye] = useState(false);

  const [errorChangePass, setErrorChangePass] = useState(false);

  // handle form events
  const {
    register: registerChangePass,
    handleSubmit: handleSubmitChangePass,
    reset: resetChangePass,
    formState: { errors: errorsChangePass },
  } = useForm();

  // check password event
  const [validateConfirmPass, setValidateConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitChangePass = (data) => {
    setLoading(true);
    console.log(data);
    const token = sessionStorage.getItem("token");
    api
      .put(`/change-password`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        resetChangePass();
        dispatch(hiddenUpdatePasswordAction());
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
        setErrorChangePass(true);
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
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hiddenUpdatePasswordAction());
    resetChangePass();
    setErrorChangePass(false);
  };
  return (
    <div className={`relative z-10 ${displayChangePass}`}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"></div>

        <div className="flex items-center justify-center min-h-full p-5 sm:p-0">
          <div className="relative bg-white dark:bg-slate-700 rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 max-w-lg w-full">
            <div className="p-4 flex justify-between">
              <h3 className="text-xl font-medium dark:text-white">
                CHANGE PASSWORD
              </h3>
              <button onClick={handleClose}>
                <GrClose />
              </button>
            </div>
            {errorChangePass && (
              <div className="uppercase flex items-center justify-center mt-5 mx-6 p-3 rounded-lg text-white bg-red-500">
                Invalid old Password
              </div>
            )}
            <div className="bg-white dark:bg-slate-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmitChangePass(onSubmitChangePass)}
                method="POST"
              >
                <div className="relative" dir="ltr">
                  <div className="relative">
                    <input
                      name="password"
                      type={oldPasswordEye === false ? "password" : "text"}
                      id="labelOldPassword"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                        errorsChangePass.oldPassword &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      placeholder="********"
                      {...registerChangePass("old_password", {
                        required: "Old password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Old password must have at least 8 characters",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "Old password must have at most 20 characters",
                        },
                      })}
                    />
                    <label
                      for="labelOldPassword"
                      className={`absolute text-sm  dark:bg-slate-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                        errorsChangePass.oldPassword &&
                        "peer-focus:text-red-500"
                      }`}
                    >
                      Old password
                    </label>
                  </div>
                  {errorsChangePass.oldPassword && (
                    <span className="text-sm text-red-500">
                      {errorsChangePass.oldPassword.message}
                    </span>
                  )}
                  {/* eye section */}
                  <div className="text-xl absolute top-4 -translate-y-[2px] right-3 dark:text-slate-400">
                    {oldPasswordEye === false ? (
                      <AiFillEyeInvisible
                        onClick={() => setOldPasswordEye(!oldPasswordEye)}
                      />
                    ) : (
                      <AiFillEye
                        className="text-slate-300"
                        onClick={() => setOldPasswordEye(!oldPasswordEye)}
                      />
                    )}
                  </div>
                </div>

                <div className="relative" dir="ltr">
                  <div className="relative">
                    <input
                      name="password"
                      type={newPasswordEye === false ? "password" : "text"}
                      id="labelNewPassword"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                        errorsChangePass.newPassword &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      placeholder="********"
                      {...registerChangePass("new_password", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message:
                            "New password must have at least 8 characters",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "New password must have at most 20 characters",
                        },
                        validate: (value) => setValidateConfirmPass(value),
                      })}
                    />
                    <label
                      for="labelNewPassword"
                      className={`absolute text-sm  dark:bg-slate-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                        errorsChangePass.newPassword &&
                        "peer-focus:text-red-500"
                      }`}
                    >
                      New password
                    </label>
                  </div>
                  {errorsChangePass.newPassword && (
                    <span className="text-sm text-red-500">
                      {errorsChangePass.newPassword.message}
                    </span>
                  )}
                  {/* eye section */}
                  <div className="text-xl absolute top-4 -translate-y-[2px] right-3 dark:text-slate-400">
                    {newPasswordEye === false ? (
                      <AiFillEyeInvisible
                        onClick={() => setNewPasswordEye(!newPasswordEye)}
                      />
                    ) : (
                      <AiFillEye
                        className="text-slate-300"
                        onClick={() => setNewPasswordEye(!newPasswordEye)}
                      />
                    )}
                  </div>
                </div>

                <div className="relative" dir="ltr">
                  <div className="relative">
                    <input
                      type={conNewPasswordEye === false ? "password" : "text"}
                      id="labelConPassword"
                      className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                        errorsChangePass.confirmNewPassword &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      }`}
                      placeholder="********"
                      onPaste={(e) => {
                        e.preventDefault();
                        return false;
                      }}
                      {...registerChangePass("confirmNewPassword", {
                        required: "Confirm New password is required",

                        minLength: {
                          value: 8,
                          message:
                            "Confirm New password must have at least 8 characters",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "Confirm New password must have at most 20 characters",
                        },
                        validate: (value) =>
                          value === validateConfirmPass ||
                          "The confirm new password do not match",
                      })}
                    />
                    <label
                      for="labelConPassword"
                      className={`absolute text-sm  dark:bg-slate-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                        errorsChangePass.confirmNewPassword &&
                        "peer-focus:text-red-500"
                      }`}
                    >
                      Confirm new password
                    </label>
                  </div>
                  {errorsChangePass.confirmNewPassword && (
                    <span className="text-sm text-red-500">
                      {errorsChangePass.confirmNewPassword.message}
                    </span>
                  )}
                  {/* eye section */}
                  <div className="text-xl absolute top-4 -translate-y-[2px] right-3 dark:text-slate-400">
                    {conNewPasswordEye === false ? (
                      <AiFillEyeInvisible
                        onClick={() => setConNewPasswordEye(!conNewPasswordEye)}
                      />
                    ) : (
                      <AiFillEye
                        className="text-slate-300"
                        onClick={() => setConNewPasswordEye(!conNewPasswordEye)}
                      />
                    )}
                  </div>
                </div>
                {/* ------------------- */}
                <div className="dark:bg-slate-700 bg-gray-50 mt-1 sm:flex sm:gap-3">
                  <button
                    disabled={loading}
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br disabled:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    {loading ? t("loadingUpdate") : "Change Password"}
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

export default ChangePassword;
