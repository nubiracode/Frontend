import { useState, useEffect } from 'react';

export interface Product {
  _id: string;
  name: string;
  description?: string;

  image_url?: string;

  price: number;
  popularity: number;

  brands: {
    _id: string;
    name: string;
  }[];

  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];

  skin_types: {
    _id: string;
    name: string;
  }[];

  ingredients: {
    _id: string;
    name: string;
  }[];

  free_of_tags: {
    _id: string;
    name: string;
  }[];

  treatments: {
    _id: string;
    name: string;
  }[];

  active_principles: {
    _id: string;
    name: string;
  }[];

  is_sensitive?: boolean;
}

const API_BASE = 'http://localhost:3000/api';

export function useProducts(
  categorySlug: string,
  filters: Record<string, any>
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        // categoría
        if (categorySlug) {
          params.set('category', categorySlug);
        }

        // búsqueda
        if (filters.searchTerm) {
          params.set('search', filters.searchTerm);
        }

        // tipo piel
        if (
          filters.skinType &&
          filters.skinType !== 'todos'
        ) {
          params.set('skinType', filters.skinType);
        }

        // sensibilidad
        if (
          filters.sensitivity &&
          filters.sensitivity !== 'todos'
        ) {
          params.set('sensitivity', filters.sensitivity);
        }

        // orden
        if (
          filters.sort &&
          filters.sort !== 'relevancia'
        ) {
          params.set('sort', filters.sort);
        }

        // sidebar
        const sidebar = filters.sidebar || {};

        if (sidebar.ingredients?.length) {
          params.set(
            'ingredients',
            sidebar.ingredients.join(',')
          );
        }

        if (sidebar.freeOf?.length) {
          params.set(
            'freeOf',
            sidebar.freeOf.join(',')
          );
        }

        if (sidebar.treatment?.length) {
          params.set(
            'treatment',
            sidebar.treatment.join(',')
          );
        }

        if (sidebar.activePrinciples?.length) {
          params.set(
            'activePrinciples',
            sidebar.activePrinciples.join(',')
          );
        }

        const url = `${API_BASE}/products?${params.toString()}`;

        console.log('Fetching:', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, JSON.stringify(filters)]);

  return {
    products,
    loading,
    error,
  };
}