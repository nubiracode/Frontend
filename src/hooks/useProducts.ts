import { useState, useEffect } from 'react';

export interface Product {
  _id: string;
  name: string;
  brands: { _id: string; name: string }[];
  price: number;
  popularity: number;
  categories: { _id: string; name: string }[];
  skin_types: { _id: string; name: string }[];
  is_sensitive: boolean;
  ingredients: { _id: string; name: string }[];
  free_of_tags: { _id: string; name: string }[];
  treatments: { _id: string; name: string }[];
  active_principles: { _id: string; name: string }[];
  image_src: string;
}

const API_BASE = 'http://localhost:3000/api';

export function useProducts(categorySlug: string, filters: Record<string, any>) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();

        if (categorySlug) params.set('category', categorySlug);
        if (filters.searchTerm) params.set('search', filters.searchTerm);
        if (filters.skinType && filters.skinType !== 'todos') params.set('skinType', filters.skinType);
        if (filters.sensitivity && filters.sensitivity !== 'todos') params.set('sensitivity', filters.sensitivity);
        if (filters.sort && filters.sort !== 'relevancia') params.set('sort', filters.sort);

        const sidebar = filters.sidebar || {};
        if (sidebar.ingredients?.length) params.set('ingredients', sidebar.ingredients.join(','));
        if (sidebar.freeOf?.length) params.set('freeOf', sidebar.freeOf.join(','));
        if (sidebar.treatment?.length) params.set('treatment', sidebar.treatment.join(','));
        if (sidebar.activePrinciples?.length) params.set('activePrinciples', sidebar.activePrinciples.join(','));

        const res = await fetch(`${API_BASE}/products?${params.toString()}`);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug, JSON.stringify(filters)]); // <-- stringify evita loop infinito

  return { products, loading, error };
}