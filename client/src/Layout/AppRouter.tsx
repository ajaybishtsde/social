import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dummy from "../Dummy";
import Users from "../Users";
import AddUserForm from "../components/AddUserForm";
import Admin from "../Admin";
import PageNotFound from "../PageNotFound";

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "admin",
      element: <Admin/>,
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
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
