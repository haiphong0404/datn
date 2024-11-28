<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class VnpayController extends Controller
{
    // Tạo URL thanh toán
    public function createPayment(Request $request)
{
    // Xác thực dữ liệu đầu vào
    $validatedData = $request->validate([
        'order_date' => 'required|date',
        'status' => 'required|string',
        'total_amount' => 'required|numeric|min:1000',
        'name' => 'required|string',
        'phone' => 'required|string',
        'address' => 'required|string',
        'payment_status' => 'required|string',
        'products' => 'required|array',
        'products.*.product_variant_id' => 'required|integer',
        'products.*.color' => 'required|string',
        'products.*.size' => 'required|string',
        'products.*.quantity' => 'required|integer|min:1',
        'products.*.price' => 'required|numeric|min:1000',
        'user_id' => 'required|integer'
    ]);

    try {
        // Lưu đơn hàng vào cơ sở dữ liệu
        $order = Order::create([
            'user_id' => $validatedData['user_id'],
            'order_date' => $validatedData['order_date'],
            'status' => $validatedData['status'],
            'total_amount' => $validatedData['total_amount'],
            'name' => $validatedData['name'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'payment_status' => $validatedData['payment_status'],
        ]);

        // Lưu chi tiết sản phẩm vào cơ sở dữ liệu
        foreach ($validatedData['products'] as $product) {
            $order->products()->create($product);
        }

        // Tạo URL thanh toán VNPAY
        $vnpayUrl = $this->generateVnPayUrl($order);

        // Trả về URL và thông tin đơn hàng
        return response()->json([
            'url' => $vnpayUrl,
            'order_id' => $order->id,
            'order_info' => $order->name,
        ]);

    } catch (\Exception $e) {
        // Log lỗi và trả về phản hồi lỗi
        \Log::error('Lỗi tạo thanh toán: ' . $e->getMessage());
        return response()->json([
            'message' => 'Đã xảy ra lỗi trong quá trình tạo thanh toán',
        ], 500);
    }
}
    // Xử lý phản hồi từ VNPAY
    public function handleReturn(Request $request)
    {
        $vnp_HashSecret = "7QW7TKM4UHHKY82XMYCHY64IU34JAZGA"; // Nhận từ VNPAY
        $inputData = $request->all();
        $vnp_SecureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $hashData = urldecode(http_build_query($inputData));
        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        if ($secureHash === $vnp_SecureHash) {
            if ($inputData['vnp_ResponseCode'] == '00') {
                return response()->json(['message' => 'Giao dịch thành công', 'data' => $inputData]);
            }
            return response()->json(['message' => 'Giao dịch thất bại', 'data' => $inputData]);
        }

        return response()->json(['message' => 'Sai chữ ký!', 'data' => $inputData]);
    }
    private function generateVnPayUrl($order)
{
    $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
 $vnp_Returnurl = "http://localhost:3000/my_account/orders"; // URL callback cho React
$vnp_TmnCode = "A5JJU49U"; // Mã website tại VNPAY
$vnp_HashSecret = "7QW7TKM4UHHKY82XMYCHY64IU34JAZGA"; // Chuỗi bí mật



    $vnp_TxnRef = $order->id; // Mã đơn hàng
    $vnp_OrderInfo = "Thanh toán đơn hàng " . $order->id;
    $vnp_Amount = $order->total_amount * 100; // Giá trị VNĐ x 100
    $vnp_IpAddr = request()->ip();

    $inputData = [
        "vnp_Version" => "2.1.0",
        "vnp_TmnCode" => $vnp_TmnCode,
        "vnp_Amount" => $vnp_Amount,
        "vnp_Command" => "pay",
        "vnp_CreateDate" => date('YmdHis'),
        "vnp_CurrCode" => "VND",
        "vnp_IpAddr" => $vnp_IpAddr,
        "vnp_Locale" => "vn",
        "vnp_OrderInfo" => $vnp_OrderInfo,
        "vnp_OrderType" => "other",
        "vnp_ReturnUrl" => $vnp_Returnurl,
        "vnp_TxnRef" => $vnp_TxnRef,
    ];

    // Sắp xếp và tạo query string
    ksort($inputData);
    $query = "";
    $hashdata = "";
    foreach ($inputData as $key => $value) {
        $query .= urlencode($key) . "=" . urlencode($value) . "&";
        $hashdata .= $key . "=" . $value . "&";
    }
    $query = rtrim($query, "&");
    $hashdata = rtrim($hashdata, "&");
    $vnp_Url .= "?" . $query;

    if ($vnp_HashSecret) {
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
        $vnp_Url .= "&vnp_SecureHash=" . $vnpSecureHash;
    }

    return $vnp_Url;
}
}
