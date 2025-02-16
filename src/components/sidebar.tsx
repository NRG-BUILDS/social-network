import { FiBell, FiHome, FiSend, FiUser } from "react-icons/fi";
import { Link } from "react-router";

const Sidebar = () => {
  return (
    <div className="sticky top-2 hidden md:block bg-white border overflow-clip rounded-lg md:col-span-3 lg:col-span-3">
      <div className="relative">
        <div className="h-32 bg-gray-100 relative"></div>
        <div className="rounded-full size-20 bg-blue-500 border-4 border-white absolute -bottom-1/2 left-5 -translate-y-[50%]"></div>
      </div>

      <div className="mt-8 px-6">
        <h2 className="font-semibold text-lg">Robert Daniels</h2>
        <span className="text-sm font-light">Software Engineer</span>
      </div>
      <div className="mt-8 px-6">
        <ul className="divide-y *:hover:bg-gray-100">
          <li className="p-4">
            <Link to="#" className="flex w-full gap-4 items-center">
              <FiHome />
              <span>Home</span>
            </Link>
          </li>
          <li className="p-4">
            <Link to="#" className="flex w-full gap-4 items-center">
              <FiUser />
              <span>Profile</span>
            </Link>
          </li>
          <li className="p-4">
            <Link to="/messages" className="flex w-full gap-4 items-center">
              <FiSend />
              <span>Messages</span>
            </Link>
          </li>
          <li className="p-4">
            <Link to="#" className="flex w-full gap-4 items-center">
              <FiBell />
              <span>Notifications</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
