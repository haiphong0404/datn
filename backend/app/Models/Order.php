<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'order_date',
        'status',
        'total_amount',
        'name',
        'phone',
        'address',
        'infor'
    ];
    protected $datas = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
