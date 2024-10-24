<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
   
    public function acb($user_id)
    {
        $orders = DB::table('orders')
            ->join('users', 'users.id', '=', 'orders.user_id')
            ->join('carts', 'carts.user_id', '=', 'users.id')
            ->join('cart_items', 'cart_items.cart_id', '=', 'carts.id')
            ->join('product_variants', 'product_variants.id', '=', 'cart_items.product_variant_id')
            ->where('orders.user_id', $user_id)
            ->select('orders.*', 'users.*', 'carts.*', 'cart_items.*', 'product_variants.*')
            ->get();
    
        return response()->json($orders);  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_date' => 'required|date',
            'status' => 'required|string|max:50',
            'total_amount' => 'required|numeric',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'infor' => 'nullable|string',
        ], [
            'user_id.required' => 'ID người dùng không được bỏ trống.',
            'user_id.exists' => 'ID người dùng không tồn tại trong hệ thống.',
            'order_date.required' => 'Ngày đặt hàng không được bỏ trống.',
            'order_date.date' => 'Ngày đặt hàng phải là một ngày hợp lệ.',
            'status.required' => 'Trạng thái không được bỏ trống.',
            'status.string' => 'Trạng thái phải là một chuỗi.',
            'status.max' => 'Trạng thái không được vượt quá 50 ký tự.',
            'total_amount.required' => 'Tổng số tiền không được bỏ trống.',
            'total_amount.numeric' => 'Tổng số tiền phải là một số.',
            'name.required' => 'Tên không được bỏ trống.',
            'name.string' => 'Tên phải là một chuỗi.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'phone.required' => 'Số điện thoại không được bỏ trống.',
            'phone.string' => 'Số điện thoại phải là một chuỗi.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',
            'address.required' => 'Địa chỉ không được bỏ trống.',
            'address.string' => 'Địa chỉ phải là một chuỗi.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'infor.string' => 'Thông tin bổ sung phải là một chuỗi.',
        ]);
    

    // Tạo đơn hàng mới
    $order = Order::create($validatedData);

    return response()->json($order, 201);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
{
    // Tìm đơn hàng theo ID
    $order = Order::find($id);

    // Kiểm tra xem đơn hàng có tồn tại hay không
    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    // Trả về thông tin chi tiết của đơn hàng
    return response()->json($order, 200);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Tìm đơn hàng theo ID
        $order = Order::find($id);
    
        // Kiểm tra xem đơn hàng có tồn tại hay không
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    
        // Xác thực dữ liệu đầu vào
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'order_date' => 'required|date',
            'status' => 'required|string|max:50',
            'total_amount' => 'required|numeric',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'infor' => 'nullable|string',
        ], [
            'user_id.required' => 'ID người dùng không được bỏ trống.',
            'user_id.exists' => 'ID người dùng không tồn tại trong hệ thống.',
            'order_date.required' => 'Ngày đặt hàng không được bỏ trống.',
            'order_date.date' => 'Ngày đặt hàng phải là một ngày hợp lệ.',
            'status.required' => 'Trạng thái không được bỏ trống.',
            'status.string' => 'Trạng thái phải là một chuỗi.',
            'status.max' => 'Trạng thái không được vượt quá 50 ký tự.',
            'total_amount.required' => 'Tổng số tiền không được bỏ trống.',
            'total_amount.numeric' => 'Tổng số tiền phải là một số.',
            'name.required' => 'Tên không được bỏ trống.',
            'name.string' => 'Tên phải là một chuỗi.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'phone.required' => 'Số điện thoại không được bỏ trống.',
            'phone.string' => 'Số điện thoại phải là một chuỗi.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',
            'address.required' => 'Địa chỉ không được bỏ trống.',
            'address.string' => 'Địa chỉ phải là một chuỗi.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'infor.string' => 'Thông tin bổ sung phải là một chuỗi.',
        ]);
    
        // Cập nhật đơn hàng với dữ liệu đã xác thực
        $order->update($validatedData);
    
        return response()->json(['message' => 'Order updated successfully', 'data' => $order], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::find($id);

    // Kiểm tra xem đơn hàng có tồn tại hay không
    if (!$order) {
        return response()->json(['message' => 'Order not found'], 404);
    }

    // Xóa đơn hàng
    $order->delete();

    return response()->json(['message' => 'Order deleted successfully'], 200);
    }
}
