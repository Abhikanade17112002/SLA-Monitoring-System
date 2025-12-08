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
    // { path: "alerts", element: <AlertsPage /> },
    // { path: "users", element: <UsersManagement /> },
    { path: "incidents", element: <IncidentDetailsCard /> },
    // { path: "reports", element: <SLAReports /> },
    // { path: "system", element: <SystemSettings /> }
  ]
},
  {
    path:"/unauthorized" ,
    element : <Unauthorized/>
  }

]);
