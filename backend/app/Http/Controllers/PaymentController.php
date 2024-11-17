<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    // API tạo URL thanh toán VnPay
    public function createPayment(Request $request)
    {
        // Thông tin cần thiết để tạo URL thanh toán
        $vnp_TmnCode = "A5JJU49U"; // Mã TmnCode của bạn
        $vnp_HashSecret = "7QW7TKM4UHHKY82XMYCHY64IU34JAZGA"; // Chuỗi bí mật để mã hóa
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // URL VnPay
        $vnp_Returnurl = route('payment.return'); // URL trả về sau khi thanh toán

        // Các thông tin thanh toán
        $vnp_TxnRef = "100000"; // Mã giao dịch (mỗi giao dịch là duy nhất)
        $vnp_OrderInfo = "Thanh toán đơn hàng";
        $vnp_OrderType = "billpayment";
        $vnp_Amount = $request->amount * 100; // Lưu ý: nhân với 100 để đúng với yêu cầu của VnPay
        $vnp_Locale = "vn";
        $vnp_IpAddr = $request->ip();

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        // Sắp xếp các tham số theo thứ tự abc
        ksort($inputData);
        $query = "";
        $hashdata = "";

        foreach ($inputData as $key => $value) {
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
            $hashdata .= $key . "=" . $value . '&';
        }

        $query = rtrim($query, '&');
        $hashdata = rtrim($hashdata, '&');
        $vnp_Url = $vnp_Url . "?" . $query;

        // Tạo chữ ký cho URL
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= '&vnp_SecureHash=' . $vnpSecureHash;
        }

        return response()->json(['url' => $vnp_Url]);
    }

    // API xử lý sau khi thanh toán
    public function returnPayment(Request $request)
    {
        // Kiểm tra tham số trả về từ VnPay
        $vnp_SecureHash = $request->vnp_SecureHash;
        $inputData = $request->except('vnp_SecureHash', 'vnp_SecureHashType');
        ksort($inputData);

        $hashData = "";
        foreach ($inputData as $key => $value) {
            $hashData .= $key . "=" . $value . '&';
        }

        $hashData = rtrim($hashData, '&');
        $vnp_HashSecret = "YOUR_VNPAY_HASH_SECRET"; // Chuỗi bí mật để mã hóa

        // Tạo hash để kiểm tra tính hợp lệ
        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        // Kiểm tra tính hợp lệ của giao dịch
        if ($secureHash === $vnp_SecureHash) {
            if ($request->vnp_ResponseCode == "00") {
                // Thanh toán thành công
                return response()->json(['status' => 'success', 'message' => 'Giao dịch thành công']);
            } else {
                // Thanh toán thất bại
                return response()->json(['status' => 'fail', 'message' => 'Giao dịch không thành công']);
            }
        } else {
            // Chữ ký không hợp lệ
            return response()->json(['status' => 'error', 'message' => 'Chữ ký không hợp lệ']);
        }
    }
}
