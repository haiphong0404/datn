import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SearchProducts = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowProducts(true);
    } else {
      setShowProducts(false);
    }
  }, [query, products]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Tìm..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <button><i className="bi bi-search"></i></button> */}
      {showProducts && (
        <div className="cart-list-wrapper">
          <ul className="cart-list">
            {filteredProducts.map((product) => (
              <li key={product.id} className="product-search">
                <div className="cart-img">
                  <Link to={`/product_details/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
                <div className="search-list">
                  <h4 className='search-name'><Link to={`/product_details/${product.id}`}><span style={{
                    color: 'black',  // màu chữ
                    fontSize: '16px',  // kích thước chữ
                    fontWeight: 'bold',  // độ đậm chữ
                    textDecoration: 'none',  // bỏ gạch dưới liên kết
                  }} > {product.name}</span></Link></h4>
                  <p>{product.price} VND</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
