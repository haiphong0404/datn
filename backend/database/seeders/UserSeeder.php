<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        for ($i = 0; $i < 5; $i++) {
            DB::table('users')->insert([

        'username' => $faker->userName(), // Tên người dùng giả
        'email' => $faker->unique()->safeEmail(), // Email giả
        'email_verified_at' => now(), // Ngày email được xác nhận
        'password' => Hash::make('password'), // Mật khẩu đã mã hóa
        'avatar_img' => $faker->imageUrl(100, 100, 'people', true), // Hình đại diện giả
        'phone' => $faker->phoneNumber(), // Số điện thoại giả
        'address' => $faker->address(), // Địa chỉ giả
        'role' => $faker->randomElement(['user', 'staff', 'admin']), // Vai trò ngẫu nhiên
        'remember_token' => Str::random(10), // Mã token
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),

    ]);
}
}
    
}
