import React, { useEffect, useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import logoImage from '../../../../assets/image/dog.png'; // Import your logo image

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Kiểm tra hướng cuộn
      if (prevScrollPos > currentScrollPos) {
        // Cuộn lên: Hiển thị Navbar
        setIsVisible(true);
      } else {
        // Cuộn xuống: Ẩn Navbar
        setIsVisible(false);
      }

      // Cập nhật vị trí cuộn trước đó
      setPrevScrollPos(currentScrollPos);
    };

    // Thêm sự kiện cuộn
    window.addEventListener('scroll', handleScroll);

    // Xóa sự kiện khi component bị hủy
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar-brand">
        <Link to="/">
          <img src={logoImage} alt="Getty Logo" className="logo-image" /> {/* Logo */}
          <span style={{ marginLeft: "8px", fontWeight: "bold", position: "relative", top: "-2px" }}>Dogo</span>
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/create">Tạo mới </Link> {/* Create */}
        </li>
        <li className="nav-item">
          <Link to="/explore">Khám phá </Link> {/* Explore */}
        </li>
        <li className="nav-item">
          <Link to="/ideas">Ý tưởng </Link> {/* Ideas */}
        </li>
        <li className="nav-item">
          <Link to="/about">Thông tin </Link> {/* About */}
        </li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm" /> {/* Search Bar */}
      </div>
      <div className="auth-buttons">
        <button className="join">Đăng kí</button> {/* Join Scratch Button */}
        <button className="sign-in">Đăng nhập</button> {/* Sign In Button */}
      </div>
    </nav>
  );
};

export default Navbar;