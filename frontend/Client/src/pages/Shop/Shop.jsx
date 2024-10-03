import React, { useState } from 'react'; // Thêm useState ở đây
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../hooks/product';
import { Grid, Pagination } from '@mui/material';


import ProductItem from './productItem';
import ProductList from './productList';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid-view'); // Đặt chế độ xem mặc định

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['Products'],
    queryFn: fetchProducts,
  });

  const itemsPerPage = 9; // Số sản phẩm trên mỗi trang
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value); // Cập nhật trang hiện tại
  };

  const totalPages = Math.ceil(products.length / itemsPerPage); // Tính số trang

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  if (isError) {
    return <div>Lỗi khi tải sản phẩm.</div>;
  }

  return (
    <div>
      <main>
        {/* breadcrumb area start */}
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{
            backgroundImage: "url(/assets/img/banner/shop.jpg)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">SHOP</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Shop
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}
        {/* page main wrapper start */}
        <div className="shop-main-wrapper section-padding">
          <div className="container">
            <div className="row">
              {/* sidebar area start */}
              <div className="col-lg-3 order-2 order-lg-1">
                <aside className="sidebar-wrapper">
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Categories</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck1"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck1"
                            >
                              Mens (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck2"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck2"
                            >
                              Womens (4)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck3"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck3"
                            >
                              Kids (15)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck4"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck4"
                            >
                              Sports (10)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Brand</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck5"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck5"
                            >
                              Studio (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck6"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck6"
                            >
                              Hastech (4)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck7"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck7"
                            >
                              Quickiin (15)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck8"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck8"
                            >
                              Graphic corner (10)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck9"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck9"
                            >
                              devItems (12)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Categories</h6>
                    <div className="sidebar-body">
                      <ul className="radio-container search-list">
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck50"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck50"
                            >
                              $7.00 - $9.00 (2)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck51"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck51"
                            >
                              $10.00 - $12.00 (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck52"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck52"
                            >
                              $17.00 - $20.00 (3)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck53"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck53"
                            >
                              {" "}
                              $21.00 - $22.00 (1)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-radio">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="customCheck54"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck54"
                            >
                              $25.00 - $30.00 (3)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">color</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck11"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck11"
                            >
                              green (5)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck12"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck12"
                            >
                              black (20)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck13"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck13"
                            >
                              red (6)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck14"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck14"
                            >
                              blue (8)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck15"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck15"
                            >
                              pink (4)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">size</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck111"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck111"
                            >
                              S (4)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck222"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck222"
                            >
                              M (5)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck333"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck333"
                            >
                              L (7)
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck444"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck444"
                            >
                              XL (3)
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* single sidebar end */}
                  {/* single sidebar start */}
                  <div className="sidebar-banner">
                    <div className="banner-thumb">
                      <a href="#">
                        <img
                          src="assets/img/banner/sidebar-banner.jpg"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  {/* single sidebar end */}
                </aside>
              </div>
              {/* sidebar area end */}
              {/* shop main wrapper start */}
              <div className="col-lg-9 order-1 order-lg-2">
                <div className="shop-product-wrapper">
                  {/* shop product top wrap start */}
                  <div className="shop-top-bar">
                    <div className="row align-items-center">
                      <div className="col-lg-7 col-md-6 order-2 order-md-1">
                        <div className="top-bar-left">
                        <div className="product-view-mode">
                            <a
                              className="active"
                              href="#"
                              data-target="grid-view"
                              data-bs-toggle="tooltip"
                              title="Grid View"
                            >
                              <i className="fa fa-th" />
                            </a>
                            <a
                              href="#"
                              data-target="list-view"
                              data-bs-toggle="tooltip"
                              title="List View"
                            >
                              <i className="fa fa-list" />
                            </a>
                          </div>


                          <div className="product-amount">
                            <p>Showing 1–16 of 21 results</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 order-1 order-md-2">
                        <div className="top-bar-right">
                          <div className="product-short">
                            <p>Sort By : </p>
                            <select className="nice-select" name="sortby">
                              <option value="trending">Relevance</option>
                              <option value="sales">Name (A - Z)</option>
                              <option value="sales">Name (Z - A)</option>
                              <option value="rating">
                                Price (Low &gt; High)
                              </option>
                              <option value="date">Rating (Lowest)</option>
                              <option value="price-asc">Model (A - Z)</option>
                              <option value="price-asc">Model (Z - A)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* shop product top wrap start */}
                  {/* product item list wrapper start */}
                  <div className="shop-product-wrap grid-view row mbn-30">
                    {/* product single item start */}

                      {products
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage) // Cắt danh sách sản phẩm theo trang
                        .map((product) => (
                          <div  className="col-md-4 col-sm-6" key={product.id}>
                           
                              <ProductItem product={product} />
                          
                              <ProductList product={product} />
                          
                          </div>
                        ))}

                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                      className="pagination" // Thêm class cho pagination
                      sx={{
                        display: 'flex',
                        justifyContent: 'center', // Căn giữa pagination
                        mt: 4,
                      }}
                    />



                  </div>
                </div>
                {/* shop main wrapper end */}
              </div>
            </div>
          </div>
          {/* page main wrapper end */}
        </div>
      </main>
    </div>
  );
};

export default Shop;
