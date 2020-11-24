import React, { useEffect, useState } from "react";
import api from "../../../services/api";

const MessageDropdown = () => {
  const [data, setData] = useState([]);

  async function loadMessages() {
    const response = await api.get("messages");
    setData(response.data.data);
  }

  useEffect(() => {
    loadMessages();
    const interval = setInterval(() => {
      loadMessages();
    }, 4000);
  }, []);

  return (
    <div className="dropdown">
      <button
        className="btn btn-link dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-bell"></i>
        <span className="badge badge-light">{data.length}</span>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {data.map(item => (
          <a key={item.id} className="dropdown-item" href="#">
            {item.user_envio.name}: {item.message}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MessageDropdown;
