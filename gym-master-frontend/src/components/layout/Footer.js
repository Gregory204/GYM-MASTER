// Desc: Footer component for the application
// The Footer component displays the footer of the application.

// MAYBE WE CAN CHANGE THE DESIGN FOR MORE ATTRACTIVE LOOK (BLACK, RED, WHITE, diff font?)

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">Gym Master &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;