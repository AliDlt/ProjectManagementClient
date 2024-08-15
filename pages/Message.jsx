import React from "react";
import TextMessage from "../components/ui/Message/TextMessage";
import NewMessage from "../components/ui/Message/NewMessage";

const Message = () => {
  return (
    <div className="container-grid">
      <TextMessage />
      <NewMessage />
    </div>
  );
};

export default Message;
