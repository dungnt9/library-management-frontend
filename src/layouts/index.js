import React from 'react';
import Footer from './DefaultLayout/Footer';
import Header from './DefaultLayout/Header';
import Navigator from './Navigator';
import './index.css';

function DefaultLayout(props) {
  return (
    <div className="layout">
      <Header />
      <Navigator />
      <div className="content" style={{backgroundColor:'rgb(178, 246, 174)'}}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
