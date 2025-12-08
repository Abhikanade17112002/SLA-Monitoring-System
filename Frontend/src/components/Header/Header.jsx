import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { BadgeCheck } from "lucide-react";


const Header = () => {
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b">
      {/* Left Section */}
      <h1 className="text-xl font-semibold text-gray-800">
        SLA Monitoring Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-gray-700 font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.emailId}</p>
            </div>

            {/* Role Badge */}
            <span className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              <BadgeCheck className="w-3 h-3" />
              {user.role}
            </span>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
