<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\OrderDetail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $this->call([
        UserSeeder::class,
        BannerSeeder::class,
        ContactSeeder::class,
        ArticleSeeder::class,
        BrandSeeder::class,
        CategorySeeder::class,
        SizeSeeder::class,
        ColorSeeder::class,
        VoucherSeeder::class,
        ProductSeeder::class,
        ProductVariantSeeder::class,
        CartSeeder::class,
        CartItemSeeder::class,
        OrderSeeder::class,
        OrderDetailSeeder::class,
        CommentSeeder::class,
        ImageSeeder::class
       ]);
    }
}
