<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Size;
use App\Models\Color;
use App\Models\Image;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 100; $i++) {
            DB::table('product_variants')->insert([
                'product_id' => Product::inRandomOrder()->first()->id, // Lấy product_id ngẫu nhiên từ bảng products
                'size_id' => Size::inRandomOrder()->first()->id,       // Lấy size_id ngẫu nhiên từ bảng sizes
                'color_id' => Color::inRandomOrder()->first()->id,     // Lấy color_id ngẫu nhiên từ bảng colors
                'image_id' => Image::inRandomOrder()->first()->id,     // Lấy image_id ngẫu nhiên từ bảng images
                'price' => $faker->numberBetween(1000, 50000),   // Giá sản phẩm variant
                'quantity' => $faker->numberBetween(1, 100),     // Số lượng sản phẩm variant
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
