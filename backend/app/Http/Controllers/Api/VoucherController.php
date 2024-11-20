<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Carbon\Carbon;

class VoucherController extends Controller
{
    public function applyVoucher(Request $request)
    {
        // Kiểm tra mã voucher được gửi lên
        $validated = $request->validate([
            'voucher_code' => 'required|string|exists:vouchers,code', // Mã voucher phải tồn tại trong bảng vouchers
        ]);

        $voucher = Voucher::where('code', $validated['voucher_code'])->first();

        // Kiểm tra thời gian áp dụng voucher
        $now = Carbon::now();
        if ($now->lessThan($voucher->start_date) || $now->greaterThan($voucher->expiration_date)) {
            return response()->json([
                'message' => 'Mã giảm giá không nằm trong thời gian áp dụng'
            ], 400);
        }

        // Kiểm tra số lượng voucher còn lại
        if ($voucher->quantity <= 0) {
            return response()->json([
                'message' => 'Mã giảm giá đã hết lượt sử dụng'
            ], 400);
        }

        // Trả về thông tin voucher
        return response()->json([
            'message' => 'Áp dụng mã giảm giá thành công',
            'voucher' => [
                'id' => $voucher->id,
                'code' => $voucher->code,
                'type' => $voucher->type,
                'discount_percentage' => $voucher->discount_percentage,
                'discount_value' => $voucher->discount_value,
                'min_order_value' => $voucher->min_order_value,
                'max_discount_value' => $voucher->max_discount_value,
                'category_id' => $voucher->category_id,
                'quantity' => $voucher->quantity
            ]
        ], 200);
    }
}