<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ProductApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test public list of products.
     */
    public function test_can_list_products(): void
    {
        $category = Category::create(['name' => 'Eletronics']);
        Product::create([
            'name' => 'Demo Product',
            'price' => 100,
            'category_id' => $category->id,
            'image_url' => 'test.jpg'
        ]);

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    'data' => [
                        '*' => ['id', 'name', 'price', 'promo_price', 'is_premium', 'category']
                    ],
                    'meta'
                ]
            ]);
    }

    /**
     * Test protection of product creation.
     */
    public function test_cannot_create_product_without_token(): void
    {
        $response = $this->postJson('/api/products', [
            'name' => 'Unauthorized Product'
        ]);

        $response->assertStatus(401);
    }

    /**
     * Test product creation with auth.
     */
    public function test_can_create_product_with_token(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Books']);
        
        Sanctum::actingAs($user);

        $response = $this->postJson('/api/products', [
            'name' => 'New Product',
            'description' => 'Test Description',
            'price' => 50.00,
            'category_id' => $category->id,
            'image_url' => 'new.jpg'
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.name', 'New Product');
            
        $this->assertDatabaseHas('products', ['name' => 'New Product']);
    }
}
