<?php

namespace App\Services;

use App\Repositories\ProductRepository;

class ProductService
{
    protected ProductRepository $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function list(array $filters = [])
    {
        $products = $this->repository->paginate($filters);
        
        // Exemplo de lógica de negócio solicitada no requisito 3.b.iii
        $products->getCollection()->transform(function ($product) {
            return $this->applyBusinessLogic($product);
        });

        return $products;
    }

    public function get(int $id)
    {
        $product = $this->repository->find($id);
        return $this->applyBusinessLogic($product);
    }

    /**
     * Aplica lógica de negócio (Requisito 3.b.iii)
     */
    protected function applyBusinessLogic($product)
    {
        if (!$product) return null;

        // Regra: Produtos acima de R$ 500 são Premium
        $product->is_premium = $product->price > 500;

        // Regra: Desconto simulado de 5% para demonstração de processamento no Service
        $product->promo_price = round($product->price * 0.95, 2);

        return $product;
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}