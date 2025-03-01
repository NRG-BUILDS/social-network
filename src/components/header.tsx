import { Link } from "react-router";
import Container from "./container";
import { MyAvatar } from "./avatar";
import { FiPower, FiSettings, FiUser } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import logo from "@/assets/logos/logo_g.png";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 border-b w-full bg-white backdrop-opacity-30 backdrop-blur-xl">
      <Container className="!py-2 grid grid-cols-12 *:flex justify-center items-center w-full mx-auto container">
        <div className="col-span-3 justify-left">
          <Link to={"/profile"}>
            <MyAvatar variant={"xs"} />
          </Link>
        </div>
        <div className="col-span-6 justify-center">
          <img src={logo} alt="" className="h-10 w-auto" />
        </div>

        <div className="col-span-3 justify-end">
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <FiSettings />
            </PopoverTrigger>
            <PopoverContent className="w-fit p-0">
              <div className="grid *:p-3 *:hover:bg-neutral-100">
                <Link
                  to={"/login"}
                  className="flex items-center gap-3 text-red-500"
                >
                  <FiPower />
                  <span>Logout</span>
                </Link>
                <Link to={"/profile"} className="flex items-center gap-3">
                  <FiUser />
                  <span>Profile</span>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Container>
    </header>
  );
};

export default Header;
