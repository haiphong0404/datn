import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchProducts = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Trạng thái hiển thị modal

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState); // Chuyển đổi trạng thái modal
  };

  // Lấy danh sách sản phẩm khi component được mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
        setFilteredProducts([]); // Khởi tạo với mảng rỗng
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    };
    fetchProducts();
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  useEffect(() => {
    if (query.length === 0) {
      setFilteredProducts([]); // Không hiển thị sản phẩm khi query rỗng
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered); // Lọc sản phẩm khi có từ khóa tìm kiếm
    }
  }, [query, products]);

  // Hàm tắt modal khi chọn sản phẩm
  const handleProductClick = () => {
    toggleModal(); // Đóng modal khi chọn sản phẩm
  };

  return (
    <div className="search-container">
      <div className="search-box-offcanvas">
        {/* Open Modal Button */}
        <button onClick={toggleModal} className="search-btn">
          <i className="fa fa-search" />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay with 60% opacity
            animation: 'slideDown 0.5s ease-out', // Thêm hiệu ứng slide xuống
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              width: '90%',
              maxWidth: '500px', // Max width for the modal
              position: 'relative',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Close Modal Button */}
            <div
              className="offcanvas-close"
              onClick={toggleModal}
              style={{
                position: 'absolute',
                top: '3px',
                right: '3px',
                cursor: 'pointer',
                fontSize: '20px',
                color: '#333',
              }}
            >
              <i className="fa fa-times" />
            </div>

            <div>
              {/* Search Form */}
              <form
                className="d-flex bdr-bottom w-100"
                style={{ flexDirection: 'column', gap: '10px' }}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search entire storage here..."
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    marginTop: '10px',
                  }}
                />
              </form>

              {filteredProducts.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: '0',
                      margin: '0',
                    }}
                  >
                    {filteredProducts.map((product) => (
                      <li
                        key={product.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '15px',
                          padding: '10px',
                          borderBottom: '1px solid #ddd',
                        }}
                        onClick={handleProductClick} // Đóng modal khi chọn sản phẩm
                      >
                        <div style={{ flex: '0 0 50px' }}>
                          <Link to={`/product_details/${product.id}`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '8px',
                              }}
                            />
                          </Link>
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px' }}>
                          <h4
                            style={{
                              margin: '0',
                              fontSize: '16px',
                              fontWeight: 'bold',
                              color: '#333',
                            }}
                          >
                            <Link
                              to={`/product_details/${product.id}`}
                              style={{
                                textDecoration: 'none',
                                color: 'inherit',
                              }}
                            >
                              {product.name}
                            </Link>
                          </h4>
                          <p
                            style={{
                              margin: '5px 0 0 0',
                              fontSize: '14px',
                              color: '#87b106',  // Updated color for price
                            }}
                          >
                            {product.price
                              ? `${new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(product.price)}`
                              : 'Liên hệ'}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No products found message */}
              {filteredProducts.length === 0 && query.length > 0 && (
                <p
                  style={{
                    color: '#777',
                    textAlign: 'center',
                    fontSize: '14px',
                  }}
                >
                  Không tìm thấy sản phẩm nào
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
