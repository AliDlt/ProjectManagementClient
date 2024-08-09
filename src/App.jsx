import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import AuthContainer from "../components/ui/auth/AuthContainer";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
import NewPasswordPage from "../pages/NewPasswordPage";
import { Toaster } from "react-hot-toast";
import AppContainer from "../components/ui/AppContainer";
import ToastMessageProvider from "../Context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserPage from "../pages/UserPage";
import ProtectPages from "../pages/ProtectPages";
import UsersPage from "../pages/UsersPage";
import ProjectsPage from "../pages/ProjectsPage";
import ReportsPage from "../pages/ReportsPage";
import Messages from "../pages/Messages";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <ToastMessageProvider>
      <StyleProvider layer>
        <ConfigProvider
          form={{
            validateMessages: true,
          }}
          theme={{
            token: {
              controlOutlineWidth: 0,
              fontFamily: "estedad",
              colorBorder: "rgb(var(--primary-color))",
            },
            components: {
              Input: {
                hoverBorderColor: "rgb(var(--primary-color))",
                activeBorderColor: "rgb(var(--primary-color))",
                colorErrorBorder: "red",
              },
              Button: {
                defaultHoverColor: "white",
                defaultHoverBg: "rgb(var(--primary-color) / 0.8)",
                defaultActiveColor: "white",
                defaultActiveBg: "rgb(var(--primary-color))",
                defaultHoverBorderColor: "rgb(var(--primary-color))",
              },
              Checkbox: {
                colorPrimary: "rgb(var(--primary-color))",
                colorPrimaryHover: "rgb(var(--primary-color) / 0.8)",
                borderRadiusSM: 6,
              },
              Select: {
                selectorBg: "transparent",
                optionSelectedBg: "rgb(var(--primary-color) / 0.8)",
                optionSelectedColor: "white",
                colorPrimary: "rgb(var(--primary-color))",
                colorPrimaryHover: "rgb(var(--primary-color))",
              },
              Slider: {
                trackBgDisabled: "rgba(var(--secondary-color))",
                handleColorDisabled: "rgba(var(--secondary-color))",
                railBg: "rgba(var(--secondary-color-300))",
                handleLineWidth: 1,
                handleSize: 15,
              },
            },
          }}
        >
          <div>
            <Toaster />
          </div>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={
                  <ProtectPages>
                    <AppContainer />
                  </ProtectPages>
                }
              >
                <Route index element={<Navigate to={"/dashboard"} replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:id" element={<ProjectsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/user/:id" element={<UserPage />} />
              </Route>
              {/* Login / Signup */}
              <Route path="/auth" element={<AuthContainer />}>
                <Route
                  index
                  element={<Navigate to={"/auth/login"} replace />}
                />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route
                  path="forgot-password"
                  element={<ForgetPasswordPage />}
                />
              </Route>
            </Routes>
          </QueryClientProvider>
        </ConfigProvider>
      </StyleProvider>
    </ToastMessageProvider>
  );
}

export default App;
