import React, { useState, useMemo } from 'react';
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

// --- TIPOS ---
export interface Review {
  id: number;
  user: string;
  rating: number;
  date: string;
  skinType: string;
  comment: string;
  likes: number;
  dislikes: number;
}

interface CustomerReviewsSectionProps {
  reviews: Review[];
}

// --- SUB-COMPONENTES PARA UN CÓDIGO MÁS LIMPIO ---

const StarRating = ({ rating, size = 'text-xl' }: { rating: number, size?: string }) => (
  <div className={`flex items-center gap-0.5 text-pink-400 ${size}`}>
    {[...Array(5)].map((_, i) => (
      i < Math.round(rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
    ))}
  </div>
);

const RatingBar = ({ stars, percentage, count }: { stars: number, percentage: number, count: number }) => (
  <div className="flex items-center gap-2 text-sm">
    <div className="flex items-center"><span className="w-4">{stars}</span> <FaStar className="text-pink-400" /></div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
    </div>
    <span className="text-gray-500 w-20 text-right">{percentage.toFixed(0)}% ({count})</span>
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="border-t border-gray-200 py-6">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div> {/* Placeholder para avatar */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-800">{review.user}</p>
            <div className="flex items-center gap-2">
              <StarRating rating={review.rating} size="text-md" />
              <span className="text-xs text-gray-400">{review.date}</span>
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-700 space-y-2">
          <p><strong>Tipo de Piel:</strong> {review.skinType}</p>
          <p>{review.comment}</p>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-500"><FaThumbsUp /> {review.likes}</button>
          <button className="flex items-center gap-1 hover:text-red-500"><FaThumbsDown /> {review.dislikes}</button>
        </div>
      </div>
    </div>
  </div>
);


// --- COMPONENTE PRINCIPAL DE LA SECCIÓN DE RESEÑAS ---

const CustomerReviewsSection = ({ reviews }: CustomerReviewsSectionProps) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'questions'>('reviews');

  const { totalReviews, averageRating, ratingDistribution } = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { totalReviews: 0, averageRating: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const total = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / total;
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(r => { dist[r.rating as keyof typeof dist]++; });
    return { totalReviews: total, averageRating: avg, ratingDistribution: dist };
  }, [reviews]);
  
  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-md relative overflow-hidden font-sans">
      
      {/* Elementos decorativos (Doodles) - Reemplaza con tus <img> */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-50 flex items-center justify-center text-pink-500 font-bold text-lg -z-0">nn</div>
      <div className="absolute top-32 left-20 w-20 h-20 opacity-50 -z-0">{/* Conejito */}</div>
      <div className="absolute top-16 right-16 w-24 h-10 bg-lime-200 rounded-full opacity-70 flex items-center justify-center text-lime-700 font-bold text-sm -z-0">JOY-JOY</div>

      {/* Contenido Principal */}
      <div className="relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-light text-gray-800">Reseñas de Clientes</h2>
          <div className="mt-4 flex flex-col items-center gap-2">
            <StarRating rating={averageRating} />
            <p className="text-sm text-gray-500">Basado en {totalReviews} reseñas</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-6 py-3 rounded-full font-semibold transition hover:bg-gray-800">Escribir una reseña</button>
            <button className="bg-white border border-gray-300 px-6 py-3 rounded-full font-semibold transition hover:bg-gray-50">Hacer una pregunta</button>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map(star => (
              <RatingBar
                key={star}
                stars={star}
                count={ratingDistribution[star as keyof typeof ratingDistribution]}
                percentage={totalReviews > 0 ? (ratingDistribution[star as keyof typeof ratingDistribution] / totalReviews) * 100 : 0}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-12">
          <div className="flex items-center justify-between border-b border-gray-200">
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`py-2 text-sm font-medium ${activeTab === 'reviews' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                Reseñas ({totalReviews})
              </button>
              <button 
                onClick={() => setActiveTab('questions')}
                className={`py-2 text-sm font-medium ${activeTab === 'questions' ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
              >
                Preguntas (1)
              </button>
            </div>
            <select className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none">
              <option>Más Recientes</option>
              <option>Más Útiles</option>
              <option>Mejor Puntuación</option>
              <option>Peor Puntuación</option>
            </select>
          </div>

          <div className="mt-6">
            {activeTab === 'reviews' && (
              reviews.length > 0 ? reviews.map(review => <ReviewCard key={review.id} review={review} />) : <p className="text-center text-gray-500">Sé el primero en escribir una reseña.</p>
            )}
            {activeTab === 'questions' && (
              <p className="text-center text-gray-500">Todavía no hay preguntas. ¡Haz la primera!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewsSection;