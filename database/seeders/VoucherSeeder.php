<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class VoucherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('vouchers')->insert([
                'code' => $faker->unique()->word(), // Mã voucher độc nhất
                'discount_percentage' => $faker->numberBetween(5, 50), // Phần trăm giảm giá
                'start_date' => $faker->date(), // Ngày bắt đầu
                'expiration_date' => $faker->date(), // Ngày hết hạn
                'max_discount_value' => $faker->numberBetween(1000, 50000), // Giá trị giảm giá tối đa
                'min_order_value' => $faker->numberBetween(10000, 100000), // Giá trị đơn hàng tối thiểu
                'quantity' => $faker->numberBetween(1, 100), // Số lượng voucher
                'user_id' => User::inRandomOrder()->first()->id, // Lấy user_id ngẫu nhiên từ bảng users
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }

    }
}
