import React, { useState } from 'react'; // Thêm useState ở đây
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchColor, fetchSizes } from '../../api/product';
import { Pagination } from '@mui/material';
import { fetchBrands } from '../../api/brand';


import ProductItem from './productItem';
import ProductList from './productList';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid-view'); // Đặt chế độ xem mặc định
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  const { data: products = [],  isLoading: isLoadingProducts, isError: isProductsError } = useQuery({
    queryKey: ['Products'],
    queryFn: fetchProducts,
  });
  const { data: brands = [], isLoading: isLoadingBrands, isError: isBrandsError  } = useQuery({
    queryKey: ['Brands'],
    queryFn: fetchBrands,
  });
  const { data: colors = [], isLoading: isLoadingColors, isError: isColorsError } = useQuery({
    queryKey: ['colors  '],
    queryFn: fetchColor,
  });
  const { data: sizes = [],  isLoading: isLoadingSizes, isError: isSizesError } = useQuery({
    queryKey: ['sizes'],
    queryFn: fetchSizes,
  });

  const itemsPerPage = 6; // Số sản phẩm trên mỗi trang
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value); // Cập nhật trang hiện tại
  };

  const totalPages = Math.ceil(products.length / itemsPerPage); // Tính số trang

   // Kiểm tra trạng thái tải
   if (isLoadingProducts || isLoadingBrands || isLoadingColors || isLoadingSizes) {
    return <div>Đang tải...</div>;
  }

  // Kiểm tra lỗi
  if (isProductsError || isBrandsError || isColorsError || isSizesError) {
    return <div>Lỗi khi tải dữ liệu.</div>;
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
                        {brands.map((brand) => (
                          <li key={brand.id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`brand-${brand.id}`}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`brand-${brand.id}`}
                              >
                                {brand.name} ({brand.productCount || 0})
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Color</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        {colors.map((color) => (
                          <li key={color.id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`color-${color.id}`}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`color-${color.id}`}
                              >
                                {color.name} ({color.productCount || 0})
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-single">
                    <h6 className="sidebar-title">Size</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        {sizes.map((size) => (
                          <li key={size.id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`size-${size.id}`}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`size-${size.id}`}
                              >
                                {size.name} ({size.productCount || 0})
                              </label>
                            </div>
                          </li>
                        ))}
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
                              className={viewMode === 'grid-view' ? 'active' : ''}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleViewModeChange('grid-view');
                              }}
                              data-bs-toggle="tooltip"
                              title="Grid View"
                            >
                              <i className="fa fa-th" />
                            </a>
                            <a
                              className={viewMode === 'list-view' ? 'active' : ''}
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleViewModeChange('list-view');
                              }}
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
                            <p>Lọc theo : </p>
                            <select className="nice-select" name="sortby">
                              <option value="trending">Liên quan</option>
                              <option value="sales">(A - Z)</option>
                              <option value="sales">(Z - A)</option>
                              <option value="rating">
                                Price (Low &gt; High)
                              </option>

                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* shop product top wrap start */}
                  {/* product item list wrapper start */}
                  <div className={`shop-product-wrap ${viewMode}`}>
                    <div className="row">
                      {products.slice((page - 1) * itemsPerPage, page * itemsPerPage) // Cắt danh sách sản phẩm theo trang
                        .map((product) => (
                          <div
                            className={viewMode === 'grid-view' ? 'col-md-4 col-sm-6' : 'col-md-12'}
                            key={product.id}
                          >
                            {viewMode === 'grid-view' ? (
                              <ProductItem product={product} />
                            ) : (
                              <ProductList product={product} />
                            )}
                          </div>
                        ))}
                    </div>

                    <Pagination
                      count={totalPages}
                      page={page}
                      onChange={handleChange}
                      className="pagination"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
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
