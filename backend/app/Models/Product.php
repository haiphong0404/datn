<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'category_id',  
        'brand_id',
        'image',
<<<<<<< HEAD
        'category_id',
        'brand_id',
        'total_quantity_in_stock',
        'price',
=======
>>>>>>> 455a2d0144f66650e7dbd3e3fcc2c0d875d4dce1
    ];

    protected $dates = ['deleted_at'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }




    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }
}
