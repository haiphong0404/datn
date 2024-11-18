// SearchBox.jsx
import React, { useState } from 'react';

const SearchBox = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Lọc sản phẩm dựa trên searchTerm
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Sản phẩm tìm kiếm:', filteredProducts);
    // Bạn có thể thực hiện hành động khác với filteredProducts như hiển thị trên giao diện
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Tìm kiếm</button>
    </form>
  );
};

export default SearchBox;
