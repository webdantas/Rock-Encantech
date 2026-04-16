import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductsPage from './pages/ProductsPage';
import { BrowserRouter } from 'react-router-dom';

// Mock simple API calls
vi.mock('../services/productService', () => ({
  getProducts: vi.fn(() => Promise.resolve({ data: { data: [] } })),
}));

vi.mock('../services/categoryService', () => ({
  getCategories: vi.fn(() => Promise.resolve({ data: [] })),
}));

describe('ProductsPage', () => {
    it('should render the products title', () => {
        render(
            <BrowserRouter>
                <ProductsPage />
            </BrowserRouter>
        );
        
        expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
    });
});
