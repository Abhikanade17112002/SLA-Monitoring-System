import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import App from "../App";
import SignUp from "../components/SignUp/SignUp";
import SignIn from "../components/SignIn/SignIn";
import Error from "../components/Error/Error";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/user",
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
      },
      {
        path: "*",
        element: <Error />,
      }
    ],
  },
]);
