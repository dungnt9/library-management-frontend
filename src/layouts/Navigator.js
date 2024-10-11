import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigator = () => {
    const { pathname } = useLocation();
    const navItems = [
        { path: '/', label: 'Trang chủ' },
        { path: '/ql_sach', label: 'Quản lý sách' },
        { path: '/ql_ban_doc', label: 'Quản lý bạn đọc' },
        { path: '/ql_muon_tra', label: 'Quản lý mượn trả' }
    ];

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1da64c' }}>
            <div className="container-fluid d-flex justify-content-center">
                {navItems.map(({ path, label }) => (
                    <Link
                        key={path}
                        to={path}
                        className="btn btn-success mx-1"
                        style={{
                            backgroundColor: pathname === path ? '#67dd3c' : '#1da64c',
                            border: 'none'
                        }}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navigator;