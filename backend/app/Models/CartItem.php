<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;
    protected $fillable = [
        'cart_id',
        'product_variant_id',
        'quantity',
        'price'
    ];
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
    public function productVariant()
    {
        return $this->belongsTo(ProductVariant::class, 'product_variant_id');
    }

    public function product()
    {
        return $this->hasOneThrough(Product::class, ProductVariant::class, 'id', 'id', 'product_variant_id', 'product_id');
    }

    public function size()
    {
        return $this->belongsTo(Size::class); 
    }

    public function color()
    {
        return $this->belongsTo(Color::class); 
    }
}
