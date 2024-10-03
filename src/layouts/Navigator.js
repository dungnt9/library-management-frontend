//C:\Users\dung9\Desktop\front\src\layouts\Navigator.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigator = () => {
    const location = useLocation();
    const isActiveLink = (path) => location.pathname === path;

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1da64c' }}>
        <div className="container-fluid d-flex justify-content-center">
          <Link
            to="/"
            type="button"
            className="btn btn-success mx-1"
            style={{
              backgroundColor: isActiveLink('/') ? '#67dd3c' : '#1da64c',
              border: 'none',
            }}
          >
            Trang chủ
          </Link>
          <Link
            to="/ql_sach"
            type="button"
            className="btn btn-success mx-1"
            style={{
              backgroundColor: isActiveLink('/ql_sach') ? '#67dd3c' : '#1da64c',
              border: 'none',
            }}
          >
            Quản lý sách
          </Link>
          <Link
            to="/ql_ban_doc"
            type="button"
            className="btn btn-success mx-1"
            style={{
              backgroundColor: isActiveLink('/ql_ban_doc') ? '#67dd3c' : '#1da64c',
              border: 'none',
            }}
          >
            Quản lý bạn đọc
          </Link>
          <Link
            to="/ql_muon_tra"
            type="button"
            className="btn btn-success mx-1"
            style={{
              backgroundColor: isActiveLink('/ql_muon_tra') ? '#67dd3c' : '#1da64c',
              border: 'none',
            }}
          >
            Quản lý mượn trả
          </Link>
        </div>
      </nav>
    );
};

export default Navigator;