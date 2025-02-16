import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router";

const MessagesLayout = () => {
  return (
    <main className="min-h-svh  bg-brand-neutral/20">
      <div className="relative grid items-start md:grid-cols-12 lg:grid-cols-12 gap-5 container mx-auto py-4">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN COMPONENT CONTAINER */}
        <div className="rounded-lg md:col-span-9">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MessagesLayout;
