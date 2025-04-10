import { Outlet } from "react-router-dom";
import { Header } from "./ui-components/Header/Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
