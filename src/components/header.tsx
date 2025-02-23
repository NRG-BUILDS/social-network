import { Link } from "react-router";
import Container from "./container";
import { Avatar } from "./avatar";
import { FiPower, FiSettings, FiUser } from "react-icons/fi";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 border-b w-full bg-white backdrop-opacity-30 backdrop-blur-xl">
      <Container className="!py-2 flex justify-between items-center w-full mx-auto container">
        <div>
          <Link to={"/profile"}>
            <Avatar img="https://i.pravatar.cc/150?img=5" variant={"xs"} />
          </Link>
        </div>
        <div>Logo</div>

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
      </Container>
    </header>
  );
};

export default Header;
