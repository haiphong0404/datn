<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'type',
        'discount_percentage',
        'discount_value',
        'category_id',
        'start_date',
        'expiration_date',
        'max_discount_value',
        'min_order_value',
        'quantity',
        'user_id'
    ];

    /**
     * Quan hệ với model User (người tạo voucher)
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Quan hệ với model Category (áp dụng cho danh mục cụ thể)
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Kiểm tra nếu voucher này còn hiệu lực
     */
    public function isActive()
    {
        $now = now();
        return $this->quantity > 0 && $this->start_date <= $now && $this->expiration_date >= $now;
    }

    /**
     * Kiểm tra điều kiện áp dụng cho đơn hàng với giá trị nhất định
     */
    public function canBeAppliedToOrder($orderValue)
    {
        return $this->isActive() && $orderValue >= $this->min_order_value;
    }

    /**
     * Tính toán số tiền giảm giá dựa trên loại voucher
     */
    public function calculateDiscount($orderValue)
    {
        if (!$this->canBeAppliedToOrder($orderValue)) {
            return 0;
        }

        switch ($this->type) {
            case 'percentage':
                $discount = $orderValue * ($this->discount_percentage / 100);
                return $this->max_discount_value ? min($discount, $this->max_discount_value) : $discount;

            case 'fixed':
                return min($this->discount_value, $orderValue);

            case 'shipping':
                return 0; // Miễn phí vận chuyển có thể xử lý ở nơi khác trong logic

            case 'category_discount':
                return $orderValue * ($this->discount_percentage / 100);

            case 'first_order':
                return min($this->discount_value, $orderValue);

            default:
                return 0;
        }
    }
}
