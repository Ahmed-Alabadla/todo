import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import api from "../../api";

function SignUp() {
  const route = useNavigate();
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("token");
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser);

      route("/");
    }
  }, [route]);

  // =======================

  const [validatePass, setValidatePass] = useState("");
  const [errorSignUp, setErrorSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // handle Password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const [conPasswordEye, setConPasswordEye] = useState(false);

  const { t } = useTranslation();
  // handle form events
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handleSubmit
  const onSubmit = (data) => {
    setLoading(true);
    api
      .post("/register", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);

        route("/login");
        reset();
      })
      .catch((err) => {
        setLoading(false);

        setErrorSignUp(true);
        console.log(err);
      });
  };

  // -----------------

  return (
    <div className="h-screen   flex items-center justify-center dark:bg-slate-900">
      <div className=" max-w-md w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-lg mx-auto dark:bg-slate-800">
        <div>
          <h2 className="mb-6 text-center text-3xl tracking-tight font-medium text-blue-600 ">
            {t("create_account")}
          </h2>
          {/* ----------------------- */}
          {errorSignUp && (
            <div className="flex items-center justify-center mt-5 mx-6 p-3 rounded-lg text-white bg-red-500">
              {t("email_already_taken")}
            </div>
          )}
        </div>
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="remember" value="true" />

          <div className="relative">
            <div className="relative">
              <input
                type="text"
                name="name"
                id="labelName"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                  errors.name &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                placeholder={t("enter_full_name")}
                {...register("name", {
                  required: t("full_name_required"),
                })}
              />
              <label
                for="labelName"
                className={`absolute text-sm  dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                  errors.name && "peer-focus:text-red-500"
                }`}
              >
                {t("full_name")}
              </label>
            </div>
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="relative">
            <div className="relative">
              <input
                type="email"
                name="email"
                id="labelEmail"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                  errors.email &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                placeholder="name@example.com"
                {...register("email", {
                  required: t("email_required"),
                  pattern: {
                    value:
                      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/gm,
                    message: t("invalid_email"),
                  },
                })}
              />
              <label
                for="labelEmail"
                className={`absolute text-sm  dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                  errors.email && "peer-focus:text-red-500"
                }`}
              >
                {t("email")}
              </label>
            </div>
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* <div className="relative">
            <div className="relative">
              <input
                type="text"
                name="phone"
                id="labelPhone"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                  errors.phone &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                placeholder={t("enter_phone")}
                {...register("phone", {
                  required: t("phone_required"),
                })}
              />
              <label
                for="labelPhone"
                className={`absolute text-sm  dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                  errors.phone && "peer-focus:text-red-500"
                }`}
              >
                {t("phone")}
              </label>
            </div>
            {errors.phone && (
              <span className="text-sm text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div> */}

          <div className="relative">
            <div className="relative">
              <input
                name="password"
                type={passwordEye === false ? "password" : "text"}
                id="labelPassword"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                  errors.password &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                placeholder="********"
                {...register("password", {
                  required: t("password_required"),
                  minLength: {
                    value: 8,
                    message: t("password_must_at_least_8_characters"),
                  },
                  maxLength: {
                    value: 20,
                    message: t("password_must_at_most_20_characters"),
                  },
                  validate: (value) => setValidatePass(value),
                })}
              />
              <label
                for="labelPassword"
                className={`absolute text-sm  dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                  errors.password && "peer-focus:text-red-500"
                }`}
              >
                {t("password")}
              </label>
            </div>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
            {/* eye section */}
            <div className="text-xl absolute top-4 -translate-y-[2px] right-5 dark:text-slate-400">
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

          <div className="relative">
            <div className="relative">
              <input
                type={conPasswordEye === false ? "password" : "text"}
                id="labelConPassword"
                className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent bg-gray-50 dark:bg-gray-700 rounded-lg border-1 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-sky-500 appearance-none focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 peer focus:placeholder:text-slate-400 placeholder:text-transparent ${
                  errors.confirmPassword &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"
                }`}
                placeholder="********"
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                {...register("confirmPassword", {
                  required: t("confirm_password_required"),

                  minLength: {
                    value: 8,
                    message: t("confirm_password_must_at_least_8_characters"),
                  },
                  maxLength: {
                    value: 20,
                    message: t("confirm_password_must_at_most_20_characters"),
                  },
                  validate: (value) =>
                    value === validatePass || t("password_don't_match"),
                })}
              />
              <label
                for="labelConPassword"
                className={`absolute text-sm  dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
                  errors.confirmPassword && "peer-focus:text-red-500"
                }`}
              >
                {t("confirm_password")}
              </label>
            </div>
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
            {/* eye section */}
            <div className="text-xl absolute top-4 -translate-y-[2px] right-5 dark:text-slate-400">
              {conPasswordEye === false ? (
                <AiFillEyeInvisible
                  onClick={() => setConPasswordEye(!conPasswordEye)}
                />
              ) : (
                <AiFillEye
                  className="text-slate-300"
                  onClick={() => setConPasswordEye(!conPasswordEye)}
                />
              )}
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md disabled:bg-sky-600/50 disabled:hover:bg-sky-600/50 text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:disabled:bg-sky-700/50 dark:hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              {!loading ? t("sign_Up") : t("loadingUpdate")}
            </button>
          </div>
        </form>
        <div className="text-center dark:text-slate-300">
          {t("already_have_account")}{" "}
          <span className="text-blue-600">
            <Link to="/login">{t("sign_In")}</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
