import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductById from '../../hooks/useProductById';
import { useComments } from '../../hooks/useComments';
import useProductAttributes from '../../hooks/useProductAtrib';
const ProductReview = ({ initialTab = "tab_one" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { productId } = useParams();
  const { product, loading: productLoading, error: productError } = useProductById(productId);
  const { comments, isLoading: commentsLoading, error: commentsError } = useComments(productId);
  const { colors, sizes } = useProductAttributes(productId);
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (productLoading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (productError || commentsError) {
    return <div>Error loading product or comments data.</div>;
  }

  // Extract colors and sizes from product variants if needed
  const colorNames = Array.isArray(colors) ? colors.map(color => color.name).join(', ') : "No colors available.";

  const sizeNames = Array.isArray(sizes) ? sizes.map(size => size.name).join(', ') : "No sizes available.";
 

 
  return (
    <div className="product-review-info">
      <ul className="nav review-tab">
        <li>
          <a
            className={activeTab === "tab_one" ? "active" : ""}
            onClick={() => handleTabChange("tab_one")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            className={activeTab === "tab_two" ? "active" : ""}
            onClick={() => handleTabChange("tab_two")}
          >
            Information
          </a>
        </li>
        <li>
          <a
            className={activeTab === "tab_three" ? "active" : ""}
            onClick={() => handleTabChange("tab_three")}
          >
            Reviews ({comments?.length || 0})
          </a>
        </li>
      </ul>
      <div className="tab-content reviews-tab">
        <div className={`tab-pane fade ${activeTab === "tab_one" ? "show active" : ""}`} id="tab_one">
          <div className="tab-one">
            <p>{product.description || "No description available."}</p>
          </div>
        </div>
        <div className={`tab-pane fade ${activeTab === "tab_two" ? "show active" : ""}`} id="tab_two">
          <table className="table table-bordered">
            <tbody>
            <tr>
                <td>Color</td>
                <td>{colorNames}</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>{sizeNames}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`tab-pane fade ${activeTab === "tab_three" ? "show active" : ""}`} id="tab_three">
          <div className="reviews">
            {Array.isArray(comments) && comments.length > 0 ? (
              comments.map((comment) => {
                // Log giá trị của comment.star_rating để kiểm tra
               
                // Chuyển đổi `star_rating` sang số và kiểm tra tính hợp lệ
                const rating = parseInt(comment.star_rating, 10);
          
                const isValidRating = !isNaN(rating) && rating >= 1 && rating <= 5;
              
                return (
                  <div key={comment.id} className="review-box">
                    {/* Hiển thị Rating */}
                    <div className="ratings">
                      {isValidRating ? (
                        <>
                          {/* Hiển thị số sao vàng theo `star_rating` */}
                          {[...Array(rating)].map((_, idx) => (
                            <span key={idx} className="good">
                              <i className="fa fa-star" />
                            </span>
                          ))}
                          {/* Hiển thị các sao chưa được đánh giá (sao đen) */}
                          {[...Array(5 - rating)].map((_, idx) => (
                            <span key={idx} className="bad">
                              <i className="fa fa-star" />
                            </span>
                          ))}
                        </>
                      ) : (
                        <p>Không có đánh giá hợp lệ</p>
                      )}
                    </div>

                    {/* Hiển thị thông tin bình luận */}
                    <p><strong>Người đánh giá:</strong> {comment.user_name}</p>
                    <p><strong>Sản phẩm:</strong> {comment.product_name}</p>
                    <p><strong>Bình luận:</strong> {comment.comment}</p>
                  </div>
                );
              })
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
