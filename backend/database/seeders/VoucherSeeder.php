<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Voucher;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();

        // Lấy danh sách category_id từ bảng categories
        $validCategoryIds = Category::pluck('id')->toArray(); // Lấy tất cả id của các danh mục

        // Lấy danh sách các user_id có role là 'staff' hoặc 'admin'
        $eligibleUserIds = User::whereIn('role', ['staff', 'admin'])->pluck('id')->toArray();

        // Seeder nhiều voucher cho loại percentage
        foreach (range(1, 5) as $index) {
            Voucher::create([
                'code' => 'PERCENT' . $faker->unique()->numberBetween(100, 999),
                'type' => 'percentage',
                'discount_percentage' => $faker->numberBetween(5, 20),
                'max_discount_value' => $faker->numberBetween(100000, 500000),
                'start_date' => Carbon::now(),
                'expiration_date' => Carbon::now()->addMonth(),
                'quantity' => $faker->numberBetween(50, 200),
                'user_id' => $faker->randomElement($eligibleUserIds)
            ]);
        }

        // Seeder nhiều voucher cho loại fixed
        foreach (range(1, 5) as $index) {
            Voucher::create([
                'code' => 'FIXED' . $faker->unique()->numberBetween(100, 999),
                'type' => 'fixed',
                'discount_value' => $faker->numberBetween(50000, 200000),
                'min_order_value' => $faker->numberBetween(200000, 1000000),
                'start_date' => Carbon::now(),
                'expiration_date' => Carbon::now()->addMonth(),
                'quantity' => $faker->numberBetween(20, 100),
                'user_id' => $faker->randomElement($eligibleUserIds)
            ]);
        }

        // Seeder nhiều voucher cho loại shipping
        foreach (range(1, 3) as $index) {
            Voucher::create([
                'code' => 'SHIP' . $faker->unique()->numberBetween(100, 999),
                'type' => 'shipping',
                'start_date' => Carbon::now(),
                'expiration_date' => Carbon::now()->addMonth(),
                'quantity' => $faker->numberBetween(10, 50),
                'user_id' => $faker->randomElement($eligibleUserIds)
            ]);
        }

        // Seeder nhiều voucher cho loại category_discount
        foreach (range(1, 5) as $index) {
            Voucher::create([
                'code' => 'CAT' . $faker->unique()->numberBetween(100, 999),
                'type' => 'category_discount',
                'discount_percentage' => $faker->numberBetween(5, 30),
                'category_id' => $faker->randomElement($validCategoryIds),
                'start_date' => Carbon::now(),
                'expiration_date' => Carbon::now()->addMonth(),
                'quantity' => $faker->numberBetween(25, 100),
                'user_id' => $faker->randomElement($eligibleUserIds)
            ]);
        }

        // Seeder nhiều voucher cho loại first_order
        foreach (range(1, 3) as $index) {
            Voucher::create([
                'code' => 'FIRST' . $faker->unique()->numberBetween(100, 999),
                'type' => 'first_order',
                'discount_value' => $faker->numberBetween(100000, 300000),
                'min_order_value' => $faker->numberBetween(500000, 1500000),
                'start_date' => Carbon::now(),
                'expiration_date' => Carbon::now()->addMonth(),
                'quantity' => 1,
                'user_id' => $faker->randomElement($eligibleUserIds)
            ]);
        }
    }
}