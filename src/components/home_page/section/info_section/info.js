import React from "react";

const InfoPage = () => {
  return (
    <div className="info-section">
      <a href="#about-getty" className="info-box">
        <h2>Về Dogo</h2>
        <p>Tìm hiểu thêm về Dogo và cách nó hoạt động.</p>
      </a>
      <a href="#for-parents" className="info-box">
        <h2>Dành cho Phụ huynh</h2>
        <p>Khám phá cách Dogo giúp con bạn học tập và phát triển.</p>
      </a>
      <a href="#for-teachers" className="info-box">
        <h2>Dành cho Giáo viên</h2>
        <p>Khám phá các tài nguyên và công cụ để dạy học với Dogo.</p>
      </a>
    </div>
  );
};

export default InfoPage;