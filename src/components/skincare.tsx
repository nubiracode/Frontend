// src/components/SkincareRoutine.tsx

import React from 'react';
import {
  Droplets, // Para Oil Cleanser / Makeup Remover
  Bubbles,  // Para Cleanser
  GlassWater, // Para Toner
  Layers,   // Para Exfoliator
  Pipette,  // Para Essence / Serum
  UserSquare, // Para Sheet Mask
  Eye,      // Para Eye Cream
  Package,  // Para Cream (como un tarro)
  Sun,      // Para Sunscreen
  Moon,     // Para Sleeping Pack
  Wind,     // Para Mist
} from 'lucide-react';


// --- Datos de la Rutina de Día ---
const dayRoutineSteps = [
  { name: 'OIL CLEANSER', icon: <Droplets size={32} className="text-pink-500" /> },
  { name: 'CLEANSER', icon: <Bubbles size={32} className="text-pink-500" /> },
  { name: 'TONER', icon: <GlassWater size={32} className="text-pink-500" /> },
  { name: 'ESSENCE', icon: <Pipette size={32} className="text-pink-500" /> },
  { name: 'SERUM', icon: <Pipette size={32} className="text-pink-500" /> },
  { name: 'EYE CREAM', icon: <Eye size={32} className="text-pink-500" /> },
  { name: 'CREAM', icon: <Package size={32} className="text-pink-500" /> },
  { name: 'SUNSCREEN/BB CREAM', icon: <Sun size={32} className="text-pink-500" /> },
  { name: 'MIST', icon: <Wind size={32} className="text-pink-500" /> },
];

// --- Datos de la Rutina de Noche ---
const nightRoutineSteps = [
  { name: 'MAKEUP REMOVER', icon: <Droplets size={32} className="text-pink-500" /> },
  { name: 'CLEANSER', icon: <Bubbles size={32} className="text-pink-500" /> },
  { name: 'EXFOLIATOR', icon: <Layers size={32} className="text-pink-500" /> },
  { name: 'TONER', icon: <GlassWater size={32} className="text-pink-500" /> },
  { name: 'SHEET MASK', icon: <UserSquare size={32} className="text-pink-500" /> },
  { name: 'ESSENCE', icon: <Pipette size={32} className="text-pink-500" /> },
  { name: 'SERUM', icon: <Pipette size={32} className="text-pink-500" /> },
  { name: 'EYE CREAM', icon: <Eye size={32} className="text-pink-500" /> },
  { name: 'CREAM', icon: <Package size={32} className="text-pink-500" /> },
  { name: 'SLEEPING PACK', icon: <Moon size={32} className="text-pink-500" /> },
];


const SkincareRoutine: React.FC = () => {
  return (
    <div className="">
        <h2 className="text-3xl font-serif tracking-tight text-center text-gray-800 mb-12">
        Pasos del Skincare Coreano
      </h2>
     

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8  bg-[#ffd6f3]">
        {/* --- Columna de Día --- */}
        <div className='bg-[#ffd6e5] rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-5xl'>
          <h3 className="flex items-center justify-center text-xl font-semibold text-gray-700 mb-6 gap-3">
            <Sun className="text-yellow-500" /> DAY ROUTINE
          </h3>
          <ul className="space-y-5">
            {dayRoutineSteps.map((step) => (
              <li key={step.name} className="flex items-center gap-5">
                {step.icon}
                <span className="text-lg font-medium text-gray-600">{step.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* --- Columna de Noche --- */}
        <div className='rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-5xl bg-[#f2c6d6ff]'>
          <h3 className="flex items-center justify-center text-xl font-semibold text-gray-700 mb-6 gap-3">
            <Moon className="text-indigo-500" /> NIGHT ROUTINE
          </h3>
          <ul className="space-y-5">
            {nightRoutineSteps.map((step) => (
              <li key={step.name} className="flex items-center gap-5">
                {step.icon}
                <span className="text-lg font-medium text-gray-600">{step.name}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </div>
  );
};

export default SkincareRoutine;

