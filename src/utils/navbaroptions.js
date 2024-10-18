import dashboardimg from "../assets/icons/dashboard.svg";
import scheduleimg from "../assets/icons/schedule.svg";
import trackImage from "../assets/icons/track.svg";
import paymentImage from '../assets/icons/payment.svg'

export const userNav = [
  {
    name: "Dashboard",
    route: "/user/dashboard",
    image: dashboardimg,
  },
  {
    name: "Schedule Collection",
    route: "/userschedule",
    image: scheduleimg,
  },
  {
    name: "Garbage Tracker",
    route: "/usertrack",
    image: trackImage,
  },
  {
    name: "Payments",
    route: "/user/payment",
    image: paymentImage,
  },
];
