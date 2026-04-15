<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Eletrônicos (ID: 1)
            [
                'name' => 'Notebook Pro 15',
                'description' => 'Notebook de alta performance para desenvolvedores.',
                'price' => 8500.00,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/150?text=Notebook'
            ],
            [
                'name' => 'Smartphone G8',
                'description' => 'Processador rápido e câmera de 108MP.',
                'price' => 3200.00,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/150?text=Smartphone'
            ],
            [
                'name' => 'Monitor 4K 27"',
                'description' => 'Cores vibrantes para design gráfico.',
                'price' => 2100.00,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/150?text=Monitor'
            ],
            [
                'name' => 'Mouse Gamer RGB',
                'description' => 'Alta precisão e ergonomia.',
                'price' => 250.00,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/150?text=Mouse'
            ],
            [
                'name' => 'Teclado Mecânico',
                'description' => 'Switch azul para feedback tátil.',
                'price' => 450.00,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/150?text=Teclado'
            ],
            [
                'name' => 'Headset 7.1',
                'description' => 'Som surround para imersão total.',
                'price' => 600.00,
                'category_id' => 1,
                'image_url' => 'https://via.placeholder.com/150?text=Headset'
            ],

            // Roupas (ID: 2)
            [
                'name' => 'Camiseta Algodão Premium',
                'description' => 'Camiseta básica 100% algodão egípcio.',
                'price' => 89.90,
                'category_id' => 2,
                'image_url' => 'https://via.placeholder.com/150?text=Camiseta'
            ],
            [
                'name' => 'Calça Jeans Slim',
                'description' => 'Corte moderno e tecido resistente.',
                'price' => 159.00,
                'category_id' => 2,
                'image_url' => 'https://via.placeholder.com/150?text=Jeans'
            ],
            [
                'name' => 'Jaqueta Corta-Vento',
                'description' => 'Ideal para atividades ao ar livre.',
                'price' => 249.00,
                'category_id' => 2,
                'image_url' => 'https://via.placeholder.com/150?text=Jaqueta'
            ],
            [
                'name' => 'Tênis Urban',
                'description' => 'Conforto para o dia a dia.',
                'price' => 299.00,
                'category_id' => 2,
                'image_url' => 'https://via.placeholder.com/150?text=Tenis'
            ],
            [
                'name' => 'Moletom Casual',
                'description' => 'Tecido flanelado e quente.',
                'price' => 189.00,
                'category_id' => 2,
                'image_url' => 'https://via.placeholder.com/150?text=Moletom'
            ],

            // Livros (ID: 3)
            [
                'name' => 'Código Limpo',
                'description' => 'Habilidades práticas do Agile Software.',
                'price' => 120.00,
                'category_id' => 3,
                'image_url' => 'https://via.placeholder.com/150?text=Livro+Clean+Code'
            ],
            [
                'name' => 'Arquitetura Limpa',
                'description' => 'O guia do artesão para estrutura de software.',
                'price' => 135.00,
                'category_id' => 3,
                'image_url' => 'https://via.placeholder.com/150?text=Livro+Clean+Arch'
            ],
            [
                'name' => 'Refatoração',
                'description' => 'Aperfeiçoando o design de códigos existentes.',
                'price' => 150.00,
                'category_id' => 3,
                'image_url' => 'https://via.placeholder.com/150?text=Livro+Refactoring'
            ],
            [
                'name' => 'Design Patterns',
                'description' => 'Soluções reutilizáveis para software orientado a objetos.',
                'price' => 180.00,
                'category_id' => 3,
                'image_url' => 'https://via.placeholder.com/150?text=Livro+Patterns'
            ],
            [
                'name' => 'Domain-Driven Design',
                'description' => 'Atacando a complexidade no coração do software.',
                'price' => 195.00,
                'category_id' => 3,
                'image_url' => 'https://via.placeholder.com/150?text=Livro+DDD'
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}