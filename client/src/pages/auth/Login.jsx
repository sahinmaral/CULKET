import { useFormik } from "formik";
import { LoginSchema } from "../../schema";
import { fetchLogin, } from "../../services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth()

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "sahinmaral",
      password: "Abc1234.",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      fetchLogin(values.username, values.password)
        .then((result) => {

          login(result.data.data)

          toast.success(`Hoşgeldiniz ${values.username}`, {
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
            navigate("/")
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
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl ">
                Hesabınızla giriş yapın
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-green-900 "
                  >
                    Kullanıcı adı
                  </label>
                  <input
                    type="text"
                    id="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Your username"
                  />
                  {formik.errors.username && formik.touched.username ? (
                    <p className="mt-2 ml-3 text-[13px] text-red-600 ">
                      {formik.errors.username}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-green-900"
                  >
                    Şifre
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-green-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="mt-2 ml-3 text-[13px] text-red-600 ">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
                >
                  Giriş yap
                </button>
                <p className="text-sm font-light text-gray-500">
                  Hesabınız yok mu ?{" "}
                  <Link to="/auth/register">
                    <span className="font-medium text-green-700 hover:underline">
                      Buraya tıklayın
                    </span>
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-500">
                  Tekrardan email onay linki mi istersiniz ?{" "}
                  <Link to="/auth/sendEmailConfirmLink">
                    <span className="font-medium text-green-700 hover:underline">
                      Buraya tıklayın
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
