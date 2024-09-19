<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Categorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 10; $i++) {
            DB::table('products')->insert([
                'name' => $faker->word(), // Tạo tên sản phẩm ngẫu nhiên
                'description' => $faker->paragraph(), // Mô tả sản phẩm ngẫu nhiên
                'category_id' => Categorie::inRandomOrder()->first()->id, // Lấy category_id ngẫu nhiên từ bảng categories
                'brand_id' => Brand::inRandomOrder()->first()->id, // Lấy brand_id ngẫu nhiên từ bảng brands
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
