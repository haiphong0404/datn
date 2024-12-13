import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { useParams } from "react-router-dom";
import useProductById from "../../hooks/useProductById";
import { useComments } from "../../hooks/useComments";
import { addComment, editComment, deleteComment } from "../../api/commentsApi";
import moment from "moment"; // Import moment
import { toast } from "react-toastify";
import useProductAttributes from '../../hooks/useProductAtrib';
import LoadingSpinner from "../../loading/LoadingSpinner";
import { useAuth } from '../../contexts/AuthContext';
import { useLoginForm } from '../../hooks/useLoginForm';
import FormData from 'form-data';
import axios from "axios";

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
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const { userInfo } = useLoginForm();
  console.log(comments);




  const handleTabChange = (tabId) => setActiveTab(tabId);

  const handleAddComment = async () => {
    if (newComment.trim() && newRating > 0) {
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
        } else {
          toast.error("Bạn phải mua sản phẩm trước khi đánh giá.");
        }
      } catch (error) {
        toast.error("Bạn phải mua sản phẩm trước khi đánh giá.");
      }
    }
  };


  const handleEditComment = async () => {
    if (editedComment.trim() && editedRating > 0) {
        console.log("Form data is valid. Preparing request...");

        try {
            // Gửi dữ liệu khác bằng PUT
            console.log("Sending request to edit comment...");
            const response = await editComment(editCommentId, {
                comment: editedComment,
                star_rating: editedRating,
            });
            console.log("Response received:", response);

            if (response.status === 200) {
                console.log("Response status is 200, updating comments...");
                const updatedComment = response.data;
                console.log("Updated comment data:", updatedComment);

                // Cập nhật lại danh sách bình luận trong state
                updateComments(prevComments =>
                    prevComments.map(comment =>
                        comment.id === updatedComment.id ? updatedComment : comment
                    )
                );

                // Nếu có file, gửi file bằng POST
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("commentId", editCommentId); // Gửi ID bình luận cùng file
              
                  console.log("Sending request to upload file...");
              
                  try {
                      const uploadResponse = await axios.post(`/comments/${editCommentId}/add-image`, formData, {
                          headers: {
                              'Content-Type': 'multipart/form-data',
                          },
                      });
              
                      console.log("File upload response:", uploadResponse);
              
                      if (uploadResponse.status === 200) {
                          toast.success("Cập nhật file thành công!");
                      } else {
                          toast.error("Cập nhật file không thành công!");
                      }
                  } catch (error) {
                      console.error('Error uploading file:', error);
                      toast.error("Đã xảy ra lỗi khi tải lên.");
                  }
              }

                // Đặt lại trạng thái của form
                setEditedComment("");
                setEditedRating(0);
                setFile(null);
                setEditCommentId(null);

                // Làm mới dữ liệu nếu cần
                refetch();
                toast.success("Cập nhật bình luận thành công.");
            } else {
                console.error("Response status not 200, error occurred.");
                toast.error("Có lỗi xảy ra khi sửa bình luận.");
            }
        } catch (error) {
            console.error("Error while editing comment:", error);
            toast.error("Có lỗi xảy ra khi sửa bình luận.");
        }
    } else {
        console.warn("Invalid input. Please enter valid content and rating.");
        toast.error("Vui lòng nhập nội dung và đánh giá hợp lệ.");
    }
};



  const handleDeleteComment = async (id) => {
    try {
      // Kiểm tra nếu người dùng là admin
      if (userInfo?.role === "admin" || comments.find(comment => comment.id === id)?.user_id === userInfo?.id) {
        const userComment = comments.find(comment => comment.id === id);
        await deleteComment(id);
        refetch();
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

  // Render component đánh giá sản phẩm.



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

        <div className={`tab-pane fade ${activeTab === "tab_three" ? "show active" : ""}`} id="tab_three">
          <div className="reviews">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="review-box mb-4">
                  <div className="ratings mb-2">
                    <strong>Mức độ hài lòng: </strong>
                    {[...Array(5)].map((_, idx) => (
                      <i
                        key={idx}
                        className={`fa fa-star ${idx < comment.star_rating ? 'text-warning' : 'text-muted'}`}
                      />
                    ))}
                  </div>
                  <p><strong>Người đánh giá:</strong> {comment.username}</p>
                  <p><strong>Bình luận:</strong> {comment.comment}</p>
                  {comment.file && (
                    <div className="review-image">
                      <img src={comment.file} alt="Review" width="130" />
                    </div>
                  )}
                  <p><strong>Thời gian:</strong> {moment(comment.created_at, "YYYY-MM-DD HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')}</p>

                  {isAuthenticated && (
                    <div>
                      {(userInfo?.role === "admin" || comment.user_id === userInfo?.id) && (
                        <>
                          {userInfo?.role !== "admin" && (
                            <button
                              className="btn me-2"
                              style={{ color: "black" }}
                              onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                              onMouseLeave={(e) => (e.target.style.color = "black")}
                              onClick={() => {
                                setEditCommentId(comment.id);
                                setEditedComment(comment.comment);
                                setEditedRating(comment.star_rating);
                                setFile(null); // Clear any file selected for editing
                              }}
                            >
                              Sửa
                            </button>
                          )}

                          <button
                            className="btn"
                            style={{ color: "black" }}
                            onMouseEnter={(e) => (e.target.style.color = "#dc3545")}
                            onMouseLeave={(e) => (e.target.style.color = "black")}
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            Xóa
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {editCommentId === comment.id && (
                    <div className="mt-2">
                      <textarea
                        value={editedComment}
                        onChange={(e) => setEditedComment(e.target.value)}
                        className="form-control"
                      />
                      <div className="rating-stars">
                        <span>Mức độ hài lòng: </span>
                        {[...Array(5)].map((_, idx) => (
                          <span
                            key={idx}
                            className={`fa fa-star ${idx < editedRating ? "text-warning" : "text-muted"}`}
                            onClick={() => setEditedRating(idx + 1)}
                          />
                        ))}
                      </div>
                      {comment.file && !file && (
                        <div className="preview-image">
                          <img src={comment.file} alt="Current review image" width="100" />
                          <p>Ảnh hiện tại</p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                      {file && (
                        <div className="preview-image">
                          <img src={URL.createObjectURL(file)} alt="Review" width="130" />
                        </div>
                      )}
                      <div className="d-flex gap-2 mt-2">
                        <button
                          className="btn btn-success btn-sm p-3 rounded custom-btn"
                          onClick={handleEditComment}
                        >
                          Lưu thay đổi
                        </button>
                        <button
                          className="btn btn-danger btn-sm p-3 rounded custom-btn"
                          onClick={() => {
                            setEditCommentId(null);
                            setEditedComment("");
                            setEditedRating(0);
                            setFile(null);
                          }}
                        >
                          Hủy thay đổi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}

            {isAuthenticated && (
              <div className="add-review-form">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && (
                  <div className="preview-image">
                    <img src={URL.createObjectURL(file)} alt="Preview" width="100" />
                  </div>
                )}
                <textarea
                  className="form-control"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Thêm bình luận của bạn..."
                />
                <div className="rating-stars">
                  <strong>Mức độ hài lòng: </strong>
                  {[...Array(5)].map((_, idx) => (
                    <span
                      key={idx}
                      className={`fa fa-star ${idx < newRating ? "text-warning" : "text-muted"}`}
                      onClick={() => setNewRating(idx + 1)}
                    />
                  ))}
                </div>
                <button
                  className="btn btn-sqr mt-2"
                  onClick={handleAddComment}
                >
                  Thêm bình luận
                </button>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default ProductReview;