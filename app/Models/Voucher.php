<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'discount_percentage',
        'start_date',
        'expiration_date',
        'max_discount_value',
        'min_order_value',
        'quantity',
        'user_id'
    ];

}
