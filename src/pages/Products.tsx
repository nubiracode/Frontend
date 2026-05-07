import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from '../shared/components/navbar';
import SearchBarWithFilters from '../shared/components/buscador';
import FilterSidebar from '../shared/features/product/filtrado';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../hooks/useProducts';

// — Tipos locales —
interface SearchCriteria {
  searchTerm: string;
  skinType: string;
  sensitivity: string;
  sort: string;
}

type SidebarFilters = Record<string, string[]>;

interface CombinedFilters extends SearchCriteria {
  sidebar: SidebarFilters;
}

// — Mapeo de slugs a títulos —
const categoryTitles: Record<string, string> = {
  'limpieza-oleosa': 'Limpiadores Oleosos',
  'limpieza-acuosa': 'Limpiadores Acuosos',
  'exfoliantes': 'Exfoliantes',
  'tonicos': 'Tónicos',
  'esencias': 'Esencias',
  'serums': 'Serums',
  'mascarillas': 'Mascarillas',
  'contorno-de-ojos': 'Contorno de Ojos',
  'hidratantes': 'Hidratantes',
  'protector-solar': 'Protectores Solares',
  'potenciadores': 'Potenciadores',
  'masajes': 'Herramientas de Masaje',
  'maquillaje': 'Maquillaje',
};

// — ProductCard —
const ProductCard = ({
  product,
  categorySlug,
}: {
  product: Product;
  categorySlug: string;
}) => (
  <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md h-full">
    {/* Imagen */}
    <div className="relative h-56  flex items-center justify-center overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-110 p-3"
      />
    </div>

    {/* Contenido */}
    <div className="flex flex-col gap-3 p-4 flex-grow">
      {/* Marca */}
      <div>
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          {product.brands.map(b => b.name).join(', ')}
        </p>
      </div>

      {/* Nombre */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1">
        <div className="flex text-amber-400 text-xs">★★★★★</div>
        <span className="text-xs text-gray-500">Reseñas</span>
      </div>

      {/* Precio */}
      <div>
        <p className="text-xl font-bold text-pink-600">${product.price.toFixed(2)}</p>
      </div>

      {/* Botones */}
      <div className="flex gap-2 mt-auto pt-2">
        <button className="flex-1 rounded-lg bg-pink-500 hover:bg-pink-600 py-2.5 px-3 text-sm font-semibold text-white shadow-sm transition-all duration-200">
          Añadir
        </button>
        <Link 
          to={`/product/${product._id}`}
          className="flex-1 flex items-center justify-center rounded-lg bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 py-2.5 px-3 text-sm font-semibold transition-all duration-200"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Ver
        </Link>
      </div>
    </div>
  </div>
);

// — Página principal —
const ProductCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const [allFilters, setAllFilters] = useState<CombinedFilters>({
    searchTerm: '',
    skinType: 'todos',
    sensitivity: 'todos',
    sort: 'relevancia',
    sidebar: {},
  });

  const { products, loading, error } = useProducts(categorySlug || '', allFilters);

  const pageTitle = categoryTitles[categorySlug || ''] ?? 'Categoría no encontrada';

  const handleSearch = (criteria: SearchCriteria) => {
    setAllFilters(prev => ({ ...prev, ...criteria }));
  };

  const handleSidebarChange = (sidebarCriteria: SidebarFilters) => {
    setAllFilters(prev => ({ ...prev, sidebar: sidebarCriteria }));
  };

  return (
    <div className="font-sans  bg-gradient-to-r from-pink-200 via-pink-50 to-pink-200 min-h-screen">
      <Navbar />

      <div className="py-2">
        <div className="max-w-screen-xl mx-auto px-4">
          <SearchBarWithFilters onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start">
        <aside className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0 hidden md:block sticky top-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <FilterSidebar onFilterChange={handleSidebarChange} />
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 font-serif tracking-wide">
              {pageTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              {products.length} productos encontrados
            </p>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-gray-500">Cargando productos...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20 text-red-500 bg-red-50 rounded-lg p-6">
              {error}
            </div>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  categorySlug={categorySlug || ''}
                />
              ))}
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20 px-4 border-2 border-dashed border-gray-200 rounded-lg bg-white">
              <p className="text-xl font-semibold text-gray-700 mb-2">No se encontraron productos</p>
              <p className="text-gray-500">Intenta cambiar los filtros o tu búsqueda.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCategoryPage;