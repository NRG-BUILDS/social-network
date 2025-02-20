import { Avatar } from "@/components/avatar";
import Header from "@/components/header";
import NavigationBar from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <main className="min-h-svh  bg-brand-neutral/20 relative">
      <Header />
      <div className="relative grid items-start md:grid-cols-12 lg:grid-cols-12 gap-5 container mx-auto lg:py-4">
        {/* SIDEBAR */}
        <NavigationBar />
        {/* MAIN COMPONENT CONTAINER */}
        <div className="rounded-lg lg:col-span-6 md:col-span-9">
          <Outlet />
        </div>

        {/* SUGGESTED FRIENDS */}
        <div className="sticky top-2 hidden lg:block bg-white border rounded-lg lg:col-span-3">
          <div className="p-5">
            <h5 className="font-medium">Suggested Friends</h5>
          </div>
          <div className="p-5 border-t">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <Avatar
                  variant={"lg"}
                  role="Financial Analyst"
                  name="Olivia Anderson"
                />
                <Button
                  variant={"secondary"}
                  className="bg-brand-primary/10 text-neutral-900 size-[32px] flex items-center justify-center"
                >
                  <FiPlus />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainLayout;
