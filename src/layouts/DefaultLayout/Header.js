import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1da64c' }}>
      <div className="container-fluid d-flex justify-content-center">
        <img
          src="logo.png"
          className="imgLogo mr-2"
          style={{ width: '200px', height: '50px'}}
          alt="Logo thư viện"
        />
      </div>
    </nav>
  );
};

export default Header;