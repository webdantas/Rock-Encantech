<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function paginate($filters = [])
    {
        $query = Product::with('category');

        if (!empty($filters['category'])) {
            $query->where('category_id', $filters['category']);
        }

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        return $query->paginate(10);
    }

    public function find($id)
    {
        return Product::findOrFail($id);
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update($id, array $data)
    {
        $product = $this->find($id);
        $product->update($data);

        return $product;
    }

    public function delete($id)
    {
        $product = $this->find($id);
        return $product->delete();
    }
}