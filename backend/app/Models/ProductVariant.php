<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductVariant extends Model
{
<<<<<<< HEAD
    use SoftDeletes;
    use HasFactory;
=======
    use HasFactory, SoftDeletes;

>>>>>>> 455a2d0144f66650e7dbd3e3fcc2c0d875d4dce1
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

    // Quan hệ với Size
    public function size()
    {
        return $this->belongsTo(Size::class);
    }

    // Quan hệ với Color
    public function color()
    {
        return $this->belongsTo(Color::class);
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }


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
