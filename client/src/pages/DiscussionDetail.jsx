import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { fetchAddComment } from "../services/commentService";
import { fetchGetAllByDetail } from "../services/discussionService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AddCommentSchema } from "../schema";

function DiscussionDetail() {
  const { discussionId } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cookies, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchGetAllByDetail()
      .then((result) => {
        setDiscussion(result.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: "",
    },
    validationSchema: AddCommentSchema,
    onSubmit: (values) => {
      fetchAddComment({
        discussionId: discussionId,
        content: values.content,
        accessToken: cookies["access-token"],
      })
        .then(() => {
          navigate(0);
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

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <div className="bg-slate-400 bg-opacity-50 shadow-xl p-5 flex">
        <div className="flex flex-col mt-[10px]">
          <button className="btn btn-circle my-1">
            <FontAwesomeIcon icon={faArrowUp} size="lg" />
          </button>

          <p className="text-2xl text-center font-semibold text-gray-600">
            {discussion.votes}
          </p>

          <button className="btn btn-circle my-1">
            <FontAwesomeIcon icon={faArrowDown} size="lg" />
          </button>
        </div>

        <div className="flex flex-col ml-5 mt-[20px]">
          <div className="badge badge-outline badge-lg">
            {discussion.film.title}
          </div>
          <h1 className="text-2xl mt-[20px] font-semibold text-white">
            {discussion.header}
          </h1>

          <p className="text-normal mt-[20px] font-normal text-black">
            {discussion.description}
          </p>
        </div>

        <div className="flex mt-[20px] mr-[30px]">
          <p className="font-semibold mr-5">{discussion.createdUser.username}</p>
          <img
            src="https://image.tmdb.org/t/p/w500/4J1Vu6oGzt60fakP4delEPDqEhI.jpg"
            alt="..."
            className="shadow rounded-full w-[30px] h-[30px]"
          />
        </div>
      </div>
      <div className="bg-slate-400 bg-opacity-50 shadow-xl p-5 flex mt-[20px] flex-col">
        <p>{user.username} olarak yorum yazın</p>
        <form onSubmit={formik.handleSubmit}>
          <textarea
            id="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
            className="input input-bordered rounded-none pt-3 mt-2 w-full"
            placeholder="Düşünceleriniz nedir ?"
          ></textarea>
          {formik.errors.content && formik.touched.content ? (
            <p className="mt-2 ml-3 text-[13px] text-red-600 ">
              {formik.errors.content}
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-5 w-full text-white bg-blue-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600"
          >
            Yolla
          </button>
        </form>
      </div>

      <div className="bg-slate-400 bg-opacity-50 shadow-xl p-5 flex mt-[20px] flex-col mb-5">
        {discussion.comments.map((comment) => {
          return (
            <div key={comment.id} className="border-b-2 pb-5 border-opacity-25 border-b-black my-5">
              <div className="flex">
                <img
                  src="https://image.tmdb.org/t/p/w500/4J1Vu6oGzt60fakP4delEPDqEhI.jpg"
                  alt="..."
                  className="shadow rounded-full w-[30px] h-[30px]"
                />
                <p className="ml-5 font-semibold">{comment.createdUser.username}</p>
              </div>
              <p className="ml-[50px] mt-[20px]">{comment.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiscussionDetail;
