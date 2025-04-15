import { Outlet } from "react-router-dom";
import { Header } from "./ui-components/Header/Header";
import { Footer } from "./ui-components/Footer/Footer";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
