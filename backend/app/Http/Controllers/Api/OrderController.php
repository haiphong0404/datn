<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{


   public function abc(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['error' => 'bạn phải đăng nhập vào'], 400);
        }

        $orders = Order::where('user_id', $userId)->get();

        return response()->json($orders);
    }


// Hàm hỗ trợ chuyển đổi hình ảnh sang chuỗi Base64
private function getImageAsBase64($imagePath)
{
    // Kiểm tra nếu hình ảnh tồn tại
    if ($imagePath && Storage::disk('public')->exists($imagePath)) {
        // Lấy nội dung hình ảnh
        $imageData = Storage::disk('public')->get($imagePath);
        // Lấy loại mime type của hình ảnh
        $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));
        // Mã hóa hình ảnh thành Base64
        return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
    }

    return null; // Nếu không có hình ảnh, trả về null
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      

      
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
     
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Kiểm tra xem đơn hàng có tồn tại không
        $order = Order::find($id);
        
        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404); // Nếu không tìm thấy đơn hàng
        }

        $order->delete(); // Xóa đơn hàng

        return response()->json(['message' => 'Order deleted successfully.'], 200);
    }
}