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
  //Akila
    {
        name: 'Assign Collector',
        route: '/assigncollectors',
        image: trackImage
    },
    {
        name: 'Collection requests',
        route: '/viewdata',
        image: trackImage
    },
    {
        name: 'Payment Rates',
        route: '/paymentRate',
        image: paymentImage
    },
    //hiruni
    {
        name: 'Manage Trucks',
        route: '/manage-trucks',
        image: trackImage
    },
    {
        name: 'Manage Dump Locations',
        route: '/manage-dump-locations',
        image: trackImage
    },
];
