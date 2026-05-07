import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Heart, Share2, ShoppingCart, TrendingDown, Star, ChevronDown } from "lucide-react";
import Navbar from "../shared/components/navbar";
import CustomerReviewsSection from "../shared/features/product/reviewsection";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
  brands?: { name: string };
  ingredients?: { name: string }[];
  categories?: { name: string }[];
}

interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  skinType: string;
  comment: string;
  likes: number;
  dislikes: number;
}

interface Store {
  name: string;
  price: number;
  url: string;
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [showIngredients, setShowIngredients] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [showPriceStore, setShowPriceStore] = useState(false);

  const mockStores: Store[] = [
    { name: "Amazon", price: 21.99, url: "#" },
    { name: "YesStyle", price: 23.40, url: "#" },
    { name: "Stylevana", price: 22.00, url: "#" },
  ];

  const mockDetailedReviews: Review[] = [
    {
      id: 1,
      user: "sebastian",
      rating: 5,
      date: "09/03/2025",
      skinType: "Mixta",
      comment: "es muy bueno y desde el primer uso vi cambios notorios",
      likes: 0,
      dislikes: 0,
    },
    {
      id: 2,
      user: "Ana G.",
      rating: 5,
      date: "05/03/2025",
      skinType: "Seca",
      comment: "Súper suave con mi piel sensible. Lo amo.",
      likes: 12,
      dislikes: 0,
    },
    {
      id: 3,
      user: "Carlos",
      rating: 4,
      date: "01/03/2025",
      skinType: "Grasa",
      comment: "El aroma es un poco fuerte para mi gusto, pero limpia muy bien sin resecar.",
      likes: 3,
      dislikes: 1,
    },
  ];

  const priceHistory = [
    { date: "2025-07-01", price: 21.99 },
    { date: "2025-07-02", price: 21.89 },
    { date: "2025-07-03", price: 22.00 },
    { date: "2025-07-04", price: 22.30 },
    { date: "2025-07-05", price: 22.00 },
    { date: "2025-07-06", price: 22.50 },
  ];

  const avgPrice =
    mockStores.reduce((sum, s) => sum + s.price, 0) / mockStores.length;
  const minPrice = Math.min(...mockStores.map((s) => s.price));
  const savings = product?.price ? product.price - minPrice : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-2">
            Producto no encontrado
          </p>
          <p className="text-gray-600">Por favor intenta nuevamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Todo en una tarjeta blanca */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Imagen del producto */}
            <div className="lg:col-span-1 flex justify-end">
  <div className="relative w-[480px] lg:w-[420px] aspect-square rounded-xl p-2 flex items-center justify-center">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <Heart
                    size={18}
                    className={isFavorite ? "fill-pink-500 text-pink-500" : "text-gray-400"}
                  />
                </button>
              </div>
            </div>

            {/* Información del producto */}
            <div className="lg:col-span-1 space-y-4 max-w-2xl">
              {/* Marca */}
              <div>
                <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">
                  {product.brands?.name || "Marca"}
                </span>
              </div>

              {/* Nombre del producto */}
              <div>
               <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-700">(128 reseñas)</span>
                </div>
              </div>

              {/* Precio */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-bold text-pink-600">
                    ${product.price}
                  </span>
                  {savings > 0 && (
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded flex items-center gap-1">
                      <TrendingDown size={12} />
                      Ahorra ${savings.toFixed(2)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600">
                  Precio promedio: ${avgPrice.toFixed(2)}
                </p>
              </div>

              {/* Descripción */}
              <p className="text-gray-700 text-sm leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Ingredientes como texto continuo */}
              {product.ingredients && product.ingredients.length > 0 && (
                <div className="border-t pt-3">
                  <button
                    onClick={() => setShowIngredients(!showIngredients)}
                    className="flex items-center gap-2 text-gray-800 font-semibold text-sm hover:text-pink-600 transition-colors mb-2"
                  >
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        showIngredients ? "rotate-180" : ""
                      }`}
                    />
                    Ingredientes
                  </button>
                  {showIngredients && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.ingredients.map((ingredient) => ingredient.name).join(", ")}
                    </p>
                  )}
                </div>
              )}

            
            </div>
             <div className="lg:col-span-1 space-y-4 max-w-2xl">
               <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-6">Resumen de precios</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-pink-400">
                <span className="text-pink-100">Precio más bajo</span>
                <span className="text-2xl font-bold">${minPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-pink-400">
                <span className="text-pink-100">Precio promedio</span>
                <span className="text-2xl font-bold">${avgPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pink-100">Tu precio actual</span>
                <span className="text-2xl font-bold">${product.price}</span>
              </div>
              {savings > 0 && (
                <div className="mt-6 pt-4 border-t-2 border-pink-400">
                  <p className="text-sm text-pink-100 mb-1">Puedes ahorrar</p>
                  <p className="text-3xl font-bold">${savings.toFixed(2)}</p>
                </div>
              )}
            </div>
          </div>
            {/* Botones de acción */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm">
                  <ShoppingCart size={18} />
                  Comprar ahora
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors duration-200">
                  <Share2 size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de precios en tiendas */}
         <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <button
            onClick={() => setShowPriceStore(!showPriceStore)}
            className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-pink-600 transition-colors w-full"
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                showPriceStore ? "rotate-180" : ""
              }`}
            />
            Precios en otras tiendas
          </button>
          
          {showPriceStore && (
          <div className="lg:col-span-2 bg-white p-8">
           
            <div className="space-y-3">
              {mockStores.map((store, index) => (
                <button
                  key={store.name}
                  onClick={() => setSelectedStore(store)}
                  className={`w-full p-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-between cursor-pointer ${
                    selectedStore?.name === store.name
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50"
                  }`}
                >
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{store.name}</p>
                    <p className="text-sm text-gray-600">
                      {index === 0 ? "Más barato" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-pink-600">
                      ${store.price.toFixed(2)}
                    </p>
                    <a
                      href={store.url}
                      className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                    >
                      Visitar tienda
                    </a>
                  </div>
                </button>
              ))}
            </div>
          </div>)}

        
        </div>

        {/* Gráfico de historial de precios - Desplegable */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <button
            onClick={() => setShowPriceHistory(!showPriceHistory)}
            className="flex items-center gap-2 text-gray-900 font-bold text-lg hover:text-pink-600 transition-colors w-full"
          >
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                showPriceHistory ? "rotate-180" : ""
              }`}
            />
            Historial de precios
          </button>
          
          {showPriceHistory && (
            <div className="mt-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={priceHistory}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f46096" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f46096" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    stroke="#d1d5db"
                  />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} stroke="#d1d5db" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    formatter={(value) => `$${Number(value).toFixed(2)}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#f46096"
                    strokeWidth={3}
                    dot={{ fill: "#f46096", r: 5 }}
                    activeDot={{ r: 7, fill: "#d81b60" }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <CustomerReviewsSection reviews={mockDetailedReviews} />
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;