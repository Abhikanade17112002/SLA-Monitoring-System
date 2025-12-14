import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Error from "../components/Error/Error404";
import Error404 from "../components/Error/Error404";
import Profile from "../components/Profile/Profile";
import Unauthorized from "../components/Error/Unauthorized";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "../components/AdminLayout/AdminLayout";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard";
import AdminManagedApis from "../components/AdminManagedApis/AdminManagedApis";
import ApiThresholdConfigs from "../components/ApiThresholdConfigs/ApiThresholdConfigs";
import IncidentDetailsCard from "../components/ApiIncidents/IncidentDetailsCard";
import ApiDetails from "../components/ApiDetails/ApiDetails";
import EditApiDetails from "../components/EditApiDetails/EditApiDetails";
import AlertList from "../components/AlertsList/AlertsList";
import UserManagement from "../components/UserManagement/UserManagement";
import SLAReportPopUpModal from "../components/SLAReportPopUpModal/SLAReportPopUpModal";
import AdminSLAReport from "../components/AdminSLAReport/AdminSLAReport";
import SessionExpired from "../components/Error/SessionExpired";
import DeveloperLayout from "../components/DeveloperLayout/DeveloperLayout";
import DeveloperDashboard from "../components/DeveloperDashboard/DeveloperDashboard";
import DeveloperManagedApis from "../components/DeveloperManagedApis/DeveloperManagedApis";
import DeveloperSLAReport from "../components/DeveloperSLAReport/DeveloperSLAReport";
import UserManagedApis from "../components/UserManagedApis/UserManagedApis";
import UserDashboard from "../components/UserDashBoard/UserDashBoard";
import UsersSLAReport from "../components/UsersSLAReport/UsersSLAReport";
import UserLayout from "../components/UserLayout/UserLayout";
import LiveDashboard from "../components/LiveDashBoard/LiveDashBoard";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404 />,
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <App />,
      }
    ],
  },
 {
    path: "/user",
    errorElement: <Error404 />,
        children: [
          {
            path: "signin",
            element: <SignIn/>,
          },
          {
            path: "signup",
            element: <SignUp/>,
          },
          {
            path:"profile" ,
           element: <ProtectedRoute allowedRoles={["ADMIN","USER","DEVELOPER"]}    > <Profile/> </ProtectedRoute>,
           children:[
             {
               path:"" ,
               element:<Profile/>
             }
           ]
          }
        ],
  },

  {
  path: "/admin",
  element: <ProtectedRoute  allowedRoles={["ADMIN"]}> <AdminLayout /> </ProtectedRoute>,
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "apis", element: <AdminManagedApis /> },
    { path: "thresholds", element: <ApiThresholdConfigs /> },
    { path: "alerts", element: <AlertList /> },
    { path: "users", element: <UserManagement /> },
    { path: "incidents", element: <IncidentDetailsCard /> },
    { path: "reports", element: <AdminSLAReport /> },
    // { path: "system", element: <SystemSettings /> }
    {
      path : "api/:apiId" ,
      element :<ApiDetails/>
    },
    {
      path : "api/update/:apiId" ,
      element :<EditApiDetails/>

    }
  ]
},
{
  path: "/developer",
  element: <ProtectedRoute  allowedRoles={["DEVELOPER","ADMIN"]}> <DeveloperLayout /> </ProtectedRoute>,
  children: [
    { path: "dashboard", element: <DeveloperDashboard /> },
    { path: "apis", element: <DeveloperManagedApis /> },
    { path: "thresholds", element: <ApiThresholdConfigs /> },
    { path: "alerts", element: <AlertList /> },
    { path: "users", element: <UserManagement /> },
    { path: "incidents", element: <IncidentDetailsCard /> },
    { path: "reports", element: <DeveloperSLAReport /> },

    {
      path : "api/:apiId" ,
      element :<ApiDetails/>
    },
    {
      path : "api/update/:apiId" ,
      element :<EditApiDetails/>

    }
  ]
},
{
  path: "/user",
  element: <ProtectedRoute  allowedRoles={["USER","ADMIN"]}> <UserLayout /> </ProtectedRoute>,
  children: [
    { path: "dashboard", element: <UserDashboard /> },
    { path: "apis", element: <UserManagedApis /> },
    { path: "incidents", element: <IncidentDetailsCard /> },
    { path: "reports", element: <UsersSLAReport /> },

    {
      path : "api/:apiId" ,
      element :<ApiDetails/>
    },
    {
      path : "api/update/:apiId" ,
      element :  <ProtectedRoute allowedRoles={["DEVELOPER","ADMIN","USER"]}> <EditApiDetails/> </ProtectedRoute>
    }
  ]
},
{
  path:"live/dashboard",
  element: <LiveDashboard/>
}
,

  {
    path:"/unauthorized" ,
    element : <Unauthorized/>
  },
  {
    path:"/sessionexpired" ,
    element : <SessionExpired/>
  }

]);
