<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariant extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'size_id',
        'color_id',
        'price',
        'quantity'
    ];

    protected $datas = ['deleted_at'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Quan hệ với bảng colors
    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    // Quan hệ với bảng sizes
    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
