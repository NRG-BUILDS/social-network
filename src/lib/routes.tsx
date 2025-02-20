import { FiBell, FiHome, FiSend, FiUser } from "react-icons/fi";

export const routes = [
  { label: "Home", path: "/", icon: <FiHome /> },
  { label: "Profile", path: "/profile", icon: <FiUser /> },
  { label: "Messages", path: "/messages", icon: <FiSend /> },
  { label: "Notifications", path: "/notifications", icon: <FiBell /> },
];
