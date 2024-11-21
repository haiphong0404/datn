import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const CancelOrderButton = ({ orderId, refetch }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // Điều khiển modal

    // Xử lý hủy đơn hàng
    const cancelOrder = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        const requestData = {
            newStatus: 'cancelled',  // Thêm dữ liệu vào body
        };
        console.log('Gửi yêu cầu hủy đơn hàng với ID:', orderId, 'Dữ liệu gửi:', requestData);
    
        try {
            // Gọi API để hủy đơn hàng
            const response = await axios.post(
                `http://127.0.0.1:8000/api/order/${orderId}/status`,
                requestData  // Gửi dữ liệu này vào body
            );
            
            // Log phản hồi từ API
            console.log('Phản hồi từ API:', response.data);
    
            if (response.data.success) {
                toast.success('Đơn hàng đã được hủy thành công.');
                refetch();  // Lấy lại dữ liệu đơn hàng sau khi hủy
                setShowConfirmation(false); // Ẩn modal sau khi hủy thành công
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            console.error('Đã xảy ra lỗi:', err);
            setError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const modalStyle = {
        width: '50%',
        maxWidth: '600px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: '28%',
        left: '31%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1050,
    };

    const headerStyle = {
        backgroundColor: '#87b106',
        color: 'white',
        padding: '20px 30px',
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: '600',
    };

    const bodyStyle = {
        padding: '20px 30px',
        color: '#333',
        fontSize: '16px',
    };

    const footerStyle = {
        borderTop: '2px solid #dee2e6',
        padding: '15px 30px',
        textAlign: 'right',
    };

    const cancelButtonStyle = {
        fontSize: '14px',
        padding: '10px 20px',
        marginRight: '10px',
        borderRadius: '5px',
        backgroundColor: '#6c757d',
        borderColor: '#6c757d',
        transition: 'all 0.3s ease',
    };

    const confirmButtonStyle = {
        fontSize: '14px',
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        borderColor: '#dc3545',
        borderRadius: '5px',
        transition: 'all 0.3s ease',
    };

    const disabledButtonStyle = {
        opacity: 0.5,
        cursor: 'not-allowed',
    };

    return (
        <div>
            {/* Nút Hủy Đơn Hàng */}
            <button
                onClick={() => setShowConfirmation(true)}
                disabled={loading}
                className="btn btn-sqr2"
            >
                {loading ? 'Đang hủy đơn hàng...' : 'Hủy Đơn Hàng'}
            </button>

            {/* Modal Xác Nhận Hủy Đơn Hàng */}
            <Modal
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                style={modalStyle}
            >
                <Modal.Header closeButton style={headerStyle}>
                    <Modal.Title style={titleStyle}>Xác Nhận Hủy Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body style={bodyStyle}>
                    <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
                </Modal.Body>
                <Modal.Footer style={footerStyle}>
                    <Button
                        variant="danger"
                        onClick={cancelOrder}
                        disabled={loading}
                        style={loading ? { ...confirmButtonStyle, ...disabledButtonStyle } : confirmButtonStyle}
                    >
                        {loading ? 'Đang hủy...' : 'Xác nhận hủy'}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => setShowConfirmation(false)}
                        style={cancelButtonStyle}
                    >
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>

          
            
        </div>
    );
};

export default CancelOrderButton;
