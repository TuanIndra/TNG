import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import imgae from '../../../../assets/image/dog.png'; // Import your logo image
import next from '../../../../assets/image/to_right.png';
import prev from '../../../../assets/image/to_left.png';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const ProjectsPage = () => {
  return (
    <div className="featured-section">
      <h2>Dự án Nổi bật</h2>
      {/* Nút Previous */}
      <button className="swiper-button-prev">
        <img src={prev} alt="Previous" />
      </button>

      {/* Nút Next */}
      <button className="swiper-button-next">
        <img src={next} alt="Next" />
      </button>

      {/* Swiper */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation={{
          nextEl: ".swiper-button-next", // Liên kết với nút next
          prevEl: ".swiper-button-prev", // Liên kết với nút previous
          disabledClass: "swiper-button-disabled",
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="swiper-container"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      > 
        {/* Project Boxes */}
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="At Puzzard Zendrion" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="Hour of Code 2023" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="Feed of Kindness" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="App prototype |Fi..." className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="Ripples of Kindness" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="Hour of Code 2023" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="At Puzzard Zendrion" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="At Puzzard Zendrion" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="At Puzzard Zendrion" className="project-image" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="project-box">
            <img src={imgae} alt="At Puzzard Zendrion" className="project-image" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ProjectsPage;