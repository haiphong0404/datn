import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import useProductById from '../../hooks/useProductById';

const ProductReview = ({ initialTab = "tab_one" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { productId } = useParams();
  const { product, loading: productLoading, error: productError } = useProductById(productId);
  const { variants, isLoading: variantsLoading, error: variantsError } = useProductvariants(productId);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (productLoading || variantsLoading) {
    return <div>Loading...</div>;
  }

  if (productError || variantsError) {
    return <div>Error loading product data.</div>;
  }

  // Extracting colors and sizes from variants
  const colors = [...new Set(variants.map(variant => variant.color))];
  const sizes = [...new Set(variants.map(variant => variant.size))];

  return (
    <div className="product-review-info">
      <ul className="nav review-tab">
        <li>
          <a
            className={activeTab === "tab_one" ? "active" : ""}
            onClick={() => handleTabChange("tab_one")}
          >
            description
          </a>
        </li>
        <li>
          <a
            className={activeTab === "tab_two" ? "active" : ""}
            onClick={() => handleTabChange("tab_two")}
          >
            information
          </a>
        </li>
        <li>
          <a
            className={activeTab === "tab_three" ? "active" : ""}
            onClick={() => handleTabChange("tab_three")}
          >
            reviews (1) {/* Keeping this label unchanged */}
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
                <td>
                  {colors.length > 0 ? colors.join(', ') : "No colors available."}
                </td>
              </tr>
              <tr>
                <td>Size</td>
                <td>
                  {sizes.length > 0 ? sizes.join(', ') : "No sizes available."}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`tab-pane fade ${activeTab === "tab_three" ? "show active" : ""}`} id="tab_three">
          <form action="#" className="review-form">
            <h5>
              1 review for <span>{product.name}</span> {/* Assuming product has a name */}
            </h5>
            <div className="total-reviews">
              <div className="rev-avatar">
                <img src="assets/img/about/avatar.jpg" alt="" />
              </div>
              <div className="review-box">
                <div className="ratings">
                  <span className="good"><i className="fa fa-star" /></span>
                  <span className="good"><i className="fa fa-star" /></span>
                  <span className="good"><i className="fa fa-star" /></span>
                  <span className="good"><i className="fa fa-star" /></span>
                  <span><i className="fa fa-star" /></span>
                </div>
                <div className="post-author">
                  <p>
                    <span>admin -</span> 30 Mar, 2021
                  </p>
                </div>
                <p>
                  Aliquam fringilla euismod risus ac bibendum. Sed sit amet sem varius ante feugiat lacinia. Nunc ipsum nulla, vulputate ut venenatis vitae, malesuada ut mi. Quisque iaculis, dui congue placerat pretium, augue erat accumsan lacus.
                </p>
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <label className="col-form-label">
                  <span className="text-danger">*</span> Your Name
                </label>
                <input type="text" className="form-control" required />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <label className="col-form-label">
                  <span className="text-danger">*</span> Your Email
                </label>
                <input type="email" className="form-control" required />
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <label className="col-form-label">
                  <span className="text-danger">*</span> Your Review
                </label>
                <textarea className="form-control" required defaultValue={""} />
                <div className="help-block pt-10">
                  <span className="text-danger">Note:</span> HTML is not translated!
                </div>
              </div>
            </div>
            <div className="form-group row">
              <div className="col">
                <label className="col-form-label">
                  <span className="text-danger">*</span> Rating
                </label>
                &nbsp;&nbsp;&nbsp; Bad&nbsp;
                <input type="radio" defaultValue={1} name="rating" />
                &nbsp;
                <input type="radio" defaultValue={2} name="rating" />
                &nbsp;
                <input type="radio" defaultValue={3} name="rating" />
                &nbsp;
                <input type="radio" defaultValue={4} name="rating" />
                &nbsp;
                <input type="radio" defaultValue={5} name="rating" defaultChecked />
                &nbsp;Good
              </div>
            </div>
            <div className="buttons">
              <button className="btn btn-sqr" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
