import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SigninPage from "./pages/Signin.page";
import RegisterPage from "./pages/Register.page";
import HomePage from "./pages/Home.page";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "signin",
      element: <SigninPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
