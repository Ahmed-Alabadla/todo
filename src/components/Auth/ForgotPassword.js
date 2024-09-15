import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";
import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const [success, setSuccess] = useState(false);
  const { t } = useTranslation();

  // handle form events
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const route = useNavigate();
  // handleSubmit
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="h-screen flex items-center justify-center dark:bg-slate-900">
      <div className="bg-white w-[448px] max-w-md  shadow-lg rounded-xl m-10 dark:bg-slate-800 dark:text-slate-300">
        <button
          className="flex items-center gap-1 mt-3 mx-3"
          onClick={() => route("/login")}
        >
          <IoIosArrowBack />
          {t("back")}
        </button>
        {success ? (
          <>
            <div class="flex flex-col justify-center items-center gap-2 ">
              <BsCheck2Circle size={30} />
              <p class="text-xl sm:text-2xl  sm:font-medium">
                {t("password_reset_sent")}
              </p>
              <p class=" text-lg px-4 mb-5 text-center">
                {t("message_success_forgot_password")}
              </p>
            </div>
            <div className="mx-5">
              <button className=" w-full flex justify-center mt-1 py-2 px-4 border border-transparent  font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                {t("back_login")}
              </button>
            </div>
          </>
        ) : (
          <>
            <div class="flex flex-col justify-center items-center gap-2 ">
              <p class="text-xl sm:text-2xl  sm:font-medium">
                {t("Forgot_password")}
              </p>
              <p class=" text-lg px-4 text-center">
                {t("message_forgot_password")}
              </p>
            </div>

            <form
              method="POST"
              className="mt-5 p-5"
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
                    className={`absolute text-sm  dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-sky-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
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
              <button
                type="submit"
                className="group relative w-full flex justify-center mt-7 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t("submit_email")}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
