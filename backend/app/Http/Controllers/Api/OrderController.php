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
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'order_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'infor' => 'nullable|string',
        ],[
            'order_date.required' => 'Bạn phải nhập order_date',
            'order_date.date' => 'order_date phải là ngày',
            'status.required' => 'Bạn phải nhập status',
            'status.string' => 'status phải là kiểu chuỗi',
            'total_amount.required' => 'Bạn phải nhập total_amount',
            'total_amount.numeric' => 'total_amount phải là kiểu số',
            'name.required' => 'Bạn phải nhập tên',
            'name.string' => 'Tên phải là kiểu chuỗi',
            'phone.required' => 'Bạn phải nhập số điện thoại',
            'phone.string' => 'Số điện thoại phải là kiểu chuỗi',
            'address.required' => 'Bạn phải nhập địa chỉ',
            'address.string' => 'Địa chỉ phải là kiểu chuỗi',
            'infor.string' => 'Thông tin bổ sung phải là kiểu chuỗi',
        ]);
    
        // Tạo mới bản ghi
        $order = Order::create($validatedData);
    
        // Trả về response
        return response()->json([
            'message' => 'Order created successfully',
            'data' => $order,
        ], 201);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Tìm bản ghi theo id
        $order = Order::findOrFail($id);
    
        // Trả về response với dữ liệu bản ghi
        return response()->json([
            'message' => 'Order details retrieved successfully',
            'data' => $order,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Tìm bản ghi cần sửa
        $order = Order::findOrFail($id);
    
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'order_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'name' => 'required|string',
            'phone' => 'required|string',
            'address' => 'required|string',
            'infor' => 'nullable|string',
        ],[
            'order_date.required' => 'Bạn phải nhập order_date',
            'order_date.date' => 'order_date phải là ngày',
            'status.required' => 'Bạn phải nhập status',
            'status.string' => 'status phải là kiểu chuỗi',
            'total_amount.required' => 'Bạn phải nhập total_amount',
            'total_amount.numeric' => 'total_amount phải là kiểu số',
            'name.required' => 'Bạn phải nhập tên',
            'name.string' => 'Tên phải là kiểu chuỗi',
            'phone.required' => 'Bạn phải nhập số điện thoại',
            'phone.string' => 'Số điện thoại phải là kiểu chuỗi',
            'address.required' => 'Bạn phải nhập địa chỉ',
            'address.string' => 'Địa chỉ phải là kiểu chuỗi',
            'infor.string' => 'Thông tin bổ sung phải là kiểu chuỗi',
        ]);
    
        // Cập nhật bản ghi với dữ liệu mới
        $order->update($validatedData);
    
        // Trả về response
        return response()->json([
            'message' => 'Order updated successfully',
            'data' => $order,
        ], 200);
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