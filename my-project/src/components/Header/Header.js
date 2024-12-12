import React from "react";
import "../style/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="menu">
        <button>Settings</button>
        <button>Tập tin</button>
        <button>Chỉnh sửa</button>
        <button>Hướng dẫn</button>
      </div>
      <div className="auth">
        <button>Tham gia Scretch</button>
        <button>Đăng nhập</button>
      </div>
    </header>
  );
};

export default Header;
