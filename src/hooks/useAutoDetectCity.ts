import { useState } from "react";
import { useGetNearestCityQuery } from "../redux/citiesApi";
import React from "react";

export const useAutoDetectCity = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedCity, setDetectedCity] = useState<{ name: string } | null>(
    null
  );

  const { data, isFetching } = useGetNearestCityQuery(coords!, {
    skip: !coords,
  });

  const detectCity = () => {
    setIsDetecting(true);
    setDetectedCity(null);

    if (!navigator.geolocation) {
      setIsDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        setIsDetecting(false);
      }
    );
  };

  React.useEffect(() => {
    if (data?.town) {
      setDetectedCity({ name: data.town.name });
      setIsDetecting(false);
    } else if (!isFetching && coords) {
      setIsDetecting(false);
    }
  }, [data, isFetching, coords]);

  return {
    detectedCity,
    isDetecting: isDetecting || isFetching,
    detectCity,
  };
};
