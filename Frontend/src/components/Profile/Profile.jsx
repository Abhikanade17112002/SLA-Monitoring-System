import React from "react";
import { useSelector } from "react-redux";
import { Shield, Mail, User, IdCard } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white px-6 py-12 flex justify-center">

      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 
                      rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-10">

        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Your Profile
        </h1>

        {/* Profile Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT SECTION — Profile Illustration */}
          <div className="flex justify-center items-center">
            <div className="w-48 h-48 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 
                            shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                alt="Profile Icon"
                className="w-28 opacity-90"
              />
            </div>
          </div>

          {/* RIGHT SECTION — USER DETAILS */}
          <div className="space-y-5">

            {/* Full Name */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <User className="text-blue-400 w-6 h-6" />
              <div>
                <p className="text-gray-400 text-sm">Full Name</p>
                <p className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>

            {/* Username */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <IdCard className="text-blue-400 w-6 h-6" />
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-lg font-medium">{user.userName}</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <Mail className="text-blue-400 w-6 h-6" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-lg font-medium">{user.emailId}</p>
              </div>
            </div>

            {/* Role */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <Shield className="text-blue-400 w-6 h-6" />
              <div>
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-lg font-semibold text-blue-400">
                  {user.role}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* JWT Token Section */}
        <div className="mt-12 bg-black/30 border border-white/10 p-5 rounded-xl">
          <p className="text-gray-400 text-sm mb-2">JWT Token</p>
          <p className="text-xs break-words text-gray-300 bg-black/40 p-3 rounded-lg border border-white/10">
            {user.jwtToken}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
