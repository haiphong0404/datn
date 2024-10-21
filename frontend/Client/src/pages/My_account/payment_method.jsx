

import React from 'react';
import { Link } from 'react-router-dom';
const Payment_method = () => {
    return (
        <div>
            <div
              
            >
                <div className="myaccount-content">
                    <h5>Tải Xuống</h5>
                    <div className="myaccount-table table-responsive text-center">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Sản Phẩm</th>
                                    <th>Ngày</th>
                                    <th>Hết Hạn</th>
                                    <th>Tải Xuống</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>GIÀY NAM PRIMITIVE</td>
                                    <td>22 Tháng 8, 2018</td>
                                    <td>Có</td>
                                    <td>
                                        <a href="#" className="btn btn-sqr">
                                            <i className="fa fa-cloud-download" />
                                            Tải Tệp
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>GIÀY NỮ REXPO</td>
                                    <td>12 Tháng 9, 2018</td>
                                    <td>Không Bao Giờ</td>
                                    <td>
                                        <a href="#" className="btn btn-sqr">
                                            <i className="fa fa-cloud-download" />
                                            Tải Tệp
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment_method;