<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getOrderDetails($order_id)
    {
        $orderDetails = DB::table('order_details')
            ->join('orders', 'orders.id', '=', 'order_details.order_id')
            ->join('product_variants', 'product_variants.id', '=', 'order_details.id')
            ->join('products', 'products.id', '=', 'product_variants.product_id')
            ->where('order_details.order_id', $order_id)
            ->select('order_details.*', 'orders.*', 'product_variants.*'
            , 'products.name'
            , 'products.description'
            , 'products.image'
            , 'products.category_id'
            , 'products.brand_id'

            )
            ->get();
            $orderDetails = $orderDetails->map(function ($detail) {
                $detail->image = $this->getImageAsBase64($detail->image);
                return $detail;
            });

        return response()->json($orderDetails);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}