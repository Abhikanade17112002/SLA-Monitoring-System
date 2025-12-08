import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Error from "../components/Error/Error404";
import Error404 from "../components/Error/Error404";


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
        ],
  }

]);
