import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import { convertAsStringOfExceptionMessages } from "../../helpers/exceptionHelper";
import { fetchSendEmailConfirmLink } from "../../services/authService";

function SendEmailConfirmLink({ theme }) {
  const navigate = useNavigate();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "sahinnmaral@gmail.com",
    },
    validationSchema: null,
    onSubmit: (values) => {
      fetchSendEmailConfirmLink(values.email)
        .then(() => {
          toast.success(`Email adresinize onay linki gönderilmiştir`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/auth/login");
          }, 5000);
        })
        .catch((error) => {
          const errorMessage = convertAsStringOfExceptionMessages(error);

          toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            navigate("/auth/login");
          }, 5000);
        });
    },
  });

  return (
    <div>
      <section className="bg-gray-50 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl ">
                Onay linki göndermek için email adresinizi giriniz
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-green-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="mt-2 ml-0 text-[13px] text-red-600 ">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SendEmailConfirmLink;
