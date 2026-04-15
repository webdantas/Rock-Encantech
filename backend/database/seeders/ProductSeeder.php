<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Notebook',
            'description' => 'Notebook Dell',
            'price' => 3500,
            'category_id' => 1,
            'image_url' => 'notebook.jpg'
        ]);

        Product::create([
            'name' => 'Camiseta',
            'description' => 'Camiseta básica',
            'price' => 50,
            'category_id' => 2,
            'image_url' => 'camiseta.jpg'
        ]);
    }
}