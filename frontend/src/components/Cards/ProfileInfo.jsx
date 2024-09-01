/* eslint-disable react/prop-types */
import { Badge, Avatar } from "@material-tailwind/react";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3 mr-2">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          <Badge
            placement="top-end"
            overlap="circular"
            color="green"
            withBorder
          >
            <Avatar src={userInfo?.avatar} alt="avatar" />
          </Badge>
        </div>

        <div>
          <button
            onClick={onLogout}
            className="bg-white hover:bg-blue-700 dark:bg-gray-800 text-black dark:text-white font-bold py-1 px-4 rounded"
          >
            {userInfo.fullName ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;
