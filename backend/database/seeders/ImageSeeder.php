<?php

namespace Database\Seeders;

use App\Models\ProductVariant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('images')->insert([
                'image' => $faker->imageUrl(640, 480, 'brands', true), // Hình ảnh giả
                'product_variant_id' => ProductVariant::inRandomOrder()->first()->id, // Lấy product_variant_id ngẫu nhiên từ bảng product_variants
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

    }
}
