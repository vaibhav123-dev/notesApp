/* eslint-disable react/prop-types */
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex justify-center w-full mt-2">
      <div className="w-80 flex items-center px-4 bg-slate-800 dark:bg-slate-100 rounded-md">
        <input
          type="text"
          placeholder="Search Notes"
          className="w-full text-xs bg-transparent py-[11px] outline-none dark:text-slate-700 text-white"
          value={value}
          onChange={onChange}
        />

        {value && (
          <IoMdClose
            className="text-xl text-white dark:text-slate-500 cursor-pointer hover:text-black mr-3"
            onClick={onClearSearch}
          />
        )}

        <FaMagnifyingGlass
          className="dark:text-slate-400 text-white cursor-pointer hover:text-black"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
