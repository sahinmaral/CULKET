import React from "react";
import { useFormik } from "formik";
import { UserDetailedAfterRegisterSchema } from "../../schema";
import { useNavigate } from "react-router-dom";
import { fetchFillDetailedInformationsAfterRegister } from "../../services/authService";
import { useQuery } from "../../hooks/useQuery";
import { toast } from "react-toastify";

function FillDetailedInformationsAfterRegister() {
  const query = useQuery();
  const navigate = useNavigate()

  if (!query.get("email")) {
    navigate("/auth/login");
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "Şahin",
      surname: "MARAL",
      birthDate: "2000-02-11",
      gender: 3,
    },
    validationSchema: UserDetailedAfterRegisterSchema,
    onSubmit: (values) => {
      fetchFillDetailedInformationsAfterRegister({...values,email:query.get("email")})
        .then(() => {
          toast.success(`Kullanıcı bilgileriniz güncellenmiştir`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            navigate("/auth/login")
          }, 5000);
        })
        .catch((error) => {
          const errorMessage = error.response.data.errors.join("\n");

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
                Hesaba ait detaylı bilgileri giriniz
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-green-900"
                  >
                    İsim
                  </label>
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Şahin"
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <p className="mt-2 ml-0 text-[13px] text-red-600 ">
                      {formik.errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="surname"
                    className="block mb-2 text-sm font-medium text-green-900"
                  >
                    Soy isim
                  </label>
                  <input
                    type="text"
                    name="surname"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.surname}
                    className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="MARAL"
                  />
                  {formik.errors.surname && formik.touched.surname ? (
                    <p className="mt-2 ml-0 text-[13px] text-red-600 ">
                      {formik.errors.surname}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="birthDate"
                    className="block mb-2 text-sm font-medium text-green-900 "
                  >
                    Doğum tarihi
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.birthDate}
                    className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                  {formik.errors.birthDate && formik.touched.birthDate ? (
                    <p className="mt-2 ml-0 text-[13px] text-red-600">
                      {formik.errors.birthDate}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-green-900 "
                  >
                    Cinsiyet
                  </label>
                  <select
                    name="gender"
                    className="select select-bordered w-full"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value={3}>Belirtmek istemiyorum</option>
                    <option value={1}>Erkek</option>
                    <option value={2}>Kadın</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Bilgileri kaydet
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FillDetailedInformationsAfterRegister;
