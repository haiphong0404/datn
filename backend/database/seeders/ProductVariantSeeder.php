<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Size;
use App\Models\Color;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;

class ProductVariantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Lặp qua để tạo 100 biến thể sản phẩm
        for ($i = 0; $i < 50; $i++) {
            // Lấy product_id ngẫu nhiên từ bảng products
            $product = Product::inRandomOrder()->first();

            // Kiểm tra xem sản phẩm có tồn tại không
            if ($product) {
                $size = Size::inRandomOrder()->first(); // Lấy size_id ngẫu nhiên
                $color = Color::inRandomOrder()->first(); // Lấy color_id ngẫu nhiên

                // Kiểm tra xem size và color có tồn tại không
                if ($size && $color) {
                    $quantity = $faker->numberBetween(1, 100); // Số lượng sản phẩm variant

                    // Chèn biến thể vào bảng product_variants
                    $product->variants()->create([
                        'size_id' => $size->id, // Sử dụng Eloquent để tạo mối quan hệ
                        'color_id' => $color->id,
                        'price' => $faker->numberBetween(1000, 50000), // Giá sản phẩm variant
                        'quantity' => $quantity, // Số lượng sản phẩm variant
                        'created_at' => Carbon::now(),
                        'updated_at' => Carbon::now(),
                    ]);

                    // Cập nhật total_quantity_in_stock cho sản phẩm tương ứng
                    $product->total_quantity_in_stock += $quantity;
                    $product->save(); // Lưu lại thay đổi
                }
            }
        }
    }
}
