import React from 'react';
import './home.css'; // Import CSS file for HomePage

// Import components
import HeroPage from './section/hero_section/hero';
import InfoPage from './section/info_section/info';
import ProjectsPage from './section/projects_section/projects';
import Navbar from './section/nav_bar/nav';
import Footer from './section/footer_bar/footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar /> {/* Navbar Component */}

      {/* Hero Section */}
      <HeroPage />

      {/* Info Section */}
      <InfoPage />

      {/* Featured Projects Section with Swiper */}
      <ProjectsPage />

      <Footer /> {/* Footer Component */}
    </div>
  );
};

export default HomePage;