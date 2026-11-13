import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { ThemeProvider, useTheme } from "../components/ThemeContext";

function ThemeShell() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className={`min-h-screen ${isDark ? "bg-[#0f0f12] text-gray-100" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <ThemeShell />
    </ThemeProvider>
  );
}