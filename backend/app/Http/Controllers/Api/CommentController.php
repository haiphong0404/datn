<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    // Hàm chuyển ảnh thành Base64
    private function getImageAsBase64($imagePath)
    {
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));

            if (strpos($mimeType, 'image') === 0) {
                $imageData = Storage::disk('public')->get($imagePath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
            }
        }
        return null;
    }

    // Hiển thị các comment của một sản phẩm
    public function index($product_id)
    {
        $comments = Comment::with('user:id,username,avatar_img')
            ->where('product_id', $product_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(
            $comments->map(function ($comment) {
                return [
                    'id' => $comment->id,
                    'avatar_img' => $this->getImageAsBase64($comment->user->avatar_img),
                    'username' => $comment->user->username ?? 'Unknown',
                    "user_id"  => $comment->user->id ?? 'Unknown',
                    'comment' => $comment->comment,
                    'file' => $this->getImageAsBase64($comment->file),
                    'star_rating' => $comment->star_rating,
                    'created_at' => $comment->created_at->format('d-m-Y H:i:s'),
                ];
            }),
            200
        );
    }

    // Thêm comment
    public function store(Request $request, $product_id)
    {
        try {
            // Lấy người dùng hiện tại
            $user = Auth::user();

            // Kiểm tra nếu người dùng đã mua sản phẩm (dựa trên product_variant_id và product_id)
            $hasPurchased = Order::where('user_id', $user->id)
                ->whereHas('orderDetails.productVariant', function ($query) use ($product_id) {
                    $query->where('product_id', $product_id);
                })
                ->exists();


            if (!$hasPurchased) {
                return response()->json(['message' => 'Bạn phải mua sản phẩm trước khi đánh giá.'], 403);
            }

            // Xác thực dữ liệu
            $validator = Validator::make($request->all(), [
                'comment' => 'required|string|max:500',
                'file' => 'nullable|image|max:10240', // Kiểm tra ảnh, giới hạn kích thước 10MB
                'star_rating' => 'required|integer|min:1|max:5',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            // Xử lý file upload nếu có
            $filePath = null;
            if ($request->hasFile('file')) {
                // Kiểm tra và lưu file
                $file = $request->file('file');
                if ($file->isValid()) {
                    // Lưu file vào thư mục 'comments'
                    $filePath = $file->store('uploads/comments', 'public');
                } else {
                    return response()->json(['message' => 'File không hợp lệ.'], 400);
                }
            }

            // Lưu comment vào cơ sở dữ liệu
            $comment = Comment::create([
                'user_id' => $user->id,
                'product_id' => $product_id,
                'comment' => $request->comment,
                'file' => $filePath, // Lưu đường dẫn file nếu có
                'star_rating' => $request->star_rating,
            ]);

            // Trả về phản hồi thành công
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            // Bắt lỗi và trả về thông báo chi tiết
            return response()->json(['message' => 'Có lỗi xảy ra: ' . $e->getMessage()], 500);
        }
    }

    // Sửa comment
    public function update(Request $request, $id)
    {
        // Tìm comment theo ID hoặc báo lỗi nếu không tìm thấy
        $comment = Comment::findOrFail($id);
    
        // Kiểm tra nếu người dùng không phải là người tạo bình luận thì trả về lỗi
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa đánh giá này.'], 403);
        }
    
        // Validate các trường trong request
        $validator = Validator::make($request->all(), [
            'comment' => 'nullable|string|max:500',  // Kiểm tra nội dung
            'file' => 'nullable|image|max:10240',    // Kiểm tra file ảnh
            'star_rating' => 'nullable|integer|min:1|max:5',  // Kiểm tra đánh giá sao
        ]);
    
        // Nếu validation không thành công, trả về lỗi
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $filePath = null;
        if ($request->hasFile('file')) {
            // Xóa ảnh cũ nếu có
            if ($comment->file && file_exists(public_path('storage/' . $comment->file))) {
                unlink(public_path('storage/' . $comment->file));
            }
    
            // Lưu file mới vào thư mục 'uploads/comments' trong thư mục public
            $file = $request->file('file');
            if ($file->isValid()) {
                $filePath = $file->store('uploads/comments', 'public');
            } else {
                return response()->json(['message' => 'File không hợp lệ.'], 400);
            }
        } else {
            // Nếu không có ảnh mới, giữ nguyên ảnh cũ
            $filePath = $comment->file;
        }
    
        // Cập nhật comment nếu có thay đổi
        $comment->update([
            'comment' => $request->has('comment') ? $request->comment : $comment->comment,  // Chỉ cập nhật comment nếu có trong request
            'file' => $filePath,  // Lưu ảnh mới hoặc giữ nguyên ảnh cũ
            'star_rating' => $request->has('star_rating') ? $request->star_rating : $comment->star_rating,  // Cập nhật sao nếu có
        ]);
    
        // Trả về comment đã được cập nhật
        return response()->json($comment);
    }
    
    // Xóa comment
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);
    
        // Kiểm tra nếu người dùng là admin hoặc là người tạo bình luận
        if (Auth::user()->role !== 'admin' && $comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Bạn không có quyền xóa đánh giá này.'], 403);
        }
    
        $comment->forceDelete();
    
        return response()->json(['message' => 'Đánh giá đã được xóa.']);
    }
    public function addCommentImage(Request $request, $comment_id)
{
    try {
        // Tìm bình luận dựa trên ID
        $comment = Comment::find($comment_id);

        // Kiểm tra xem bình luận có tồn tại không
        if (!$comment) {
            return response()->json(['message' => 'Bình luận không tồn tại.'], 404);
        }

        // Kiểm tra quyền (nếu cần, đảm bảo người dùng chỉ được chỉnh sửa bình luận của chính họ)
        $user = Auth::user();
        if ($comment->user_id !== $user->id) {
            return response()->json(['message' => 'Bạn không có quyền thêm ảnh vào bình luận này.'], 403);
        }

        // Xác thực file
        $validator = Validator::make($request->all(), [
            'file' => 'required|image|max:10240', // Kiểm tra file ảnh, giới hạn kích thước 10MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Xử lý file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // Kiểm tra tính hợp lệ của file
            if ($file->isValid()) {
                // Lưu file vào thư mục 'comments'
                $filePath = $file->store('uploads/comments', 'public');

                // Cập nhật đường dẫn file vào bình luận
                $comment->file = $filePath;
                $comment->save();

                return response()->json(['message' => 'Thêm ảnh thành công.', 'file_path' => $filePath], 200);
            } else {
                return response()->json(['message' => 'File không hợp lệ.'], 400);
            }
        }

        return response()->json(['message' => 'Không tìm thấy file để tải lên.'], 400);
    } catch (\Exception $e) {
        // Bắt lỗi và trả về phản hồi
        return response()->json(['message' => 'Có lỗi xảy ra: ' . $e->getMessage()], 500);
    }
}
}