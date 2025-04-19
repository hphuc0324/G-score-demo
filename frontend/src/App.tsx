import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";

import { publicRoutes } from "./routes";

const router = createBrowserRouter(publicRoutes);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer aria-label="" />
    </div>
  );
}

export default App;
