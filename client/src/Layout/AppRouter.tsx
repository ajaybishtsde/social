import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dummy from "../Dummy";
import Users from "../Users";
import AddUserForm from "../components/AddUserForm";
import Admin from "../Admin";
import PageNotFound from "../PageNotFound";
import DynamicRoute from "../DynamicRoute";
import Register from "../Register";
import Dashboard from "../Dashboard";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "admin",
      element: <Admin />,
      children: [
        {
          path: "dashboard",
          element: <Dummy />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "addusers",
          element: <AddUserForm />,
        },
        {
          path: "dynamicRoute/:id",
          element: <DynamicRoute />,
        },
      ],
    },
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
