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
            // Kiểm tra và lưu file
            $file = $request->file('file');
            if ($file->isValid()) {
                // Lưu file vào thư mục 'uploads/comments' trong thư mục public
                $filePath = $file->store('uploads/comments', 'public');
            } else {
                return response()->json(['message' => 'File không hợp lệ.'], 400);
            }
        }

        // Cập nhật comment nếu có thay đổi
        $comment->update([
            'comment' => $request->has('comment') ? $request->comment : $comment->comment,  // Chỉ cập nhật comment nếu có trong request
            'file' => $filePath ?? $comment->file,  // Kiểm tra xem có file không, nếu không thì giữ nguyên giá trị cũ
            'star_rating' => $request->has('star_rating') ? $request->star_rating : $comment->star_rating,  // Cập nhật sao nếu có
        ]);


        // Trả về comment đã được cập nhật
        return response()->json($comment);
    }
    // Xóa comment
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Bạn không có quyền xóa đánh giá này.'], 403);
        }
        $comment->forceDelete();

        return response()->json(['message' => 'Đánh giá đã được xóa.']);
    }
}