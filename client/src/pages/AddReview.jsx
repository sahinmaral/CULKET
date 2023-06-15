import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { fetchGetWatchedFilmsOfUserFromAccessToken } from "../services/authService";
import { useFormik } from "formik";
import { AddReviewSchema } from "../schema";
import { fetchAddDiscussion } from "../services/discussionService";

function AddReview() {
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);

  const { cookies } = useAuth();

  const { filmId } = useParams();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: "",
      filmId: filmId,
      rating: 3,
    },
    validationSchema: AddReviewSchema,
    onSubmit: (values) => {
        console.log(values)
    //   fetchAddDiscussion({
    //     accessToken: cookies["access-token"],
    //   })
    //     .then(() => {
    //       toast.success(`Başlık oluşturulmuştur`, {
    //         position: "bottom-right",
    //         autoClose: 3000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       setTimeout(() => {
    //         navigate("/");
    //       }, 5000);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       const errorMessage = error.response.data.errors.join("\n");
    //       toast.error(errorMessage, {
    //         position: "bottom-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     });
    },
  });

  //   useEffect(() => {
  //     fetchGetWatchedFilmsOfUserFromAccessToken(cookies["access-token"])
  //       .then((result) => {
  //         setFilms(result.data.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, [cookies]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl mb-2 font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        İzlediğiniz film için değerlendirme oluşturun
      </h1>
      <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
        <div className="rating rating-lg rating-half">
          <input
            type="radio"
            name="rating"
            className="rating-hidden"
            onChange={(e) => {formik.handleChange()}}
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-1"
          />
          <input
            type="radio"
            name="rating"
            onChange={formik.handleChange}
            className="bg-green-500 mask mask-star-2 mask-half-2"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-green-900"
          >
            İçerik
          </label>
          <textarea
            name="content"
            placeholder="İçerik giriniz"
            className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          ></textarea>
          {formik.errors.description && formik.touched.description ? (
            <p className="mt-2 ml-3 text-[13px] text-red-600 ">
              {formik.errors.description}
            </p>
          ) : null}
        </div>

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

export default AddReview;
