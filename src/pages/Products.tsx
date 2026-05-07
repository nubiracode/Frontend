import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from '../components/navbar';
import SearchBarWithFilters from '../components/buscador';
import FilterSidebar from '../components/filtrado';
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
  <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg h-auto md:h-[400px]">
    <div className="h-48 md:h-[50%] bg-gray-100 p-4">
      <img
        src={product.image_src}
        alt={product.name}
        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col justify-between p-4 flex-grow">
      <div>
        <h3 className="text-sm font-medium text-gray-500">
          {product.brands.map(b => b.name).join(', ')}
        </h3>
        <p className="text-md font-semibold text-gray-900 line-clamp-2">{product.name}</p>
        <p className="text-lg font-bold text-pink-500 mt-1">${product.price.toFixed(2)}</p>
        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-400 text-sm">★★★★★</div>
          <span className="text-xs text-gray-500 ml-1">Reseñas</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <button className="w-full sm:w-1/2 rounded-md bg-[#f46096ff] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#fa4f8dff] transition">
          Añadir
        </button>
        <Link
          to={`/${categorySlug}/${product._id}`}
          className="w-full sm:w-1/2 flex items-center justify-center rounded-md bg-white border border-[#f46096ff] text-[#f46096ff] py-2 px-4 text-sm font-medium hover:bg-pink-50 transition"
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
    <div className="font-sans bg-[#FFF7FB] min-h-screen">
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 font-serif tracking-wide">
              {pageTitle}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {products.length} productos encontrados
            </p>
          </div>

          {loading && (
            <div className="text-center py-20 text-gray-500">Cargando productos...</div>
          )}

          {error && (
            <div className="text-center py-20 text-red-400">{error}</div>
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
            <div className="text-center py-20 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
              <h3 className="text-xl font-medium text-gray-900">No se encontraron productos</h3>
              <p className="mt-2 text-sm text-gray-500">Intenta cambiar los filtros.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCategoryPage;