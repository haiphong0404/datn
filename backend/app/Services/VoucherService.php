<?php

namespace App\Services;

use App\Models\Voucher;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VoucherService
{
    public function createVoucher($data)
    {
        $voucher = new Voucher();
        $voucher->user_id = Auth::id(); // Ghi nhận người tạo voucher
        $voucher->code = $data['code'];
        $voucher->start_date = $data['start_date'];
        $voucher->expiration_date = $data['expiration_date'];
        $voucher->type = $data['type'];
        $voucher->quantity = $data['quantity']; // Số lượng

        // Kiểm tra loại voucher và chỉ lưu các trường tương ứng
        switch ($data['type']) {
            case 'percentage':
                $voucher->discount_percentage = $data['discount_percentage'];
                $voucher->max_discount_value = $data['max_discount_value'];
                break;

            case 'fixed':
                $voucher->discount_value = $data['discount_value'];
                $voucher->min_order_value = $data['min_order_value'];
                break;

            case 'category_discount':
                $voucher->discount_percentage = $data['discount_percentage'];
                $voucher->category_id = $data['category_id'];
                break;

            case 'first_order':
                $voucher->discount_value = $data['discount_value'];
                $voucher->min_order_value = $data['min_order_value'];
                break;

            default:
                throw new \InvalidArgumentException('Loại mã giảm giá không hợp lệ.');
        }

        // Lưu voucher vào database
        $voucher->save();

        return $voucher;
    }

    public function updateVoucher(int $id, array $data): Voucher
    {
        DB::beginTransaction();
        try {
            // Lấy voucher từ DB
            $voucher = Voucher::findOrFail($id);

            // Cập nhật các trường chung
            $voucher->type = $data['type'];
            $voucher->start_date = $data['start_date'];
            $voucher->expiration_date = $data['expiration_date'];
            $voucher->quantity = $data['quantity'];

            // Đặt giá trị mặc định
            $voucher->discount_percentage = null;
            $voucher->max_discount_value = null;
            $voucher->discount_value = null;
            $voucher->min_order_value = null;
            $voucher->category_id = null;

            // Cập nhật theo từng loại voucher
            switch ($data['type']) {
                case 'percentage':
                    $voucher->discount_percentage = $data['discount_percentage'];
                    $voucher->max_discount_value = $data['max_discount_value'];
                    break;

                case 'fixed':
                    $voucher->discount_value = $data['discount_value'];
                    $voucher->min_order_value = $data['min_order_value'];
                    break;

                case 'category_discount':
                    $voucher->discount_percentage = $data['discount_percentage'];
                    $voucher->category_id = $data['category_id'];
                    break;

                case 'first_order':
                    $voucher->discount_value = $data['discount_value'];
                    $voucher->min_order_value = $data['min_order_value'];
                    break;

                default:
                    throw new \InvalidArgumentException('Loại mã giảm giá không hợp lệ.');
            }

            // Lưu voucher
            $voucher->save();

            DB::commit();

            return $voucher;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
