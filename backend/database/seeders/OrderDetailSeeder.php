<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class OrderDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Tạo Faker instance
        $faker = Faker::create();

        // Lấy tất cả các đơn hàng từ bảng orders
        $orders = Order::all();

        // Duyệt qua từng đơn hàng và tạo ít nhất 1 order_detail cho mỗi đơn hàng
        foreach ($orders as $order) {
            // Lấy một product_variant ngẫu nhiên
            $productVariant = ProductVariant::inRandomOrder()->first();

            // Tạo order_detail cho đơn hàng với giá lấy từ product_variant
            DB::table('order_details')->insert([
                'order_id' => $order->id, // Gắn order_id từ bảng orders
                'product_variant_id' => $productVariant->id, // Lấy product_variant_id ngẫu nhiên từ bảng product_variants
                'quantity' => $faker->numberBetween(1, 10), // Số lượng sản phẩm trong đơn hàng
                'price' => $productVariant->price, // Giá lấy từ product_variant
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
