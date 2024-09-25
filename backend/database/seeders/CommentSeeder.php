<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('comments')->insert([
                'user_id' => User::inRandomOrder()->first()->id, // Lấy user_id ngẫu nhiên từ bảng users
                'product_id' => Product::inRandomOrder()->first()->id, // Lấy product_id ngẫu nhiên từ bảng products
                'comment' => $faker->text(), // Nội dung bình luận giả          
                'file' => $faker->optional()->imageUrl(), // Đường dẫn file ảnh giả, có thể null
                'star_rating' => $faker->numberBetween(1, 5), // Đánh giá sao ngẫu nhiên từ 1 đến 5      
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
