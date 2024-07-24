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

function App() {
  return (
    <StyleProvider>
      <ConfigProvider
        form={{
          validateMessages: true,
        }}
        theme={{
          token: {
            controlOutlineWidth: 0,
            fontFamily: "estedad",
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
          },
        }}
      >
        <div>
          <Toaster />
        </div>
        <Routes>
          {/* <Route path="/" /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/auth" element={<AuthContainer />}>
            <Route index element={<Navigate to={"/auth/login"} replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="new-password" element={<NewPasswordPage />} />
            <Route path="forgot-password" element={<ForgetPasswordPage />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
