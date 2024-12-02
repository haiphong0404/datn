import React, { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchProducts, fetchColor, fetchSizes } from '../../api/product';
import fetchCategories from '../../api/categories';
import { Pagination } from '@mui/material';
import { fetchBrands } from '../../api/brand';
import ProductItem from './productItem';
import ProductList from './productList';
import LoadingSpinner from "../../loading/LoadingSpinner"; 

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid-view');
  const [page, setPage] = useState(1);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [sortOption, setSortOption] = useState(''); // Lưu giá trị sắp xếp
  const itemsPerPage = 9;

  const results = useQueries({
    queries: [
      { queryKey: ['Products'], queryFn: fetchProducts },
      { queryKey: ['Brands'], queryFn: fetchBrands },
      { queryKey: ['Colors'], queryFn: fetchColor },
      { queryKey: ['Sizes'], queryFn: fetchSizes },
      { queryKey: ['Categories'], queryFn: fetchCategories },
    ],
  });

  const [products, brands, colors, sizes, categories] = results.map((result) => result.data || []);
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleBrandFilterChange = (brand_id) => {
    console.log('Selected Brand ID:', brand_id);
    setSelectedBrandId((prev) => (prev === brand_id ? null : brand_id)); // Toggle selection
  };

  const handleCategoryFilterChange = (category_id) => {
    setSelectedCategoryId((prev) => (prev === category_id ? null : category_id)); // Toggle selection
  };

  if (isLoading) {
    return <LoadingSpinner />;;
  }

  if (isError) {
    return <div>Lỗi khi tải dữ liệu.</div>;
  }


  // Lọc sản phẩm theo thương hiệu
  let  filteredProducts = products.filter((product) => {
    const brandMatch = selectedBrandId ? Number(product.brand_id) === Number(selectedBrandId) : true;
    const categoryMatch = selectedCategoryId ? Number(product.category_id) === Number(selectedCategoryId) : true;
    return brandMatch && categoryMatch;
  });

  if (sortOption === 'az') {
    filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'za') {
    filteredProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === 'priceLowToHigh') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'priceHighToLow') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

 
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div>
      <main>
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{ backgroundImage: "url(/assets/img/banner/shop.jpg)" }}
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
                      <li className="breadcrumb-item active" aria-current="page">
                        Shop
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shop-main-wrapper section-padding">
          <div className="container">

            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                <aside className="sidebar-wrapper">
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">DANH MỤC</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`category-${category.id}`}
                                checked={selectedCategoryId === category.id}
                                onChange={() => handleCategoryFilterChange(category.id)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`category-${category.id}`}
                              >
                                {category.name}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar-single">
                    <h6 className="sidebar-title">THƯƠNG HIỆU</h6>
                    <div className="sidebar-body">
                      <ul className="checkbox-container search-list">
                        {brands.map((brand) => (
                          <li key={brand.id}>
                            <div className="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={`brand-${brand.id}`}
                                checked={selectedBrandId === brand.id}
                                onChange={() => handleBrandFilterChange(brand.id)}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={`brand-${brand.id}`}
                              >
                                {brand.name}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-banner">
                    <div className="banner-thumb">
                      <a href="#">
                        <img src="assets/img/banner/sidebar-banner.jpg" alt="" />
                      </a>
                    </div>
                  </div>
                </aside>
              </div>

              <div className="col-lg-9 order-1 order-lg-2">
                <div className="blog-posts">
                  {brands
                    .filter((brand) => Number(brand.id) === Number(selectedBrandId)) // Lọc brand theo selectedBrandId
                    .map((brand) => (
                      <div className="blog-post-item" key={brand.id}>
                        <div className="blog-thumb">
                          <img src={brand.image || 'default-image.jpg'} alt={brand.name} />
                        </div>
                        <div className="blog-content">
                          <h6 className="blog-title">{brand.name}</h6>
                          <div className="blog-meta">

                          </div>
                          <p className="blog-desc">{brand.description || 'Không có mô tả.'}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="shop-product-wrapper">
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
                                setViewMode('grid-view');
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
                                setViewMode('list-view');
                              }}
                              data-bs-toggle="tooltip"
                              title="List View"
                            >
                              <i className="fa fa-list" />
                            </a>
                          </div>

                          <div className="product-amount">
                            <p>Hiển thị {filteredProducts.length} kết quả</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-5 col-md-6 order-1 order-md-2">
                        <div class="top-bar-right">
                          <div class="product-short">
                            <div className="product-amount">
                              <p>Tìm kiếm theo :</p>
                            </div>
                            <select className="nice-select" onChange={handleSortChange}>
                              <option value="">Sắp xếp</option>
                              <option value="az">Theo thứ tự (A - Z)</option>
                              <option value="za">Theo thứ tự (Z - A)</option>
                              <option value="priceLowToHigh">Giá (Thấp &gt; Cao)</option>
                              <option value="priceHighToLow">Giá (Cao &gt; Thấp)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={`shop-product-wrap ${viewMode}`}>
                    <div className="row">
                      {filteredProducts
                        .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                        .map((product) => (
                          <div className={viewMode === 'grid-view' ? 'col-md-4 col-sm-6' : 'col-md-12'} key={product.id}>
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Shop;
