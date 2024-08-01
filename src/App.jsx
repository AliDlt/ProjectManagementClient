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
import ManagersPage from "../pages/ManagersPage";
import AppContainer from "../components/ui/AppContainer";
import ManagerPage from "../pages/ManagerPage";
import ToastMessageProvider from "../Context/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserPage from "../pages/UserPage";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
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
                colorPrimary: "rgb(var(--primary-color))",
                colorPrimaryHover: "rgb(var(--primary-color))",
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
              <Route path="/" element={<AppContainer />}>
                <Route path="/user" element={<UserPage />} />
                <Route index element={<Navigate to={"/dashboard"} replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/managers" element={<ManagersPage />} />
                <Route path="/managers/:managerId" element={<ManagerPage />} />
                <Route path="/observers" element={<SignupPage />} />
                <Route path="/contractors" element={<NewPasswordPage />} />
                <Route path="/reports" element={<NewPasswordPage />} />
                <Route path="/messages" element={<NewPasswordPage />} />
                <Route path="/projects" element={<NewPasswordPage />} />
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
