import React, { useState, useEffect } from "react";
import { 
  Users, 
  Shield, 
  Code, 
  User as UserIcon,
  Mail, 
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  Crown
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActions, setShowActions] = useState(null);

  // Mock data - Replace with your API call
  useEffect(() => {
    const mockUsers = [
      {
        userId: "8cb9ab29-63fd-407c-8d81-77da66cf0539",
        firstName: "Amey",
        lastName: "Taware",
        emailId: "amey.taware@gmail.com",
        userName: "AmeyTaware20693",
        role: "User"
      },
      {
        userId: "4f49ea9d-1778-436e-aa8b-03fc7815a596",
        firstName: "Govind",
        lastName: "Sharma",
        emailId: "govind.sharma@gmail.com",
        userName: "GovindSharma66521",
        role: "Developer"
      },
      {
        userId: "282c3a9f-d103-4310-975d-416889492df9",
        firstName: "Abhishek",
        lastName: "Kanade",
        emailId: "abhikanade301@gmail.com",
        userName: "AbhishekKanade24046",
        role: "Admin"
      },
      {
        userId: "8b341b2f-52e3-44c3-88f3-2f8bc113871b",
        firstName: "Dipali",
        lastName: "Rajbhar",
        emailId: "dipali.rajbhar@encora.com",
        userName: "DipaliRajbhar73756",
        role: "User"
      }
    ];
    
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <Shield size={18} className="text-purple-400" />;
      case "Developer":
        return <Code size={18} className="text-cyan-400" />;
      default:
        return <UserIcon size={18} className="text-gray-400" />;
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case "Admin":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300";
      case "Developer":
        return "from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300";
      default:
        return "from-gray-500/20 to-gray-600/20 border-gray-500/40 text-gray-300";
    }
  };

  const getAvatarColor = (role) => {
    switch (role) {
      case "Admin":
        return "from-purple-500 via-pink-500 to-red-500";
      case "Developer":
        return "from-cyan-500 via-blue-500 to-indigo-500";
      default:
        return "from-gray-500 via-gray-600 to-gray-700";
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "All" || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const roleStats = {
    all: users.length,
    admin: users.filter(u => u.role === "Admin").length,
    developer: users.filter(u => u.role === "Developer").length,
    user: users.filter(u => u.role === "User").length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 animate-ping opacity-20 mx-auto"></div>
          </div>
          <p className="text-gray-300 font-medium mt-6 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            User Management
          </h1>
          <p className="text-gray-400">Manage and monitor registered users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-white text-2xl font-bold">{roleStats.all}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Shield size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Admins</p>
                <p className="text-white text-2xl font-bold">{roleStats.admin}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Code size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Developers</p>
                <p className="text-white text-2xl font-bold">{roleStats.developer}</p>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
                <UserIcon size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Regular Users</p>
                <p className="text-white text-2xl font-bold">{roleStats.user}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <Filter size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer min-w-[180px]"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Developer">Developer</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Grid */}
        {filteredUsers.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={40} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.userId}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 relative"
              >
                {/* Role Badge (Top Right) */}
                <div className="absolute top-4 right-4">
                  <div className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-xl 
                    bg-gradient-to-r border font-semibold text-xs
                    ${getRoleBadgeStyle(user.role)}
                  `}>
                    {getRoleIcon(user.role)}
                    {user.role}
                  </div>
                </div>

                {/* User Avatar */}
                <div className="flex justify-center mb-4">
                  <div className={`
                    w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(user.role)}
                    flex items-center justify-center text-white text-2xl font-bold shadow-lg
                  `}>
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-400 text-sm">@{user.userName}</p>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-xl">
                    <Mail size={16} className="text-cyan-400" />
                    <span className="text-gray-300 truncate">{user.emailId}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-xl">
                    <UserCheck size={16} className="text-purple-400" />
                    <span className="text-gray-400">User ID:</span>
                    <span className="text-gray-300 font-mono text-xs truncate">
                      {user.userId.substring(0, 8)}...
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all transform hover:scale-105"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all transform hover:scale-105"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Info */}
        {filteredUsers.length > 0 && (
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;