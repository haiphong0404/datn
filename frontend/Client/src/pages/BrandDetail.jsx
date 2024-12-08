import React from "react";
import { useParams } from "react-router-dom";
import useBrandDetail from "../hooks/useBrandDetail";
import { Link } from "react-router-dom";

const BrandDetail = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const { brand, loading, error } = useBrandDetail(id); // Dùng hook để fetch dữ liệu

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" style={{ color: "#87b106" }} role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="alert alert-danger text-center">{error}</div>;
    }

    if (!brand) {
        return <div className="text-center">Không có dữ liệu thương hiệu.</div>;
    }

    return (
        <div>
             <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{ backgroundImage: "url(/assets/img/banner/shop.jpg)" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">CHI TIẾT THƯƠNG HIỆU</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        
                          
                          <Link to="/">
                          <i className="fa fa-home" /></Link>
                      
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                      <Link to="/brands">
                      Thương hiệu</Link>
                        
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Chi tiết thương hiệu
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
            <header className="py-3 mt-2" style={{ backgroundColor: '#87b106', color: '#fff' }}>
                <div className="container text-center">
                    <h1 className="fw-bold">{brand.name}</h1>
                </div>
            </header>

            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-6">
                        <img
                            src={brand.image}
                            alt={brand.name}
                            className="img-fluid rounded shadow"
                            width={400}
                        />
                    </div>
                    <div className="col-lg-6 ">
                        <h3>Thông tin thương hiệu</h3>
                        <p className="pt-4"><strong>Tên thương hiệu:</strong> {brand.name}</p>
                        <p><strong>Link:</strong> <a href={brand.link} target="_blank" rel="noopener noreferrer">{brand.link}</a></p>
                        <p><strong>Mô tả:</strong> {brand.description}</p>

                    </div>
                </div>

                {brand.products?.length > 0 && (
                    <div className="mt-5">
                        <h4>Sản Phẩm Nổi Bật</h4>
                        <div className="row">
                            {brand.products.map((product) => (
                                <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
                                    <div className="card">
                                        <img
                                            src={product.image}
                                            className="card-img-top"
                                            alt={product.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.price} VNĐ</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}



                {brand.comments?.length > 0 && (
                    <div className="mt-5">
                        <h4>Đánh Giá Từ Khách Hàng</h4>
                        <ul className="list-group">
                            {brand.comments.map((comment) => (
                                <li key={comment.id} className="list-group-item">
                                    <strong>{comment.author}</strong>: {comment.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandDetail;
