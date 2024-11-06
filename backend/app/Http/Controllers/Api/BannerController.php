<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banner = Banner::withTrashed()->get();
        if ($banner->isEmpty()) {
            return response()->json([
                'message' => 'Không có banner nào được tìm thấy!'
            ], 404);
        }
        return response()->json($banner->map(function ($banner) {
            return [
                'id' => $banner->id,
                'image_url' => $this->getImageAsBase64($banner->image_url),
                'title' => $banner->title,
                'sub_title' => $banner->sub_title,
                'span_title' => $banner->span_title,
            ];
        }),200);
    }
    private function getImageAsBase64($imagePath)
    {
        // Kiểm tra nếu hình ảnh tồn tại
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            // Lấy nội dung hình ảnh
            $imageData = Storage::disk('public')->get($imagePath);
            // Lấy loại mime type bằng cách sử dụng FFMpeg hoặc PHP
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath)); // Sửa tại đây
            // Mã hóa hình ảnh thành Base64
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null; // Nếu không có hình ảnh, trả về null
    }

}