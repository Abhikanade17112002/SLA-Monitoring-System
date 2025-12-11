// import React, { useState, useEffect } from "react";
// import { 
//   Users, 
//   Shield, 
//   Code, 
//   User as UserIcon,
//   Mail, 
//   Search,
//   Filter,
//   MoreVertical,
//   Edit,
//   Trash2,
//   UserCheck,
//   Crown
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import axios from "axios";

// const UserManagement = () => {
//   const authState = useSelector(
//     (state) => state.auth
//   )
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterRole, setFilterRole] = useState("All");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showActions, setShowActions] = useState(null);
//   const [ currentLoggedInUser , setCurrentLoggedInUser] = useState({});

//   console.log("currentLoggedInUser ==> ");
//   console.log(currentLoggedInUser);
  
//   useEffect(()=>{
//      setCurrentLoggedInUser( authState.user);
//   },[authState])

//  const fetchRegisteredList = async ()=>{
         
//     try {
        
//         const response = await axios.get(`${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}/users`,{
//             headers: {
//                     Authorization: `${JSON.parse(localStorage.getItem("jwtToken"))}` 
//                 }

//         } );

//         const data   = await response.data ;
        
//         const filteredUsers = data?.filter((user)=>{
//             return user.userId !== currentLoggedInUser.userId}
//         ) ;
//         console.log(filteredUsers);
        
//         setUsers(filteredUsers) ;
//         setLoading(false);
//     } catch (error) {

//         console.log(error);
        
        
//     }
//  }
//   useEffect( () => {
//   fetchRegisteredList();
//   }, [currentLoggedInUser]);

//   const getRoleIcon = (role) => {
//     switch (role) {
//       case "Admin":
//         return <Shield size={18} className="text-purple-400" />;
//       case "Developer":
//         return <Code size={18} className="text-cyan-400" />;
//       default:
//         return <UserIcon size={18} className="text-gray-400" />;
//     }
//   };

//   const getRoleBadgeStyle = (role) => {
//     switch (role) {
//       case "Admin":
//         return "from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-300";
//       case "Developer":
//         return "from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300";
//       default:
//         return "from-gray-500/20 to-gray-600/20 border-gray-500/40 text-gray-300";
//     }
//   };

//   const getAvatarColor = (role) => {
//     switch (role) {
//       case "Admin":
//         return "from-purple-500 via-pink-500 to-red-500";
//       case "Developer":
//         return "from-cyan-500 via-blue-500 to-indigo-500";
//       default:
//         return "from-gray-500 via-gray-600 to-gray-700";
//     }
//   };

//   // Filter users
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = 
//       user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.emailId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesRole = filterRole === "All" || user.role === filterRole;
    
//     return matchesSearch && matchesRole;
//   });

//   const roleStats = {
//     all: users.length,
//     admin: users.filter(u => u.role === "Admin").length,
//     developer: users.filter(u => u.role === "Developer").length,
//     user: users.filter(u => u.role === "User").length
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
//             <div className="absolute inset-0 rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 animate-ping opacity-20 mx-auto"></div>
//           </div>
//           <p className="text-gray-300 font-medium mt-6 text-lg">Loading users...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
        
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
//             User Management
//           </h1>
//           <p className="text-gray-400">Manage and monitor registered users</p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
//                 <Users size={24} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Total Users</p>
//                 <p className="text-white text-2xl font-bold">{roleStats.all}</p>
//               </div>
//             </div>
//           </div>

//           <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
//                 <Shield size={24} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Admins</p>
//                 <p className="text-white text-2xl font-bold">{roleStats.admin}</p>
//               </div>
//             </div>
//           </div>

//           <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
//                 <Code size={24} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Developers</p>
//                 <p className="text-white text-2xl font-bold">{roleStats.developer}</p>
//               </div>
//             </div>
//           </div>

//           <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
//             <div className="flex items-center gap-3">
//               <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
//                 <UserIcon size={24} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-gray-400 text-sm">Regular Users</p>
//                 <p className="text-white text-2xl font-bold">{roleStats.user}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Search and Filter Bar */}
//         <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
//           <div className="flex flex-col md:flex-row gap-4">
//             {/* Search */}
//             <div className="flex-1 relative">
//               <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search by name, email, or username..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
//               />
//             </div>

//             {/* Role Filter */}
//             <div className="relative">
//               <Filter size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <select
//                 value={filterRole}
//                 onChange={(e) => setFilterRole(e.target.value)}
//                 className="pl-12 pr-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer min-w-[180px]"
//               >
//                 <option value="All">All Roles</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Developer">Developer</option>
//                 <option value="User">User</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Users Grid */}
//         {filteredUsers.length === 0 ? (
//           <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
//             <div className="w-20 h-20 bg-gray-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
//               <Users size={40} className="text-gray-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-2">No Users Found</h3>
//             <p className="text-gray-400">Try adjusting your search or filter criteria</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//             {filteredUsers.map((user) => (
//               <div
//                 key={user.userId}
//                 className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300 relative"
//               >
//                 {/* Role Badge (Top Right) */}
//                 <div className="absolute top-4 right-4">
//                   <div className={`
//                     flex items-center gap-2 px-3 py-1.5 rounded-xl 
//                     bg-gradient-to-r border font-semibold text-xs
//                     ${getRoleBadgeStyle(user.role)}
//                   `}>
//                     {getRoleIcon(user.role)}
//                     {user.role}
//                   </div>
//                 </div>

//                 {/* User Avatar */}
//                 <div className="flex justify-center mb-4">
//                   <div className={`
//                     w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(user.role)}
//                     flex items-center justify-center text-white text-2xl font-bold shadow-lg
//                   `}>
//                     {user.firstName.charAt(0)}{user.lastName.charAt(0)}
//                   </div>
//                 </div>

//                 {/* User Info */}
//                 <div className="text-center mb-4">
//                   <h3 className="text-xl font-bold text-white mb-1">
//                     {user.firstName} {user.lastName}
//                   </h3>
//                   <p className="text-gray-400 text-sm">@{user.userName}</p>
//                 </div>

//                 {/* Details */}
//                 <div className="space-y-3 mb-4">
//                   <div className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-xl">
//                     <Mail size={16} className="text-cyan-400" />
//                     <span className="text-gray-300 truncate">{user.emailId}</span>
//                   </div>

//                   <div className="flex items-center gap-2 text-sm bg-white/5 p-3 rounded-xl">
//                     <UserCheck size={16} className="text-purple-400" />
//                     <span className="text-gray-400">User ID:</span>
//                     <span className="text-gray-300 font-mono text-xs truncate">
//                       {user.userId.substring(0, 8)}...
//                     </span>
//                   </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2">

//                   <button
//                     className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all transform hover:scale-105"
//                   >
//                     <Trash2 size={16} />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Results Info */}
//         {filteredUsers.length > 0 && (
//           <div className="text-center">
//             <p className="text-gray-400 text-sm">
//               Showing {filteredUsers.length} of {users.length} users
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserManagement;



import React, { useState, useEffect } from "react";
import { 
  Users, 
  Shield, 
  Code, 
  User,
  Mail, 
  Search,
  Filter,
  Trash2,
  UserCheck,
  AlertTriangle,
  X
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ user, onConfirm, onCancel, isDeleting }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm 
                  flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onCancel}
    >
      <div 
        className="bg-gradient-to-br from-slate-900 to-slate-800 
                    border border-red-500/30 rounded-2xl 
                    p-8 w-full max-w-md text-white 
                    shadow-[0_0_50px_rgba(239,68,68,0.3)] 
                    relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500/40">
            <AlertTriangle size={40} className="text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Delete User Account
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          This action cannot be undone
        </p>

        {/* User Info */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </div>
            <div>
              <p className="text-white font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-gray-400 text-sm">@{user.userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Mail size={14} className="text-red-400" />
            <span className="truncate">{user.emailId}</span>
          </div>
        </div>

        {/* Warning Message */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-300 text-sm text-center">
            ⚠️ Deleting this user will remove all their data, API configurations, 
            and monitoring settings permanently.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 
                       text-gray-300 rounded-xl hover:bg-white/10 
                       transition-all duration-200 font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl 
                       hover:bg-red-700 active:scale-[0.98]
                       transition-all duration-200 font-medium
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-red-500/30 hover:shadow-red-500/50
                       flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white 
                                rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={18} />
                Delete User
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


const UserManagement = () => {
  const authState = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState({});
  const [deleteModal, setDeleteModal] = useState({ show: false, user: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    setCurrentLoggedInUser(authState.user);
  }, [authState]);

  const fetchRegisteredList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}/users`,
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("jwtToken"))}`,
          },
        }
      );

      const data = await response.data;
      const filteredUsers = data?.filter((user) => {
        return user.userId !== currentLoggedInUser.userId;
      });

      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      showNotification("Failed to fetch users", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentLoggedInUser.userId) {
      fetchRegisteredList();
    }
  }, [currentLoggedInUser]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 4000);
  };

  const handleDeleteClick = (user) => {
    setDeleteModal({ show: true, user });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.user) return;

    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_AUTH_SERVICE_BASE_URL}/delete/${deleteModal.user.userId}`,
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("jwtToken"))}`,
          },
        }
      );

      // Check if deletion was successful (boolean response or status code)
      if (response.data === true || response.status === 200) {
        // Remove user from local state
        setUsers(users.filter((u) => u.userId !== deleteModal.user.userId));
        showNotification(
          `User ${deleteModal.user.firstName} ${deleteModal.user.lastName} has been deleted successfully`,
          "success"
        );
      } else {
        showNotification("Failed to delete user", "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showNotification(
        error.response?.data?.message || "Failed to delete user. Please try again.",
        "error"
      );
    } finally {
      setIsDeleting(false);
      setDeleteModal({ show: false, user: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, user: null });
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <Shield size={18} className="text-purple-400" />;
      case "Developer":
        return <Code size={18} className="text-cyan-400" />;
      default:
        return <User size={18} className="text-gray-400" />;
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

  const filteredUsers = users.filter((user) => {
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
    admin: users.filter((u) => u.role === "Admin").length,
    developer: users.filter((u) => u.role === "Developer").length,
    user: users.filter((u) => u.role === "User").length,
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
        {/* Notification Toast */}
        {notification.show && (
          <div className="fixed top-6 right-6 z-50 animate-fadeIn">
            <div
              className={`
                px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-xl
                ${
                  notification.type === "success"
                    ? "bg-green-500/20 border-green-500/40 text-green-300"
                    : "bg-red-500/20 border-red-500/40 text-red-300"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    notification.type === "success" ? "bg-green-400" : "bg-red-400"
                  } animate-pulse`}
                />
                <p className="font-medium">{notification.message}</p>
                <button
                  onClick={() => setNotification({ show: false, message: "", type: "" })}
                  className="ml-2 hover:opacity-70 transition-opacity"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

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
                <User size={24} className="text-white" />
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
            <div className="flex-1 relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by name, email, or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
              />
            </div>

            <div className="relative">
              <Filter
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
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
                {/* Role Badge */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-xl 
                    bg-gradient-to-r border font-semibold text-xs
                    ${getRoleBadgeStyle(user.role)}
                  `}
                  >
                    {getRoleIcon(user.role)}
                    {user.role}
                  </div>
                </div>

                {/* User Avatar */}
                <div className="flex justify-center mb-4">
                  <div
                    className={`
                    w-20 h-20 rounded-full bg-gradient-to-br ${getAvatarColor(user.role)}
                    flex items-center justify-center text-white text-2xl font-bold shadow-lg
                  `}
                  >
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
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
                    onClick={() => handleDeleteClick(user)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                               bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl 
                               hover:bg-red-500/30 transition-all transform hover:scale-105
                               active:scale-95"
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

      {/* Delete Confirmation Modal */}
      {deleteModal.show && deleteModal.user && (
        <DeleteConfirmationModal
          user={deleteModal.user}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default UserManagement;