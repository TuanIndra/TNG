import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import heroImage from "../../../../assets/image/e.jpg"; // Import ảnh

const HeroSection = () => {
  const navigate = useNavigate(); // Khởi tạo hook điều hướng

  const handleStartCreating = () => {
    navigate("/editor"); // Chuyển đến trang Editor
  };

  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1>Tạo câu chuyện, trò chơi và hoạt hình</h1>
        <p>Chia sẻ với mọi người trên khắp thế giới</p>
        <div className="buttons">
          <button className="start-creating" onClick={handleStartCreating}>
            Bắt đầu sáng tạo
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
