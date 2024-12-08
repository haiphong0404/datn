import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutClient = () => {
  return (
    <div>
      <div className="offcanvas-search-wrapper">
        <div className="offcanvas-search-inner">
          <div className="offcanvas-close">
            <i className="fa fa-close" />
          </div>
          <div className="container">
            <div className="offcanvas-search-box">
              <form className="d-flex bdr-bottom w-100">
                <input
                  type="text"
                  placeholder="Search entire storage here..."
                />
                <button className="search-btn">
                  <i className="fa fa-search" />
                  search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          minHeight: '80vh', // Chiều cao tối thiểu cho Outlet
          display: 'flex', // Đảm bảo bố cục linh hoạt
          flexDirection: 'column', // Sắp xếp theo chiều dọc
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutClient;
