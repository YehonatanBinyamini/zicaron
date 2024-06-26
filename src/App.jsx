import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/rootLayout/RootLayout";
import Error from "./pages/errorPage/Error";
import Home from "./pages/home/Home";
import NiftarimList from "./pages/niftarimList/NiftarimList";
import Login from "./pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "/List", element: <NiftarimList /> },
      { path: "/Login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
