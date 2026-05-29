import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Answers from "../pages/Answers";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Quiz from "../pages/Quiz";
import Reslult from "../pages/Result";
import Register from "../pages/Register";
import Topic from "../pages/Topic";
import QuizRedo from "../pages/Quiz/QuizRedo";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "quiz-redo/:id",
            element: <QuizRedo />,
          },
          {
            path: "result/:id",
            element: <Reslult />,
          },
          {
            path: "answers",
            element: <Answers />,
          },
          {
            path: "topics",
            element: <Topic />,
          },
        ],
      },
    ],
  },
];
