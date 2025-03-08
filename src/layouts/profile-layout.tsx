import NavigationBar from "@/components/navigation";
import { Outlet } from "react-router";

const ProfileLayout = () => {
  return (
    <main className="min-h-svh  bg-brand-neutral/20">
      <div className="relative grid items-start md:grid-cols-12 lg:grid-cols-12 gap-5 max-w-[80rem] mx-auto px-0 md:p-4 ">
        {/* SIDEBAR */}
        <div className="md:col-span-4 sticky top-0">
          <NavigationBar />
        </div>
        {/* MAIN COMPONENT CONTAINER */}
        <Outlet />
      </div>
    </main>
  );
};

export default ProfileLayout;
