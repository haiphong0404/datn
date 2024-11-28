import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useBrands from '../hooks/useBrands';

const Brands = () => {
    const { brands, loading: brandsLoading, error: brandsError } = useBrands();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState(null);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
        setSelectedBrandId(null);
    };

    const filteredBrands = brands.filter(
        (brand) =>
            (!selectedBrandId || brand.id === selectedBrandId) &&
            brand.name.toLowerCase().includes(searchTerm)
    );

    const handleBrandFilterChange = (brandId) => {
        setSelectedBrandId(brandId === selectedBrandId ? null : brandId);
    };

    return (
        <div>
            <header className="py-3 mt-2" style={{ backgroundColor: '#87b106', color: '#fff' }}>
                <div className="container text-center">
                    <h1 className="fw-bold">Khám Phá Các Thương Hiệu Nổi Tiếng</h1>
                </div>
            </header>

            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-3 mb-4">
                        <div className="bg-white p-3 shadow-sm rounded">
                            <h5 className="mb-3" style={{ color: '#87b106' }}>Tìm Kiếm Thương Hiệu</h5>
                            <form>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nhập tên thương hiệu..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{ backgroundColor: '#87b106', color: '#fff' }}
                                        disabled
                                    >
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="sidebar-single mt-4">
                            <h6 className="sidebar-title">DANH MỤC</h6>
                            <div className="sidebar-body">
                                {brandsLoading ? (
                                    <div className="text-center py-3">
                                        <div className="spinner-border" style={{ color: '#87b106' }} role="status">
                                            <span className="visually-hidden">Đang tải...</span>
                                        </div>
                                    </div>
                                ) : brandsError ? (
                                    <div className="alert alert-danger">{brandsError}</div>
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        {brandsLoading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border" style={{ color: '#87b106' }} role="status">
                                    <span className="visually-hidden">Đang tải...</span>
                                </div>
                            </div>
                        ) : brandsError ? (
                            <div className="alert alert-danger text-center">{brandsError}</div>
                        ) : (
                            <div className="row g-4">
                                {filteredBrands.map((brand) => (
                                    <div className="col-md-4" key={brand.id}>
                                        <div className="card shadow-sm h-100">
                                            <Link to={`/brand_detail/${brand.id}`}>
                                                <img
                                                    src={brand.image}
                                                    className="card-img-top"
                                                    alt={brand.name}
                                                    style={{ objectFit: 'cover', height: '200px' }}
                                                />
                                            </Link>
                                            <div className="card-body text-center">
                                                <h5 className="card-title">
                                                    <Link
                                                        to={`/brand_detail/${brand.id}`}
                                                        className="text-decoration-none"
                                                        style={{ color: '#87b106' }}
                                                    >
                                                        {brand.name}
                                                    </Link>
                                                </h5>
                                                <p className="card-text text-muted">{brand.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;
