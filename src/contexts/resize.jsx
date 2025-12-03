import { createContext, useEffect, useState } from "react";

export const ResizeContext = createContext();

export const ResizeProvider = ({ children }) => {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [size, setSize] = useState(() => Math.min(Math.floor(window.innerWidth / 9), 56));

  useEffect(function () {
    function onResize() {
      setWidth(window.innerWidth);
      setSize(Math.min(Math.floor(window.innerWidth / 9), 56));
    }

    window.addEventListener("resize", onResize);

    return function () {
      window.removeEventListener("resize", onResize);
    }
  }, [])

  return (
    <ResizeContext.Provider value={{ size, width }}>
      {children}
    </ResizeContext.Provider>
  );
}
