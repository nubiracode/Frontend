// src/components/AnimatedImageStack.tsx

import React, { useState, useEffect } from 'react';

// Define las propiedades que recibirá el componente: un array de URLs de imágenes
interface AnimatedImageStackProps {
  imageUrls: string[];
}

// Estilos base que se aplican a todas las imágenes
const baseImageStyles = "absolute w-48 h-64 object-cover rounded-lg shadow-2xl border-4 border-white transition-all duration-1000 ease-out";

// Posiciones iniciales (fuera de la pantalla y opacas)
const initialImageStyles = "opacity-0 -translate-x-full rotate-[-45deg]";

// Posiciones finales para cada una de las 4 imágenes, creando el efecto de pila
const finalImagePositions = [
  "rotate-[-10deg] translate-x-0 translate-y-0 z-10",       // Imagen 1 (abajo)
  "rotate-[-3deg] translate-x-2 -translate-y-2 z-20",      // Imagen 2
  "rotate-[5deg] translate-x-4 -translate-y-4 z-30",       // Imagen 3
  "rotate-[12deg] translate-x-6 -translate-y-6 z-40",      // Imagen 4 (arriba)
];


const AnimatedImageStack: React.FC<AnimatedImageStackProps> = ({ imageUrls }) => {
  // Estado para controlar si la animación debe empezar
  const [isAnimated, setIsAnimated] = useState(false);

  // useEffect se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    // Usamos un pequeño temporizador para asegurarnos de que el componente
    // se haya renderizado con los estilos iniciales antes de aplicar la animación.
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 100); // 100ms es suficiente

    // Limpieza: cancela el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  return (
    // Contenedor relativo que define el área de la animación
    <div className="relative w-72 h-80">
      {imageUrls.slice(0, 4).map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Animated content ${index + 1}`}
          className={`
            ${baseImageStyles}
            ${isAnimated ? finalImagePositions[index] : initialImageStyles}
          `}
        />
      ))}
    </div>
  );
};

export default AnimatedImageStack;