import React, { useState, useEffect } from "react";

    //const backgrounds=["#0099ff",'url("/images/alternating-arrowhead.png")','url("/images/bermuda-square.png")','url("/images/bermuda-triangle.png")','url("/images/colorful-stingrays.png")','url("/images/scattered-forcefields.png")','url("/images/subtle-stripes.png")','url("/images/bermuda-circle.png")',]

    const backgrounds = [
        "#0099ff",
        'url("/images/bg1.png")',
        'url("/images/bg2.png")',
        'url("/images/bg3.png")',
        'url("/images/bg4.png")',
        'url("/images/bg5.png")',
        'url("/images/bg6.png")',
        'url("/images/bg7.png")',

      ];
const BackgroundWrapper = ({ children }) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000); // Change background every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: backgrounds[currentBgIndex],
        backgroundSize: "contain", // Fits the background inside the container
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
