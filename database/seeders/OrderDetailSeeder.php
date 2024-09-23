<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('order_details')->insert([
                'order_id' => Order::inRandomOrder()->first()->id, // Lấy order_id ngẫu nhiên từ bảng orders
                'product_variant_id' => ProductVariant::inRandomOrder()->first()->id, // Lấy product_variant_id ngẫu nhiên từ bảng product_variants
                'quantity' => $faker->numberBetween(1, 10), // Số lượng sản phẩm trong đơn hàng
                'price' => $faker->numberBetween(1000, 50000), // Giá sản phẩm trong đơn hàng
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
