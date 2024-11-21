<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Carbon\Carbon;

class PaymentController extends Controller
{
    public function createPayment(Request $request)
    {
        date_default_timezone_set('Asia/Ho_Chi_Minh');

        // Cấu hình VNPay
        $vnp_TmnCode = "JWCI3U3R"; // Mã định danh merchant (Terminal ID)
        $vnp_HashSecret = "CIKSVTCXXGPZIQXKNSYWRMXZRNAWMLUA"; // Secret key
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // URL sandbox
        $vnp_Returnurl = "http://localhost:3000/my_account/orders"; // URL callback sau khi thanh toán

        // Lấy mã ngân hàng từ request
        $vnp_BankCode = $request->input('bank_code', 'NCB'); // Mặc định là NCB

        // Danh sách ngân hàng được hỗ trợ
        $supportedBanks = [
            'NCB',         // Ngân hàng TMCP Quốc Dân
            'VCB',         // Vietcombank
            'BIDV',        // BIDV
            'VietinBank',  // VietinBank
            'SACOMBANK'    // Sacombank
        ];

        // Kiểm tra xem mã ngân hàng có hợp lệ không
        if (!in_array($vnp_BankCode, $supportedBanks)) {
            return response()->json([
                'message' => 'Ngân hàng thanh toán không được hỗ trợ. Vui lòng chọn ngân hàng khác.',
                'supported_banks' => $supportedBanks
            ], 400);
        }

        // Tạo đơn hàng
        $orderData = [
            'user_id' => $request->input('user_id'),
            'order_date' => Carbon::now()->format('Y-m-d H:i:s'),
            'status' => $request->input('status', 'pending'),
            'total_amount' => $request->input('total_amount'),
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address'),
            'infor' => $request->input('infor', 'ACB'),
            'payment_method' => 'vnpay',
            'payment_status' => 'unpaid',
        ];

        $order = Order::create($orderData);

        // Các tham số gửi đến VNPay
        $vnp_TxnRef = $order->id; // Mã giao dịch thanh toán
        $vnp_OrderInfo = "Thanh toán đơn hàng #" . $order->id; // Nội dung giao dịch
        $vnp_Amount = intval($order->total_amount * 100); // Tổng số tiền tính bằng VND * 100
        $vnp_IpAddr = $request->ip(); // Địa chỉ IP của khách hàng
        $vnp_CreateDate = date('YmdHis'); // Thời gian tạo giao dịch
        $vnp_ExpireDate = Carbon::now()->addMinutes(30)->format('YmdHis'); // Hạn thanh toán

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => $vnp_CreateDate,
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => "vn",
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => "billpayment",
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_ExpireDate" => $vnp_ExpireDate,
        ];

        // Thêm mã ngân hàng nếu có
        $inputData['vnp_BankCode'] = $vnp_BankCode;

        // Sắp xếp tham số theo thứ tự
        ksort($inputData);
        $query = "";
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            $hashdata .= urlencode($key) . "=" . urlencode($value) . "&";
            $query .= urlencode($key) . "=" . urlencode($value) . "&";
        }

        // Loại bỏ ký tự `&` cuối cùng
        $hashdata = rtrim($hashdata, "&");
        $query = rtrim($query, "&");

        // Tạo chữ ký bảo mật
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);

        // Tạo URL thanh toán
        $vnp_Url = $vnp_Url . "?" . $query . "&vnp_SecureHash=" . $vnpSecureHash;

        // Trả về kết quả
        return response()->json([
            'message' => 'Đơn hàng đã được tạo thành công!',
            'order' => $order,
            'payment_url' => $vnp_Url,
        ], 201);
    }
}
