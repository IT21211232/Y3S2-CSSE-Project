// CustomNotification.js
import React from "react";
import { notification } from "antd";

const CustomNotification = () => {
  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight", // Change placement if needed
      duration: 3, // Duration in seconds
    });
  };

  return { openNotification }; // Return the function to use it in other components
};

export default CustomNotification;
