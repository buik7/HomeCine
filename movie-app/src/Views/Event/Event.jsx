import React from "react";

const Event = () => {
  return (
    <div
      style={{
        width: `${window.innerWidth > 600 ? "40%" : "80%"}`,
        margin: "20px auto",
      }}
    >
      <img
        src="https://png.pngtree.com/png-clipart/20200724/ourlarge/pngtree-coming-soon-hanging-board-transparent-png-png-image_2310503.jpg"
        alt="COMING SOON"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default Event;
