import React from "react";
import heroImage from "../../../../assets/image/e.jpg"; // Import ảnh

const HeroSection = () => {
  return (
    <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-content">
        <h1>Tạo câu chuyện, trò chơi và hoạt hình</h1>
        <p>Chia sẻ với mọi người trên khắp thế giới</p>
        <div className="buttons">
          <button className="start-creating">Bắt đầu sáng tạo</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;