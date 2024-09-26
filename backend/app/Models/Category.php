<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'description',
    ];
    protected $datas = ['deleted_at'];
    protected static function booted()
    {
        static::deleting(function ($category) {
            // Chỉ xóa mềm các sản phẩm liên quan khi category bị xóa mềm
            $category->products()->delete();
        });
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
