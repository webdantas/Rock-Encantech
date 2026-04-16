<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test registration with weak password.
     */
    public function test_cannot_register_with_weak_password(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '123456',
            'password_confirmation' => '123456'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test registration with strong password.
     */
    public function test_can_register_with_strong_password(): void
    {
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'StrongP@ss123',
            'password_confirmation' => 'StrongP@ss123'
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('success', true);
            
        $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
    }
}
