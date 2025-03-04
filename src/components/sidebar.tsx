import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { routes } from "@/lib/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MyAvatar } from "./avatar";
const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  return (
    <div className="sticky top-2 hidden md:block bg-white border overflow-clip rounded-lg md:col-span-3 lg:col-span-3">
      <div className="relative">
        <div className="h-32 bg-gray-100 relative">
          <div className="absolute -bottom-1/2 top-1/2 left-2 border-4 border-white w-fit h-fit rounded-full">
            <MyAvatar variant={"2xl"} />
          </div>
        </div>
      </div>

      <div className="mt-8 px-6">
        <h2 className="font-semibold text-lg">
          {user?.firstName} {user?.lastName}
        </h2>
        <span className="text-sm font-light">Software Engineer</span>
      </div>
      <div className="mt-8">
        <ul className="divide-y *:hover:bg-neutral-50">
          {routes.map((route) => (
            <li
              className="p-4"
              key={route.label}
              data-active={route.path.includes(activeLink) ? "true" : "false"}
            >
              <Link
                to={route.path}
                className="flex px-6 w-full gap-4 items-center data-[active=true]:font-medium"
              >
                {route.icon}
                <span>{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
