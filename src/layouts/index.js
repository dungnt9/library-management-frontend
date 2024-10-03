//C:\Users\dung9\Desktop\front\src\layouts\index.js
import React from 'react';
import Footer from './DefaultLayout/Footer';
import Header from './DefaultLayout/Header';
import Navigator from './Navigator';

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