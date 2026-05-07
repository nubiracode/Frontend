import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from "../components/navbar";
import SearchBarWithFilters from "../components/buscador";
import FilterSidebar from '../components/filtrado';

type ProductCategory =
  | 'Limpiador Oleoso'
  | 'Limpiador Acuoso'
  | 'Exfoliante'
  | 'Tónico'
  | 'Esencia'
  | 'Serum'
  | 'Mascarilla'
  | 'Contorno de Ojos'
  | 'Hidratante'
  | 'Protector Solar'
  | 'Potenciador'
  | 'Herramienta de Masaje'
  | 'Maquillaje';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  popularity: number;
  category: ProductCategory;
  skinType: ('Grasa' | 'Mixta' | 'Seca')[];
  isSensitive: boolean;
  ingredients: string[];
  freeOf: string[];
  treatment: string[];
  activePrinciples: string[];
  imageSrc: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Limpiador Oleoso de Caléndula',
    brand: 'iUNIK',
    price: 22.5,
    popularity: 95,
    category: 'Limpiador Oleoso',
    skinType: ['Seca', 'Mixta'],
    isSensitive: true,
    ingredients: ['Centella Asiática'],
    freeOf: ['Alcohol'],
    treatment: ['Hidratación', 'Sensibilidad'],
    activePrinciples: ['Desinflamatorios Y Calmantes'],
    imageSrc: '/oleo.png',
  },
  {
    id: 2,
    name: 'Limpiador Oleoso de Ginseng',
    brand: 'Beauty of Joseon',
    price: 19.99,
    popularity: 98,
    category: 'Limpiador Oleoso',
    skinType: ['Grasa', 'Mixta'],
    isSensitive: false,
    ingredients: ['Ginseng'],
    freeOf: ['Fragancias Artificiales'],
    treatment: ['Acné', 'Control De Sebo'],
    activePrinciples: ['Regularizador Del Sebo'],
    imageSrc: '/oleo.png',
  },
  {
    id: 3,
    name: 'Limpiador Acuoso pH Bajo',
    brand: 'Cosrx',
    price: 13,
    popularity: 99,
    category: 'Limpiador Acuoso',
    skinType: ['Grasa', 'Mixta', 'Seca'],
    isSensitive: true,
    ingredients: ['Té Verde'],
    freeOf: [],
    treatment: ['Sensibilidad'],
    activePrinciples: ['Desinflamatorios Y Calmantes'],
    imageSrc: '/limpiador.png',
  },
  {
    id: 4,
    name: 'Tónico Exfoliante AHA/BHA',
    brand: 'Cosrx',
    price: 17,
    popularity: 85,
    category: 'Tónico',
    skinType: ['Grasa'],
    isSensitive: false,
    ingredients: ['Ácido Glicólico'],
    freeOf: [],
    treatment: ['Poros y Control de sebo'],
    activePrinciples: ['Regularizador Del Sebo'],
    imageSrc: '/tonico.png',
  },
  {
    id: 5,
    name: 'Tónico Hidratante de Arroz',
    brand: "I'm From",
    price: 25,
    popularity: 91,
    category: 'Tónico',
    skinType: ['Seca', 'Mixta'],
    isSensitive: true,
    ingredients: ['Arroz'],
    freeOf: ['Alcohol'],
    treatment: ['Hidratación', 'Hiperpigmentación'],
    activePrinciples: ['Hidratantes Y Humectantes'],
    imageSrc: '/tonico.png',
  },
  {
    id: 6,
    name: 'Serum de Niacinamida 10%',
    brand: 'The Ordinary',
    price: 12.5,
    popularity: 88,
    category: 'Serum',
    skinType: ['Mixta', 'Grasa'],
    isSensitive: false,
    ingredients: ['Niacinamida'],
    freeOf: ['Alcohol'],
    treatment: ['Acné', 'Hiperpigmentación'],
    activePrinciples: ['Regularizador Del Sebo'],
    imageSrc: '/serum.png',
  },
  {
    id: 7,
    name: 'Serum Calmante de Centella',
    brand: 'skin1004',
    price: 18,
    popularity: 96,
    category: 'Serum',
    skinType: ['Seca', 'Mixta', 'Grasa'],
    isSensitive: true,
    ingredients: ['Centella Asiática'],
    freeOf: ['Fragancias Artificiales'],
    treatment: ['Sensibilidad', 'Rojeces'],
    activePrinciples: ['Desinflamatorios Y Calmantes'],
    imageSrc: '/serum.png',
  },
  {
    id: 8,
    name: 'Crema Hidratante con Ceramidas',
    brand: 'Klairs',
    price: 31,
    popularity: 93,
    category: 'Hidratante',
    skinType: ['Seca'],
    isSensitive: true,
    ingredients: ['Ceramidas'],
    freeOf: [],
    treatment: ['Hidratación'],
    activePrinciples: ['Hidratantes Y Humectantes'],
    imageSrc: '/crema.png',
  },
  {
    id: 9,
    name: 'Protector Solar de Abedul',
    brand: 'Round Lab',
    price: 24,
    popularity: 97,
    category: 'Protector Solar',
    skinType: ['Seca', 'Mixta'],
    isSensitive: true,
    ingredients: ['Savia de Abedul'],
    freeOf: [],
    treatment: ['Hidratación'],
    activePrinciples: ['Hidratantes Y Humectantes'],
    imageSrc: '/bloqueador.png',
  },
];

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
        src={product.imageSrc}
        alt={product.name}
        className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    <div className="flex flex-col justify-between p-4 flex-grow">
      
      <div>
        <h3 className="text-sm font-medium text-gray-500">
          {product.brand}
        </h3>

        <p className="text-md font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </p>

        <p className="text-lg font-bold text-pink-500 mt-1">
          ${product.price.toFixed(2)}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <div className="flex text-yellow-400 text-sm">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          <span className="text-xs text-gray-500 ml-1">
            Reseñas
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        
        <button className="w-full sm:w-1/2 rounded-md bg-[#f46096ff] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#fa4f8dff] transition">
          Añadir
        </button>

        <Link
          to={`/${categorySlug}/${product.id}`}
          className="w-full sm:w-1/2 flex items-center justify-center rounded-md bg-white border border-[#f46096ff] text-[#f46096ff] py-2 px-4 text-sm font-medium hover:bg-pink-50 transition"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          Ver
        </Link>

      </div>
    </div>
  </div>
);

const ProductCategoryPage = () => {
  
  const { categorySlug } = useParams<{
    categorySlug: string;
  }>();

  const [allFilters, setAllFilters] =
    useState<CombinedFilters>({
      searchTerm: '',
      skinType: 'todos',
      sensitivity: 'todos',
      sort: 'relevancia',
      sidebar: {},
    });

  const [displayedProducts, setDisplayedProducts] =
    useState<Product[]>([]);

  const [pageTitle, setPageTitle] = useState('');

  const categoryMapping: Record<
    string,
    {
      name: ProductCategory;
      title: string;
    }
  > = {
    'limpieza-oleosa': {
      name: 'Limpiador Oleoso',
      title: 'Limpiadores Oleosos',
    },

    'limpieza-acuosa': {
      name: 'Limpiador Acuoso',
      title: 'Limpiadores Acuosos',
    },

    exfoliantes: {
      name: 'Exfoliante',
      title: 'Exfoliantes',
    },

    tonicos: {
      name: 'Tónico',
      title: 'Tónicos',
    },

    esencias: {
      name: 'Esencia',
      title: 'Esencias',
    },

    serums: {
      name: 'Serum',
      title: 'Serums',
    },

    mascarillas: {
      name: 'Mascarilla',
      title: 'Mascarillas',
    },

    'contorno-de-ojos': {
      name: 'Contorno de Ojos',
      title: 'Contorno de Ojos',
    },

    hidratantes: {
      name: 'Hidratante',
      title: 'Hidratantes',
    },

    'protector-solar': {
      name: 'Protector Solar',
      title: 'Protectores Solares',
    },

    potenciadores: {
      name: 'Potenciador',
      title: 'Potenciadores',
    },

    masajes: {
      name: 'Herramienta de Masaje',
      title: 'Herramientas de Masaje',
    },

    maquillaje: {
      name: 'Maquillaje',
      title: 'Maquillaje',
    },
  };

  useEffect(() => {
    
    const currentCategoryInfo =
      categoryMapping[categorySlug || ''];

    if (!currentCategoryInfo) {
      setPageTitle('Categoría no encontrada');
      setDisplayedProducts([]);
      return;
    }

    setPageTitle(currentCategoryInfo.title);

    let products = mockProducts.filter(
      (p) => p.category === currentCategoryInfo.name
    );

    if (allFilters.searchTerm) {
      products = products.filter((p) =>
        p.name
          .toLowerCase()
          .includes(
            allFilters.searchTerm.toLowerCase()
          )
      );
    }

    if (allFilters.skinType !== 'todos') {
      products = products.filter((p) =>
        p.skinType.includes(
          allFilters.skinType as any
        )
      );
    }

    if (allFilters.sensitivity !== 'todos') {
      products = products.filter(
        (p) =>
          p.isSensitive ===
          (allFilters.sensitivity === 'sensible')
      );
    }

    Object.entries(allFilters.sidebar).forEach(
      ([key, values]) => {
        if (values.length > 0) {
          products = products.filter((p) =>
            values.every((val) =>
              (
                p[
                  key as keyof Product
                ] as any[]
              ).includes(val)
            )
          );
        }
      }
    );

    switch (allFilters.sort) {
      case 'mayor':
        products.sort(
          (a, b) => b.price - a.price
        );
        break;

      case 'menor':
        products.sort(
          (a, b) => a.price - b.price
        );
        break;

      case 'popular':
        products.sort(
          (a, b) => b.popularity - a.popularity
        );
        break;
    }

    setDisplayedProducts(products);

  }, [allFilters, categorySlug]);

  const handleSearch = (
    criteria: SearchCriteria
  ) => {
    setAllFilters((prev) => ({
      ...prev,
      ...criteria,
    }));
  };

  const handleSidebarChange = (
    sidebarCriteria: SidebarFilters
  ) => {
    setAllFilters((prev) => ({
      ...prev,
      sidebar: sidebarCriteria,
    }));
  };

  return (
    <div className="font-sans bg-[#FFF7FB] min-h-screen">
      
      <Navbar />

      <div className="py-2">
        <div className="max-w-screen-xl mx-auto px-4">
          <SearchBarWithFilters
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start">
        
        <aside className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0 hidden md:block sticky top-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <FilterSidebar
              onFilterChange={
                handleSidebarChange
              }
            />
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          
          <div className="mb-6">
            
            <h1 className="text-3xl font-bold text-gray-900 font-serif tracking-wide">
              {pageTitle}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {displayedProducts.length}{' '}
              productos encontrados
            </p>

          </div>

          {displayedProducts.length > 0 ? (
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={
                    categorySlug || ''
                  }
                />
              ))}

            </div>

          ) : (
            
            <div className="text-center py-20 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-white">
              
              <h3 className="text-xl font-medium text-gray-900">
                No se encontraron productos
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Intenta cambiar los filtros.
              </p>

            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCategoryPage;