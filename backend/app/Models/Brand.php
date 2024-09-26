<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'name',
        'description',
        'link',
        'image'
    ];

    protected $dates = ['deleted_at'];
    protected static function booted()
    {
        static::deleting(function ($brand) {
            // Chỉ xóa mềm các sản phẩm liên quan khi brand bị xóa mềm
            $brand->products()->delete();
        });
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
