import { routes } from "@/lib/routes";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const MobileNavbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 ">
      <div className="bg-white border-t-2 shadow-lg p-1">
        <div className="flex w-full justify-evenly items-center">
          {routes.map((route) => (
            <Link
              to={route.path}
              key={route.label}
              data-state={
                activeLink.includes(route.path) ? "active" : "inactive"
              }
              onClick={() => setActiveLink(route.path)}
              className="data-[state=active]:font-bold data-[state=active]:text-brand-primary"
            >
              <div className="flex flex-col p-3  active:bg-brand-primary/10 items-center justify-center gap-0.5 rounded-md">
                {route.icon}
                <span className="text-xs">
                  {route.label === "Notifications" ? "Notifis" : route.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
