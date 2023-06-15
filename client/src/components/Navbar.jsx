import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchFilmInput from "./SearchFilmInput";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <label htmlFor="drawer-main" className="btn btn-square btn-ghost">
        <FontAwesomeIcon
          icon={faBars}
          size="lg"
          className="text-gray-500 w-[20px] h-[20px]"
        />
        </label>
      </div>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">CULKET</Link>
        <SearchFilmInput />
      </div>
      <div className="flex-none mr-5 block md:hidden">
        <FontAwesomeIcon
          icon={faSearch}
          size="lg"
          className="text-gray-500 w-[20px] h-[20px]"
        />
      </div>
    </div>
  );
}

export default Navbar;
