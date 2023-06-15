import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBucket,
  faFilm,
  faList,
  faPen,
  faGear,
  faRightFromBracket,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function MainDrawerMenu() {
  const { logout } = useAuth();

  return (
    <Fragment>
      <ul className="menu mt-4">
        <li className="flex flex-row w-full">
          <Link
            to="/addWantWatchFilms"
            className="w-full flex flex-row justify-center"
          >
            <FontAwesomeIcon icon={faBucket} size="lg" />
            <p className="w-[200px]">Film ekle</p>
          </Link>
        </li>
        <li className="flex flex-row w-full">
          <Link
            to="/addDiscussion"
            className="w-full flex flex-row justify-center"
          >
            <FontAwesomeIcon icon={faPen} size="lg" />
            <p className="w-[200px]">Forumda başlık ekle</p>
          </Link>
        </li>
        <li className="flex flex-row w-full">
          <Link
            to="/watchedFilms"
            className="w-full flex flex-row justify-center"
          >
            <FontAwesomeIcon icon={faFilm} size="lg" />
            <p className="w-[200px]">İzlediğim fimler</p>
          </Link>
        </li>
        <li className="flex flex-row w-full">
          <Link
            to="/wantedWatchFilms"
            className="w-full flex flex-row justify-center"
          >
            <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
            <p className="w-[200px]">İzleyeceğim filmler</p>
          </Link>
        </li>
        <li className="flex flex-row w-full">
          <Link
            to="/myCreatedDiscussions"
            className="w-full flex flex-row justify-center"
          >
            <FontAwesomeIcon icon={faList} size="lg" />
            <p className="w-[200px]">Forumda açtığım başlıklarım</p>
          </Link>
        </li>
      </ul>
      <ul className="menu absolute bottom-0 w-full">
        <li className="flex flex-row w-full">
          <Link
            to="/userSettings"
            className="w-full flex flex-row justify-center"
          >
            <FontAwesomeIcon icon={faGear} size="lg" />
            <p className="w-[200px]">Ayarlar</p>
          </Link>
        </li>
        <li className="flex flex-row w-full">
          <div
            className="w-full flex flex-row justify-center"
            onClick={() => logout()}
          >
            <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
            <p className="w-[200px]">Çıkış yap</p>
          </div>
        </li>
      </ul>
    </Fragment>
  );
}

export default MainDrawerMenu;
