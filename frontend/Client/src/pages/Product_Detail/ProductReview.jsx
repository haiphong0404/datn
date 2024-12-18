import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductById from "../../hooks/useProductById";
import { useComments } from "../../hooks/useComments";
import { addComment, deleteComment } from "../../api/commentsApi";
import moment from "moment";
import { toast } from "react-toastify";
import useProductAttributes from '../../hooks/useProductAtrib';
import LoadingSpinner from "../../loading/LoadingSpinner";
import { useLoginForm } from '../../hooks/useLoginForm';
import FormData from 'form-data';


const ProductReview = ({ initialTab = "tab_one" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userInfo"))?.username ? true : false
  );

  useEffect(() => {
    const checkAuthentication = () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.username) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    window.addEventListener("storage", checkAuthentication);

    checkAuthentication();

    return () => {
      window.removeEventListener("storage", checkAuthentication);
    };
  }, []);


  const [activeTab, setActiveTab] = useState(initialTab);
  const { productId } = useParams();
  const { product, loading: productLoading, error: productError } = useProductById(productId);
  const { comments, isLoading: commentsLoading, error: commentsError, refetch, updateComments } = useComments(productId);
  const [file, setFile] = useState(null);
  const { colors, sizes } = useProductAttributes(productId);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const { userInfo } = useLoginForm();

  const handleTabChange = (tabId) => setActiveTab(tabId);

  const MAX_COMMENT_LENGTH = 300;

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      toast.error("Bình luận không được để trống.");
      return;
    }

    if (newComment.length > MAX_COMMENT_LENGTH) {
      toast.error(`Bình luận không được vượt quá ${MAX_COMMENT_LENGTH} ký tự.`);
      return;
    }

    if (newRating <= 0) {
      toast.error("Vui lòng chọn mức độ hài lòng.");
      return;
    }

    const formData = new FormData();
    formData.append("comment", newComment);
    formData.append("star_rating", newRating);
    if (file) formData.append("file", file);

    try {
      const response = await addComment(productId, formData);
      if (response.status === 201) {
        const newCommentWithImage = response.data;
        updateComments(newCommentWithImage);
        setNewComment("");
        setNewRating(0);
        setFile(null);
        refetch();
        toast.success("Thêm bình luận thành công!");
      } else {
        toast.error("Bạn phải mua sản phẩm trước khi đánh giá.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm bình luận.");
    }
  };


  const handleDeleteComment = async (id) => {
    try {
      if (userInfo?.role === "admin" || comments.find(comment => comment.id === id)?.user_id === userInfo?.id) {
        await deleteComment(id);
        updateComments(null, id);
        toast.success("Bình luận đã được xóa thành công!");
      } else {
        toast.error("Bạn không có quyền xóa bình luận này.");
      }
    } catch (error) {
      console.error("Không xóa bình luận: ", error);
      toast.error("Có lỗi xảy ra khi xóa bình luận.");
    }
  };


  if (productLoading || commentsLoading) {
    return <LoadingSpinner />;
  }

  if (productError || commentsError) {
    return <div>Lỗi khi tải dữ liệu sản phẩm hoặc bình luận.</div>;
  }

  const colorNames = Array.isArray(colors) ? colors.map(color => color.name).join(', ') : "Không có màu nào.";
  const sizeNames = Array.isArray(sizes) ? sizes.map(size => size.name).join(', ') : "Không có kích thước nào.";

  return (
    <div className="product-review-info">
      <ul className="nav review-tab">
        <li>
          <a
            className={activeTab === "tab_one" ? "active" : ""}
            onClick={() => handleTabChange("tab_one")}
          >
            Mô tả
          </a>
        </li>
        <li>
          <a
            className={activeTab === "tab_two" ? "active" : ""}
            onClick={() => handleTabChange("tab_two")}
          >
            Thông tin
          </a>
        </li>
        <li>
          <a
            className={activeTab === "tab_three" ? "active" : ""}
            onClick={() => handleTabChange("tab_three")}
          >
            Bình luận ({comments?.length || 0})
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
                <td>Màu sắc</td>
                <td>{colorNames}</td>
              </tr>
              <tr>
                <td>Kích cỡ</td>
                <td>{sizeNames}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={`tab-pane fade ${activeTab === "tab_three" ? "show active" : ""}`}
          id="tab_three"
        >
          <div className="reviews">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="card mb-4 border-0 shadow-sm"
                  style={{ borderRadius: "12px" }}
                >
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <img
                            src={
                              comment.avatar_img ||
                              "https://via.placeholder.com/50/007bff/ffffff?text=?"
                            }
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: "30px", height: "30px", objectFit: "cover" }}
                          />
                        </div>
                        <h6 className="fw-bold mb-0">{comment.username}</h6>
                      </div>
                      <small className="text-muted">
                        {moment(comment.created_at, "DD-MM-YYYY").format("DD-MM-YYYY")}
                      </small>
                    </div>

                    <div
                      className="p-3 mb-3"
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <p className="mb-3">{comment.comment}</p>

                      {comment.file && (
                        <div className=" mb-3">
                          <img
                            src={comment.file}
                            alt="Review"
                            className="rounded"
                            style={{ maxWidth: "150px", objectFit: "cover" }}
                          />
                        </div>
                      )}

                      <div >
                        <strong>Đánh giá: </strong>
                        {[...Array(5)].map((_, idx) => (
                          <i
                            key={idx}
                            className={`fa fa-star ${idx < comment.star_rating ? "text-warning" : "text-muted"
                              }`}></i>
                        ))}
                      </div>
                    </div>

                    {isAuthenticated &&
                      (userInfo?.role === "admin" || comment.user_id === userInfo?.id) && (
                        <div className="d-flex gap-2">
                          <button
                            className="remove-button btn btn-outline-danger rounded-pill shadow-sm"
                            style={{ color: "white", padding: "5px 15px 5px 5px", border: "2px solid #dc3545" }}
                            onMouseEnter={(e) => (e.target.style.color = "black")}
                            onMouseLeave={(e) => (e.target.style.color = "white")}
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <i className="fas fa-trash-alt me-2"></i> Xóa
                          </button>
                        </div>




                      )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted text-center">Chưa có đánh giá nào.</p>
            )}

            {isAuthenticated && (
              <div className="card mt-4 border-0 shadow-sm" style={{ borderRadius: "12px" }}>
                <div className="card-body">
                  <h6 className="fw-bold mb-3">Thêm bình luận của bạn</h6>
                  <div className="d-flex gap-3 align-items-center mb-3">
                    <img
                      src={
                        userInfo?.avatar_img ||
                        "https://via.placeholder.com/50/007bff/ffffff?text=?"
                      }
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                    <textarea
                      className="form-control"
                      rows="3"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Viết bình luận..."
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <strong>Mức độ hài lòng: </strong>
                    {[...Array(5)].map((_, idx) => (
                      <i
                        key={idx}
                        className={`fa fa-star ${idx < newRating ? "text-warning" : "text-muted"
                          }`}
                        onClick={() => setNewRating(idx + 1)}
                        style={{ cursor: "pointer" }}
                      ></i>
                    ))}
                  </div>

                  <div className="mb-3">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                    {file && (
                      <div className="text-center mt-2">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="rounded"
                          style={{ maxWidth: "150px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>

                  <button className="btn btn-sqr" onClick={handleAddComment}>
                    Thêm bình luận
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;