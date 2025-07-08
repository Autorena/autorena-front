import { createContext, useState, useEffect } from "react";
import { useAutoDetectCity } from "../hooks/useAutoDetectCity";

type LocationContextType = {
  location: string;
  setLocation: (city: string) => void;
  autoDetectCity: () => void;
  isDetecting: boolean;
  detectedCity: { name: string } | null;
};

export const LocationContext = createContext<LocationContextType>({
  location: "Москва",
  setLocation: () => {},
  autoDetectCity: () => {},
  isDetecting: false,
  detectedCity: null,
});

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState("Москва");
  const { detectedCity, isDetecting, detectCity } = useAutoDetectCity();

  useEffect(() => {
    detectCity();
  }, []);

  useEffect(() => {
    if (detectedCity) {
      setLocation(detectedCity.name);
      localStorage.setItem("userCity", detectedCity.name);
    }
  }, [detectedCity]);

  const handleSetLocation = (city: string) => {
    setLocation(city);
    localStorage.setItem("userCity", city);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation: handleSetLocation,
        autoDetectCity: detectCity,
        isDetecting,
        detectedCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
