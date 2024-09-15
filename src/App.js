import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import NavbarTop from "./components/NavbarTop";
import { useDispatch, useSelector } from "react-redux";
import { darkMode, lightMode } from "./redux/modeSlice";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import { ConfigProvider, theme } from "antd";
import "antd/dist/reset.css"; // Import this for the Ant Design reset

function App() {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  let option = window.localStorage.getItem("mode");
  if (option !== null) {
    if (option === "dark") {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  }

  return (
    <div className={mode}>
      <ConfigProvider
        theme={{
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          // token: {
          //   colorPrimary: mode === "dark" ? "#1890ff" : "#f5222d", // Example custom color
          // },
          // components: {
          //   Input: {
          //     hoverBg: "rgb(20,20,20)",
          //     activeBg: "rgb(20,20,20)",
          //     colorFillSecondary: "rgb(20,20,20)",
          //     colorFillTertiary: "rgb(20,20,20)",
          //     addonBg: "rgb(20,20,20)",
          //     colorBgContainer: "rgb(20,20,20)",
          //   },
          // },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavbarTop />}>
              <Route path="" element={<HomePage />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
