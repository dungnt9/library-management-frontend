//C:\Users\dung9\Desktop\front\src\layouts\DefaultLayout\Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#1da64c', padding: '20px 0', marginTop: '10px' }}>
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <p style={{ margin: '0' }}>
                <strong>Tên thư viện</strong>
              </p>
              <p style={{ margin: '0' }}>Địa chỉ</p>
              <p style={{ margin: '0' }}>Số điện thoại</p>
              <p style={{ margin: '0' }}>Bản quyền © 2024, Tên thư viện.</p>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;