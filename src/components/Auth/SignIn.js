import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import api from "../../api";

const SignIn = () => {
  // handle Password eye
  const [passwordEye, setPasswordEye] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const route = useNavigate();

  // handle form events
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    api
      .post("/login", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res.data);
        setLoading(false);

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user_name", res.data.user.name);
        sessionStorage.setItem("userId", res.data.user.id);

        route("/");
        reset();
      })
      .catch((err) => {
        setLoading(false);

        setErrorSignIn(true);
        console.log(err);
      });
  };

  // -----------------

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("token");
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser);

      route("/");
    }
  }, [route]);

  return (
    <div className="h-screen   flex items-center justify-center dark:bg-slate-900">
      <div className="max-w-md w-full space-y-8 py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-lg mx-auto dark:bg-slate-800">
        <div>
          <h2 className="mb-6 text-center text-3xl tracking-tight font-medium text-blue-600 ">
            {t("sign_in_account")}
          </h2>
          {/* ----------------------- */}
          {errorSignIn && (
            <div className="flex items-center justify-center mt-5 mx-6 p-3 rounded-lg text-white bg-red-500">
              {t("incorrect_input")}
            </div>
          )}
        </div>
        <form
          className="mt-8 space-y-6"
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                })}
              />
              <label
                for="labelPassword"
                className={`absolute text-sm dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
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

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-sky-500 focus:ring-sky-600 border-gray-300 rounded"
              />
              <label
                for="remember-me"
                className="ml-2 block text-sm text-gray-900 dark:text-slate-300"
              >
                {t("remember_me")}
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {t("forgot_password")}
              </Link>
            </div>
          </div> */}
          <div>
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md disabled:bg-sky-600/50 disabled:hover:bg-sky-600/50 text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:disabled:bg-sky-700/50 dark:hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              {!loading ? t("sign_In") : t("loadingUpdate")}
            </button>
          </div>
        </form>
        <div className="text-center dark:text-slate-300">
          {t("don't_have_account")}{" "}
          <span className="text-blue-600">
            <Link to="/register">{t("sign_Up")}</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
