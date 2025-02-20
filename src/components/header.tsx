import { Link } from "react-router";
import Container from "./container";
import { Avatar } from "./avatar";
import { FiSettings } from "react-icons/fi";

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
        <Link to={"#"}>
          <FiSettings />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
