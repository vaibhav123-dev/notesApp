import { AppLayout } from "../pages/AppLayout/AppLayout.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Login from "../pages/Login/Login.jsx";
import Home from "../pages/Home/Home.jsx";
import { Root } from "../pages/AppLayout/Root.jsx";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Home />,
      },
    ],
  },
];

export { routes };
