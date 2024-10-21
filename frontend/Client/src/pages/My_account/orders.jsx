

import React from 'react';
import { Link } from 'react-router-dom';
const Orders = () => {
    return (
        <div>
            <div >
                <div className="myaccount-content">
                    <h5>Đơn Hàng</h5>
                    <div className="myaccount-table table-responsive text-center">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th>Đơn Hàng</th>
                                    <th>Ngày</th>
                                    <th>Trạng Thái</th>
                                    <th>Tổng Cộng</th>
                                    <th>Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>22 Tháng 8, 2018</td>
                                    <td>Đang Xử Lý</td>
                                    <td>$3000</td>
                                    <td>
                                        <Link to="/Order_detail_cancel" className="btn btn-sqr">
                                            Xem
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>22 Tháng 7, 2018</td>
                                    <td>Đã Phê Duyệt</td>
                                    <td>$200</td>
                                    <td>
                                        <Link to="/Order_detail_cancel" className="btn btn-sqr">
                                            Xem
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>12 Tháng 6, 2017</td>
                                    <td>Đang Chờ</td>
                                    <td>$990</td>
                                    <td>
                                        <Link to="/Order_detail_cancel" className="btn btn-sqr">
                                            Xem
                                        </Link>
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

export default Orders;