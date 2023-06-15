import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { fetchGetWatchedFilmsOfUserFromAccessToken } from "../services/authService";
import { useFormik } from "formik";
import { AddDiscussionSchema } from "../schema";
import { fetchAddDiscussion } from "../services/discussionService";

function AddDiscussion() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);

  const { cookies } = useAuth();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      header: "",
      description: "",
      selectedFilm: 0,
    },
    validationSchema: AddDiscussionSchema,
    onSubmit: (values) => {
        fetchAddDiscussion({
          filmId : values.selectedFilm,
          header: values.header,
          description: values.description,
          accessToken: cookies["access-token"],
        })
          .then(() => {
            toast.success(`Başlık oluşturulmuştur`, {
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
              navigate("/");
            }, 5000);
          })
          .catch((error) => {
            console.log(error)
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

  useEffect(() => {
    fetchGetWatchedFilmsOfUserFromAccessToken(cookies["access-token"])
      .then((result) => {
        setFilms(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cookies]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl mb-2 font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        İzlediğiniz film için tartışma oluşturun
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
        <div>
          <label
            htmlFor="selectedFilm"
            className="block mb-2 text-sm font-medium text-green-900 "
          >
            Seçtiğiniz film
          </label>
          <select
            name="selectedFilm"
            className="select select-bordered w-full"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value={0}>
                  Film seçiniz
                </option>
            {films.map((film) => {
              return (
                <option key={film.id} value={film.id}>
                  {film.title}
                </option>
              );
            })}
          </select>
          {formik.errors.selectedFilm && formik.touched.selectedFilm ? (
            <p className="mt-2 ml-3 text-[13px] text-red-600 ">
              {formik.errors.selectedFilm}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="header"
            className="block mb-2 text-sm font-medium text-green-900"
          >
            Başlık
          </label>

          <input
            type="text"
            name="header"
            placeholder="Başlık giriniz"
            className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.header}
          />
          {formik.errors.header && formik.touched.header ? (
            <p className="mt-2 ml-3 text-[13px] text-red-600 ">
              {formik.errors.header}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-green-900"
          >
            İçerik
          </label>
          <textarea
            name="description"
            placeholder="İçerik giriniz"
            className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          ></textarea>
          {formik.errors.description && formik.touched.description ? (
            <p className="mt-2 ml-3 text-[13px] text-red-600 ">
              {formik.errors.description}
            </p>
          ) : null}
        </div>

        <p className=" text-gray-400">
          * Lütfen benzer başlıkta tartışma açmamaya dikkat edelim yoksa helper
          tarafından cezalandırılabilirsiniz
        </p>

        <button
          type="submit"
          className="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Oluştur
        </button>
      </form>
    </div>
  );
}

export default AddDiscussion;
