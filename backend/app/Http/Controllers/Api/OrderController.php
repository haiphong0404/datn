<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function abc(Request $request)
    {
        $userId = $request->query('user_id');

        if (!$userId) {
            return response()->json(['error' => 'Bạn phải đăng nhập vào'], 400);
        }

        $orders = Order::where('user_id', $userId)->get();

        return response()->json($orders);
    }

   
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
         DB::beginTransaction();
     
         try {
             $userId = Auth::id();
             if (!$userId) {
                 return response()->json(['error' => 'Người dùng chưa đăng nhập'], 401);
             }
     
             // Kiểm tra phương thức thanh toán và đặt giá trị payment_status
             $paymentStatus = $request->input('payment_method') === 'online' ? 'paid' : 'unpaid';
             $orderDate = Carbon::parse($request->input('order_date'))->format('Y-m-d H:i:s');
     
             $orderData = [
                 'user_id' => $userId,
                 'order_date' => $orderDate,
                 'status' => $request->input('status'),
                 'total_amount' => $request->input('total_amount'),
                 'name' => $request->input('name'),
                 'phone' => $request->input('phone'),
                 'email' => $request->input('email'),
                 'address' => $request->input('address'),
                 'infor' => $request->input('infor'),
                 'payment_status' => $paymentStatus,
             ];
     
             $order = Order::create($orderData);
     
             foreach ($request->products as $product) {
                 OrderDetail::create([
                     'order_id' => $order->id,
                     'product_variant_id' => $product['product_variant_id'],
                     'quantity' => $product['quantity'],
                     'price' => $product['price'],
                 ]);
     
                 // Cập nhật số lượng sản phẩm trong kho
                 $productVariant = ProductVariant::find($product['product_variant_id']);
                 if ($productVariant) {
                     if ($productVariant->quantity >= $product['quantity']) {
                         $productVariant->quantity -= $product['quantity'];
                         $productVariant->save();
                     } else {
                         throw new \Exception('Số lượng sản phẩm không đủ.');
                     }
                 }
             }
     
             DB::commit();
     
             // Lấy chi tiết đơn hàng sau khi tạo
             $order->load('orderDetails.productVariant');
     
             return response()->json([
                 'message' => 'Đơn hàng và Chi tiết đơn hàng đã được tạo thành công!',
                 'order' => $order,
             ], 201);
     
         } catch (\Exception $e) {
             DB::rollBack();
             Log::error('Error creating order: ' . $e->getMessage());
             return response()->json([
                 'message' => 'Đã xảy ra lỗi khi thêm Đơn hàng và Chi tiết đơn hàng.',
                 'error' => $e->getMessage(),
             ], 500);
         }
     }
     

     
     
    /**v
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

        // Validate request
        $request->validate([
            'order_date' => 'required|date',
            'status' => 'required|string',
            'total_amount' => 'required|numeric',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'infor' => 'nullable|string',
        ], [
            'order_date.required' => 'Ngày đặt hàng là bắt buộc.',
            'order_date.date' => 'Ngày đặt hàng không hợp lệ.',
            'status.required' => 'Trạng thái là bắt buộc.',
            'status.string' => 'Trạng thái phải là chuỗi.',
            'total_amount.required' => 'Số tiền tổng là bắt buộc.',
            'total_amount.numeric' => 'Số tiền tổng phải là một số.',
            'name.required' => 'Tên là bắt buộc.',
            'name.string' => 'Tên phải là chuỗi.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.string' => 'Số điện thoại phải là chuỗi.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',
            'address.required' => 'Địa chỉ là bắt buộc.',
            'address.string' => 'Địa chỉ phải là chuỗi.',
            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',
            'infor.string' => 'Thông tin bổ sung phải là chuỗi.',
        ]);

        // Cập nhật thông tin đơn hàng
        $order->update($request->only([
            'order_date',
            'status',
            'total_amount',
            'name',
            'phone',
            'address',
            'infor',
        ]));

        return response()->json($order, 200); // Trả về đơn hàng đã được cập nhật
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Kiểm tra xem đơn hàng có tồn tại không
        $order = Order::findOrFail($id);
        $order->delete(); // Xóa đơn hàng

        return response()->json(['message' => 'Order deleted successfully'], 200); // Trả về thông báo xóa thành công
    }
}