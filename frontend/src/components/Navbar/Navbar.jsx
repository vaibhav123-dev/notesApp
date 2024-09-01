/* eslint-disable react/prop-types */
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotes } from "../../redux/slices/noteSlice";
import { setUser } from "../../redux/slices/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.clear();
    dispatch(setUser({}));
    dispatch(setNotes([]));
    navigate("/login");
  };

  const handleMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="flex justify-between w-full md:w-auto p-2 bg-gray-800 shadow-md rounded-md m-1 dark:bg-white">
      <h2 className="text-xl font-medium dark:text-black text-white py-2">
        Notes
      </h2>

      <div className="flex gap-2">
        <button
          className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={handleMode}
        >
          <svg
            className="fill-violet-700 block dark:hidden"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
          <svg
            className="fill-yellow-500 hidden dark:block"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {user && <ProfileInfo userInfo={user} onLogout={onLogout} />}
      </div>
    </div>
  );
};

export default Navbar;
