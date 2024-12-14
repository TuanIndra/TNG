import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Header.css";

const Header = () => {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  const handleNavigateHome = () => {
    navigate("/"); // Điều hướng về trang chủ
  };
  return (
    <header className="header">
      <div className="menu">
        <button onClick={handleNavigateHome}>Trang chủ</button>
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
