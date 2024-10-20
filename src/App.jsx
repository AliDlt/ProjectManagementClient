import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import { ConfigProvider } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import AuthContainer from "../components/ui/auth/AuthContainer";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ForgetPasswordPage from "../pages/ForgetPasswordPage";
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
import SettingPage from "../pages/SettingPage";
import ReportPage from "../pages/ReportPage";
import Message from "../pages/Message";
import AddUser from "../pages/AddUser";
import AddReport from "../pages/AddReport";
import SingleProjectPage from "../pages/SingleProjectPage";
import AddMessage from "../pages/AddMessage";
import SingleProjectGallery from "../pages/SingleProjectGallery";
import AddNewProject from "../pages/AddNewProject";
import NotFound from "../pages/NotFound";
import UserReports from "../pages/UserReports";
import dayjs from "dayjs";
import UserProjectsPage from "../pages/UserProjectsPage";
import ApplicantsCategoryPage from "../pages/ApplicantsCategoryPage";
import SingleApplicantCategoryPage from "../pages/SingleApplicantCategoryPage";
import ProtectApplicantsPage from "../pages/ProtectApplicantsPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryComponent from "../layout/ErrorBoundaryComponnet";
import ReportCategories from "../pages/ReportCategories";
import AddNewCategory from "../pages/AddNewProjectCategory";
import AddNewProjectCategory from "../pages/AddNewProjectCategory";
import EditCategory from "../pages/EditProjectCategory";
import EditProjectCategory from "../pages/EditProjectCategory";
import AddNewReportCategory from "../pages/AddNewReportCategory";

function App() {
  dayjs.calendar("jalali");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorBoundaryComponent}>
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
                  optionActiveBg: "transparent",
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
            <QueryClientProvider client={queryClient}>
              <div>
                <Toaster />
              </div>
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
                  <Route
                    index
                    element={<Navigate to={"/dashboard"} replace />}
                  />
                  <Route
                    path="/dashboard"
                    element={<DashboardPage key={Date.now()} />}
                  />

                  <Route path="/setting" element={<SettingPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/reports-categories" element={<ReportCategories />} />
                  <Route path="/userReports/:id" element={<UserReports />} />
                  <Route path="/add-user" element={<AddUser />} />
                  <Route path="/reports/:id" element={<ReportPage />} />
                  <Route path="/add-report" element={<AddReport />} />
                  <Route path="/add-report/add-new-category" element={<AddNewReportCategory />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/add-ticket" element={<AddMessage />} />
                  <Route path="/message/:id" element={<Message />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route
                    path="/projects/new-project/add-new-category"
                    element={<AddNewProjectCategory />}
                  />
                  <Route
                    path="/projects/new-project/edit-category"
                    element={<EditProjectCategory />}
                  />
                  <Route element={<ProtectApplicantsPage />}>
                    <Route
                      path="/applicants"
                      element={<ApplicantsCategoryPage />}
                    />
                    <Route
                      path="/applicants/:applicantId"
                      element={<SingleApplicantCategoryPage />}
                    />
                  </Route>
                  <Route
                    path="/projects/new-project"
                    element={<AddNewProject />}
                  />
                  <Route path="/projects/:id" element={<SingleProjectPage />} />
                  <Route
                    path="/projects/gallery/:projectId"
                    element={<SingleProjectGallery />}
                  />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/users/:id" element={<UserPage />} />
                  <Route
                    path="/users/project/:userId"
                    element={<UserProjectsPage />}
                  />
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
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </QueryClientProvider>
          </ConfigProvider>
        </StyleProvider>
      </ToastMessageProvider>
    </ErrorBoundary>
  );
}

export default App;
