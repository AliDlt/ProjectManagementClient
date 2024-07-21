import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.jsx";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StyleProvider layer>
      <ConfigProvider
        wave={{ disabled: true }}
        theme={{
          components: {
            Input: {
              controlOutlineWidth: 0,
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </StyleProvider>
  </React.StrictMode>
);
