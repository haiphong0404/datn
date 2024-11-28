<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Support\Facades\Storage;
class ArticlesController extends Controller
{

     public function storeone($id)
     {
         // Tìm bài viết theo ID
         $article = Article::find($id);
     
         if (!$article) {
             return response()->json(['message' => 'Article not found'], 404);
         }
     
         // Chuyển đổi ảnh sang dạng Base64
         $article->image = $this->getImageAsBase64($article->image);
     
         return response()->json($article);
     }     
    public function index()
    {
        // Lấy danh sách bài viết và trả về dạng JSON
        $articles = Article::all();
        $articles = $articles->map(function ($detail) {
            $detail->image = $this->getImageAsBase64($detail->image);
            return $detail;
        });
        return response()->json($articles);
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
}