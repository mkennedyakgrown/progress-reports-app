import App from "./App.tsx";
import Home from "./Pages/Home.tsx";
import Login from "./Pages/Login.js";
import Reports from "./Pages/Reports.tsx";
import Admin from "./Pages/Admin.tsx";
import ErrorPage from "./Pages/ErrorPage.tsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/reports", element: <Reports /> },
      { path: "/reports/users/:userId", element: <Reports /> },
      { path: "/admin", element: <Admin /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
];

export default routes;
