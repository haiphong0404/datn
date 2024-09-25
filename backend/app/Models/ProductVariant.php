<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'size_id',
        'color_id',
        'price',
        'quantity'
    ];
    protected $datas = ['deleted_at'];

}
