import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useProductById from "../../hooks/useProductById";
import { useComments } from "../../hooks/useComments";
import { addComment, editComment, deleteComment } from "../../api/commentsApi";
import moment from "moment"; // Import moment
import { toast } from "react-toastify";
import useProductAttributes from '../../hooks/useProductAtrib';

const ProductReview = ({ initialTab = "tab_one" }) => {
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
          updateComments(response.data); // Cập nhật trực tiếp state với data nhận được
          setNewComment("");
          setNewRating(0);
          setFile(null);
          toast.success("Bình luận đã được thêm thành công!");
        } else {
          toast.error("Không thể thêm bình luận, vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error adding comment:", error); // Kiểm tra chi tiết lỗi
        toast.error("Có lỗi xảy ra khi thêm bình luận.");
      }
    }
  };





  const handleEditComment = async () => {
    if (editedComment.trim() && editedRating > 0) {
      const formData = new FormData();
      formData.append("comment", editedComment);
      formData.append("star_rating", editedRating);
      if (file) {
        formData.append("file", file);
      }

      try {
        const response = await editComment(editCommentId, formData); // Sử dụng formData khi gọi API
        setEditCommentId(null);
        setEditedComment("");
        setEditedRating(0);
        setFile(null); // Reset file ảnh
        refetch();
        toast.success("Bình luận đã được sửa thành công!");
      } catch (error) {
        console.error("Không sửa bình luận: ", error);
        toast.error("Có lỗi xảy ra khi sửa bình luận.");
      }
    }
  };



  const handleDeleteComment = async (id) => {
    try {
      const userComment = comments.find(comment => comment.id === id);

      // if (userComment.username !== "currentUser") { // Replace with actual username of logged-in user
      //   toast.error("Bạn không có quyền xóa bình luận này.");
      //   return;
      // }

      await deleteComment(id);
      // Cập nhật lại danh sách bình luận sau khi xóa
      refetch();
      // Hiển thị thông báo thành công
      toast.success("Bình luận đã được xóa thành công!");
    } catch (error) {
      console.error("Không xóa bình luận: ", error);
      toast.error("Có lỗi xảy ra khi xóa bình luận.");
    }
  };



  if (productLoading || commentsLoading) {
    return <div>Loading...</div>;
  }

  if (productError || commentsError) {
    return <div>Error loading product or comments data.</div>;
  }

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
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="review-box mb-4">
                  {/* Hiển thị Rating */}
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

                  {/* Hiển thị ảnh nếu có và nếu ảnh là Base64 */}
                  {comment.file && (
                    <div className="review-image">
                      <img src={comment.file} alt="Review" width="130" />
                    </div>
                  )}

                  {/* Hiển thị thời gian bình luận */}
                  <p><strong>Thời gian:</strong> {moment(comment.created_at, "YYYY-MM-DD HH:mm:ss").format('DD-MM-YYYY HH:mm:ss')}</p>


                  <button
                    className="btn me-2"
                    style={{ color: "black" }}
                    onMouseEnter={(e) => (e.target.style.color = "#ffc107")}
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                    onClick={() => {
                      setEditCommentId(comment.id);
                      setEditedComment(comment.comment);
                      setEditedRating(comment.star_rating);
                    }}
                  >
                    Sửa
                  </button>

                  <button
                    className="btn"
                    style={{ color: "black" }}
                    onMouseEnter={(e) => (e.target.style.color = "#dc3545")}
                    onMouseLeave={(e) => (e.target.style.color = "black")}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Xóa
                  </button>

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

                      {/* Hiển thị ảnh hiện tại nếu có */}
                      {comment.file && !file && (
                        <div className="preview-image">
                          <img src={comment.file} alt="Current review image" width="100" />
                          <p>Ảnh hiện tại</p>
                        </div>
                      )}

                      {/* Thêm form nhập ảnh khi sửa bình luận */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />

                      {file && (
                        <div className="preview-image">
                          <img key={file ? URL.createObjectURL(file) : comment.file} src={file ? URL.createObjectURL(file) : comment.file} alt="Review" width="130" />

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
                            setFile(null); // Reset file ảnh
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;