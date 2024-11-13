<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Lấy danh sách các comment với thông tin user, product, nội dung comment, và start_rating.
     */
    public function index()
    {
        $comments = Comment::with(['user', 'product'])
            ->whereNull('deleted_at') // Chỉ lấy các comment chưa bị xóa mềm
            ->get();
            return response()->json($comments->map(function ($comment) {
            return [
                'id' => $comment->id,
                'user_name' => $comment->user ? $comment->user->username : null,
                'product_name' => $comment->product ? $comment->product->name : 'Unknown',
                'comment' => $comment->comment,
                'star_rating' => $comment->star_rating,
            ];
        }), 200);
    }

    /**
     * Xóa mềm một comment theo ID.
     */
    public function softDelete($id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete(); // Thực hiện xóa mềm (soft delete)

        return response()->json([
            'message' => 'Comment đã được xóa mềm thành công!'
        ], 200);
    }
}
