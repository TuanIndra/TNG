import React from 'react';
import './footer.css'; // Import CSS file for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>Về Chúng Tôi</h2>
          <p>
            Chào mừng bạn đến với Dogo! Chúng tôi là nền tảng sáng tạo nơi bạn có thể khám phá, tạo và chia sẻ những dự án tuyệt vời.
          </p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; 123-456-7890</span>
            <span><i className="fas fa-envelope"></i> &nbsp; info@getty.com</span>
          </div>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="footer-section links">
          <h2>Liên Kết Nhanh</h2>
          <ul>
            <li><a href="#">Trang Chủ</a></li>
            <li><a href="#">Giới Thiệu</a></li>
            <li><a href="#">Dịch Vụ</a></li>
            <li><a href="#">Liên Hệ</a></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h2>Liên Hệ Với Chúng Tôi</h2>
          <form>
            <input type="email" className="contact-input" placeholder="Địa chỉ email của bạn" />
            <textarea className="contact-input" placeholder="Lời nhắn của bạn"></textarea>
            <button type="submit" className="contact-btn">Gửi</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 Dogo. Tất cả các quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;