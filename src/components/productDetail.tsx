import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import CustomerReviewsSection, { type Review } from "./reviewsection";



interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  imageSrc: string;
  ingredients: string[];
  treatment: string[];
  skinType: string[];
  isSensitive: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Limpiador Oleoso de Caléndula',
    brand: 'iUNIK',
    price: 22.50,
    imageSrc: '/oleo.png',
    ingredients: ['Centella Asiática'],
    treatment: ['Hidratación', 'Sensibilidad'],
    skinType: ['Seca', 'Mixta'],
    isSensitive: true,
  },
];

const mockStores = [
  { name: "Amazon", price: 21.99, url: "#" },
  { name: "YesStyle", price: 23.40, url: "#" },
  { name: "Stylevana", price: 22.00, url: "#" },
];

const mockReviews = [
  { user: "Ana", rating: 5, comment: "Súper suave con mi piel sensible." },
  { user: "Carlos", rating: 4, comment: "El aroma es fuerte." },
];

const priceHistory = [
  { date: '2025-07-01', price: 21.99 },
  { date: '2025-07-02', price: 21.89 },
  { date: '2025-07-03', price: 22.00 },
  { date: '2025-07-04', price: 22.30 },
  { date: '2025-07-05', price: 22.00 },
  { date: '2025-07-06', price: 22.50 },
];

const mockDetailedReviews: Review[] = [
  { id: 1, user: "sebastian", rating: 5, date: "09/03/2025", skinType: "Mixta", comment: "es muy bueno y desde el primer uso vi cambios notorios", likes: 0, dislikes: 0 },
  { id: 2, user: "Ana G.", rating: 5, date: "05/03/2025", skinType: "Seca", comment: "Súper suave con mi piel sensible. Lo amo.", likes: 12, dislikes: 0 },
  { id: 3, user: "Carlos", rating: 4, date: "01/03/2025", skinType: "Grasa", comment: "El aroma es un poco fuerte para mi gusto, pero limpia muy bien sin resecar.", likes: 3, dislikes: 1 },
];
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Es bueno ser explícito con el tipo
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // La lógica de búsqueda es correcta.
    const found = mockProducts.find(p => p.id === Number(id));
    setProduct(found || null);
  }, [id]);

  if (!product) {
    // Un estado de carga es mejor que mostrar un error directamente
    return (
        <div className="bg-[#FFF7FB] min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-700">Cargando producto...</h1>
        </div>
    );
  }

  const avgPrice = mockStores.reduce((sum, s) => sum + s.price, 0) / mockStores.length;

  return (
    <div className="bg-[#FFF7FB] min-h-screen font-sans">
      <Navbar />
      {/* Contenedor principal de la página */}
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
        
        {/* --- SECCIÓN SUPERIOR: Grid con info del producto --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Columna Izquierda y Central (ocupa 2 de 3 columnas) */}
          <div className="lg:col-span-2 space-y-8 mt-[15%]">
            {/* Info principal del producto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center max-h-[500px]">
                <img src={product.imageSrc} alt={product.name} className="w-auto h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-sm text-gray-500 font-medium">Marca: {product.brand}</p>
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-3xl text-pink-500 font-bold">${product.price.toFixed(2)}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {product.skinType.map(type => <span key={type} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">{type}</span>)}
                  {product.isSensitive && <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Piel Sensible</span>}
                </div>
                <div className="text-sm mt-4 pt-4 border-t">
                  <p><strong>Ingredientes:</strong> {product.ingredients.join(", ")}</p>
                  <p><strong>Tratamiento:</strong> {product.treatment.join(", ")}</p>
                </div>
              </div>
            </div>

            
          </div>

          {/* Columna Derecha: Tiendas */}
          <div className="lg:col-span-1 space-y-8 mt-[30%]">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Precios en otras tiendas</h3>
              <table className="w-full text-sm">
                <thead><tr className="text-left border-b"><th className="pb-2 font-semibold">Tienda</th><th className="pb-2 font-semibold">Precio</th><th className="pb-2 font-semibold">Enlace</th></tr></thead>
                <tbody>
                  {mockStores.map(store => (
                    <tr key={store.name} className="border-t"><td className="py-3">{store.name}</td><td className="py-3 text-pink-500 font-medium">${store.price.toFixed(2)}</td><td className="py-3"><a href={store.url} className="text-blue-500 hover:underline">Visitar</a></td></tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-sm text-gray-600">Precio promedio: <span className="font-semibold text-gray-800">${avgPrice.toFixed(2)}</span></p>
            </div>
          </div>
        </div>

        {/* Gráfico de precios */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Historial de Precios</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={priceHistory} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#f46096ff" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                </LineChart>
              </ResponsiveContainer>
            </div>

        {/* --- SECCIÓN INFERIOR: Reseñas a ancho completo --- */}
        <div>
          <CustomerReviewsSection reviews={mockDetailedReviews} />
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;