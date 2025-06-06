import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Layout } from "./Layout";
import { Modal } from "./ui-components/Modal/Modal";
import { Home } from "./pages/Home/Home";
import { RegistrationModal } from "./components/modals/RegistrationModal";
import { CarPage } from "./pages/CarPage/CarPage";
import { ScrollToTop } from "./components/ScrollToTop";
import { ChooseCategory } from "./pages/ChooseCategory/ChooseCategory";
import { CreateListing } from "./pages/CreateListing/CreateListing";
import { PersonalProfile } from "./pages/PersonalProfile/PersonalProfile";
import { MyListings } from "./pages/MyListings/MyListings";
import { Unauthorized } from "./pages/Unauthorized/Unauthorized";
import { Develop } from "./pages/Develop/Develop";
import { BlackList } from "./pages/BlackList/BlackList";
import { FilterPage } from "./pages/FilterPage/FilterPage";
import { FilterProvider } from "./HOC/FilterContext";

export const App = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  return (
    <FilterProvider>
      <Modal />
      <ScrollToTop />
      <Routes>
        <Route path="/develop" element={<Develop />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/blacklist" element={<BlackList />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/reg" element={<RegistrationModal />} />
          <Route path="/filter/:filter" element={<FilterPage />} />
          <Route path="/:id" element={<CarPage />} />
          <Route path="/choose-category" element={<ChooseCategory />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/profile" element={<PersonalProfile />} />
          <Route path="/my-listings" element={<MyListings />} />
        </Route>
      </Routes>
    </FilterProvider>
  );
};

export default App;
