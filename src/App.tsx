import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.scss";
import { Layout } from "./Layout";
import { Modal } from "./ui-components/Modal/Modal";
import { ScrollToTop } from "./components/ScrollToTop";
import { FilterProvider } from "./HOC/FilterContext";
import { LocationProvider } from "./HOC/LocationProvider";
import { Loader } from "./ui-components/Loader/Loader";

const Home = lazy(() =>
  import("./pages/Home/Home").then((module) => ({ default: module.Home }))
);
const RegistrationModal = lazy(() =>
  import("./components/modals/RegistrationModal").then((module) => ({
    default: module.RegistrationModal,
  }))
);
const CarPage = lazy(() =>
  import("./pages/CarPage/CarPage").then((module) => ({
    default: module.CarPage,
  }))
);
const ChooseCategory = lazy(() =>
  import("./pages/ChooseCategory/ChooseCategory").then((module) => ({
    default: module.ChooseCategory,
  }))
);
const CreateListing = lazy(() =>
  import("./pages/CreateListing/CreateListing").then((module) => ({
    default: module.CreateListing,
  }))
);
const PersonalProfile = lazy(() =>
  import("./pages/PersonalProfile/PersonalProfile").then((module) => ({
    default: module.PersonalProfile,
  }))
);
const MyListings = lazy(() =>
  import("./pages/MyListings/MyListings").then((module) => ({
    default: module.MyListings,
  }))
);
const Unauthorized = lazy(() =>
  import("./pages/Unauthorized/Unauthorized").then((module) => ({
    default: module.Unauthorized,
  }))
);
const Develop = lazy(() =>
  import("./pages/Develop/Develop").then((module) => ({
    default: module.Develop,
  }))
);
const BlackList = lazy(() =>
  import("./pages/BlackList/BlackList").then((module) => ({
    default: module.BlackList,
  }))
);
const FilterPage = lazy(() =>
  import("./pages/FilterPage/FilterPage").then((module) => ({
    default: module.FilterPage,
  }))
);
const Favorites = lazy(() =>
  import("./pages/Favorites/Favorites").then((module) => ({
    default: module.Favorites,
  }))
);
const Notifications = lazy(() =>
  import("./pages/Notifications/Notifications").then((module) => ({
    default: module.Notifications,
  }))
);
const Messages = lazy(() =>
  import("./pages/Messages/Messages").then((module) => ({
    default: module.Messages,
  }))
);

export const App = () => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  return (
    <LocationProvider>
      <FilterProvider>
        <Modal />
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
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
              <Route path="/my_listings" element={<MyListings />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
            </Route>
          </Routes>
        </Suspense>
      </FilterProvider>
    </LocationProvider>
  );
};

export default App;
