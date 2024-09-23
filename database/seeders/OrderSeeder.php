<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('orders')->insert([
                'user_id' => User::inRandomOrder()->first()->id, // Lấy user_id ngẫu nhiên từ bảng users
                'order_date' => $faker->date(), // Ngày đặt hàng
                'status' => $faker->randomElement(['pending', 'processing', 'completed', 'cancelled']), // Trạng thái đơn hàng
                'total_amount' => $faker->numberBetween(1000, 50000), // Tổng số tiền
                'name' => $faker->name(), // Tên người nhận
                'phone' => $faker->phoneNumber(), // Số điện thoại người nhận
                'address' => $faker->address(), // Địa chỉ người nhận
                'infor' => $faker->text(), // Thông tin bổ sung
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
