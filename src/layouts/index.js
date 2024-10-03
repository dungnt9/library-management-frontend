import React from 'react';
import Footer from './DefaultLayout/Footer';
import Header from './DefaultLayout/Header';
import Navigator from './Navigator';
import './index.css'; // Thêm file CSS

function DefaultLayout(props) {
  return (
    <div className="layout">
      <Header />
      <Navigator />
      <div className="content">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
