import Sidebar from "./sidebar";
import MobileNavbar from "./mobile-navbar";

const NavigationBar = () => {
  return (
    <>
      <Sidebar />

      <div className="md:hidden block">
        <MobileNavbar />
      </div>
    </>
  );
};

export default NavigationBar;
