import React from "react";
import { Link } from "react-router-dom";

function UserSettings() {
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-green-900 md:text-2xl">
        Kullanıcı ayarları
      </h1>
      <ul className="menu bg-base-200 w-full p-0 [&_li>*]:rounded-none">
        <li>
          <Link to="/userSettings/changeProfilePhoto">Profil fotoğrafını güncelle</Link>
        </li>
        <li>
          <Link to="/userSettings/clearProfilePhoto">Profil fotoğrafını sil</Link>
        </li>
      </ul>
    </div>
  );
}

export default UserSettings;
