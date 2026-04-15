<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProductService;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductCollection;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected ProductService $service;

    public function __construct(ProductService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request)
    {
        $products = $this->service->list($request->all());

        return response()->json([
            'success' => true,
            'data' => new ProductCollection($products),
            'message' => 'Product list retrieved successfully'
        ]);
    }

    public function show($id)
    {
        $product = $this->service->get($id);

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product),
            'message' => 'Product retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $product = $this->service->create($request->all());

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product),
            'message' => 'Product created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = $this->service->update($id, $request->all());

        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new ProductResource($product),
            'message' => 'Product updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $deleted = $this->service->delete($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }
}