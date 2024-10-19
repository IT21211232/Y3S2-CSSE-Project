import dashboardimg from "../assets/icons/dashboard.svg";
import scheduleimg from "../assets/icons/schedule.svg";
import trackImage from "../assets/icons/track.svg";
import paymentImage from "../assets/icons/payment.svg";
import { faDesktop } from "@fortawesome/free-solid-svg-icons/faDesktop";
import { faChartBar } from "@fortawesome/free-regular-svg-icons";

const userNav = [
  {
    name: "Dashboard",
    route: "/user/dashboard",
    image: dashboardimg,
    roles: ["USER"],
  },
  {
    name: "Schedule Collection",
    route: "/userschedule",
    image: scheduleimg,
    roles: ["USER"],
  },
  {
    name: "Garbage Tracker",
    route: "/usertrack",
    image: trackImage,
    roles: ["USER"],
  },
  {
    name: "Payments",
    route: "/user/payment",
    image: paymentImage,
    roles: ["USER"],
  },
  {
    name: "Waste Monitor",
    route: "/dashboard/waste-monitor",
    faIcon: faDesktop,
    roles: ["USER"],
  },
  {
    name: "Waste Generated Overtime Chart",
    route: "/chart/waste-generated-overtime",
    faIcon: faChartBar,
    roles: ["USER"],
  },
  {
    name: "Waste Type Chart",
    route: "/chart/waste-types",
    faIcon: faChartBar,
    roles: ["USER"],
  },
  {
    name: "Waste Propotions Chart",
    route: "/chart/waste-propotions",
    faIcon: faChartBar,
    roles: ["USER"],
  },
  {
    name: "Waste Goals",
    route: "/waste-goals",
    faIcon: faChartBar,
    roles: ["USER"],
  },
];

// Function to get navigation items based on role
export const getNavItems = () => {
  const role = localStorage.getItem("role"); // Get role from localStorage
  const items = userNav.filter((navItem) => navItem.roles.includes(role));
  return items;
};
