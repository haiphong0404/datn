<?php

namespace Database\Seeders;

use App\Models\Cart;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('cart_items')->insert([
                'cart_id' => Cart::inRandomOrder()->first()->id,
                'product_variant_id' => $faker->randomDigitNotNull(), // Giá trị ngẫu nhiên cho 'product_variant_id'
                'quantity' => $faker->numberBetween(1, 10), // Số lượng ngẫu nhiên từ 1 đến 10
                'price' => $faker->randomFloat(2, 1, 1000), // Giá tiền ngẫu nhiên từ 1 đến 1000 với 2 chữ số thập phân
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
