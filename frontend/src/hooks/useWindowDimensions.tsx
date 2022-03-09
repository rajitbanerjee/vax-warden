import { useState, useEffect } from "react";

export interface WindowDimensions {
  height: number;
  width: number;
}

const getWindowDimensions = (): WindowDimensions => {
  return { width: window.innerWidth, height: window.innerHeight };
};

export default function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
