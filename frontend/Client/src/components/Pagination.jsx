import React from 'react';

const Pagination = ({ currentPage, totalPages, onChangePage }) => {
  return (
    <div className="pagination-area text-center">
      <ul className="pagination-box">
        {/* Nút Previous */}
        <li>
          <a
            className="previous"
            href="#"
            onClick={() => onChangePage(currentPage > 1 ? currentPage - 1 : 1)}
          >
            <i className="fa fa-angle-left" />
          </a>
        </li>

        {/* Số trang */}
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
            <a href="#" onClick={() => onChangePage(index + 1)}>
              {index + 1}
            </a>
          </li>
        ))}

        {/* Nút Next */}
        <li>
          <a
            className="next"
            href="#"
            onClick={() => onChangePage(currentPage < totalPages ? currentPage + 1 : totalPages)}
          >
            <i className="fa fa-angle-right" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
