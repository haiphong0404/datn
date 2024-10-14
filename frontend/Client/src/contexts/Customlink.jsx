import React from 'react';
import { Link } from 'react-router-dom';

const CustomLink = ({ to, children }) => {
  const handleClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của Link
    window.location.reload(); // Tải lại trang
  };

  return (
    <Link to={to} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
