<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
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
            // Tạo sản phẩm với giá ngẫu nhiên và khởi tạo total_quantity_in_stock là 0
            DB::table('products')->insert([
                'name' => $faker->word(), // Tạo tên sản phẩm ngẫu nhiên
                'description' => $faker->text(255), // Mô tả sản phẩm ngẫu nhiên
                'image' => $faker->imageUrl(),
                'category_id' => Category::inRandomOrder()->first()->id, // Lấy category_id ngẫu nhiên từ bảng categories
                'brand_id' => Brand::inRandomOrder()->first()->id, // Lấy brand_id ngẫu nhiên từ bảng brands
                'total_quantity_in_stock' => 0, // Khởi tạo tổng số lượng
                'price' => $faker->randomFloat(2, 10, 500), // Thêm giá ngẫu nhiên (từ 10 đến 500)
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
