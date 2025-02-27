import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Optional if using React Router

const ScrollToTop: React.FC = () => {
  const location = useLocation(); // Only needed if using React Router

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  }, [location]); // Trigger on route change (if using React Router)

  return null; // Component does not render anything visible
};

export default ScrollToTop;
