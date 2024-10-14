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
    <Outlet></Outlet>

</div>
  );
};
export default LayoutClient;