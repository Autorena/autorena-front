import { createContext, useState } from "react";

type LocationContextType = {
  location: string;
  setLocation: (city: string) => void;
};

export const LocationContext = createContext<LocationContextType>({
  location: "Москва",
  setLocation: () => {},
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState("Москва");

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
