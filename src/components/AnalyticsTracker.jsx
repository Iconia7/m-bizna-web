import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// 1. Initialize with your Measurement ID (Get this from Google Analytics Dashboard)
// It usually looks like "G-XXXXXXXXXX"
ReactGA.initialize("G-NSX371NW4E");

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // 2. Send a "pageview" hit every time the route changes
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null; // This component doesn't render anything visually
};

export default AnalyticsTracker;