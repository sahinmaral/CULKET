import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link} from "react-router-dom";
import { fetchGetAllByCreatedUser } from "../services/discussionService";

function MyCreatedDiscussions() {
  const { cookies } = useAuth();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetchGetAllByCreatedUser(cookies["access-token"])
      .then((result) => {
        setDiscussions(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cookies]);

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        Forumda açtığım başlıklar
      </h1>
      <ul className="menu gap-y-2 w-full">
        {discussions.map((discussion) => {
          return (
            <Link to={`/discussion/${discussion.id}`} key={discussion.id}>
              <li className="shadow flex flex-row justify-between pl-4 hover:bg-slate-100 border border-slate-200">
                <p className="hover:bg-slate-100">{discussion.header}</p>

                <div className="description hover:bg-slate-100">
                  <p>{discussion.film.title}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default MyCreatedDiscussions;
