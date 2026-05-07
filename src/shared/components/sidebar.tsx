import { useState, useEffect, useCallback } from 'react';

// --- ESTRUCTURA DE DATOS PARA LOS FILTROS ---
const filterSections = [
  {
    id: 'ingredients',
    title: 'Ingredientes',
    options: ['Aloe Vera', 'Artemisia', 'Baba de Caracol', 'Bakuchiol', 'Centella Asiática', 'Ceramidas', 'Colágeno', 'Guaiazuleno', 'Madecassoside', 'Niacinamida', 'Probióticos', 'Péptidos', 'Regaliz', 'Retinal', 'Retinoides', 'Retinol', 'Savia de Abedul', 'Té Verde', 'Vitamina C', 'Ácido Glicólico', 'Ácido Hialurónico'],
  },
  {
    id: 'freeOf',
    title: 'Libre De',
    options: ['Aceites Esenciales', 'Alcohol', 'Fragancias Artificiales', 'Gluten', 'Origen Animal'],
  },
  {
    id: 'brand',
    title: 'Marcas',
    options: ["A'pieu", 'Acwell', 'Anua', 'Aromatica', 'Axis-Y', 'Ayumi', 'Joseon', 'Biodance', 'Cleyo', 'Cosrx', 'Derma Factory', 'Elizavecca', 'Frudia', 'Hanskin', 'Holika Holika', 'Isntree', 'Kahi', 'Klairs', 'La Cabine', 'Look Dore', 'Make P:rem', 'Medicube', 'Missha', 'Mixsoon', 'Mizon', 'Mr. Gentle', 'Neogen', 'S.Nature', 'skin1004', 'The Plant Base', 'Tocobo', 'Torriden', 'VT Cosmetics'],
  },
  {
    id: 'skinType',
    title: 'Tipo de Piel',
    options: ['Grasa', 'Mixta', 'Seca'],
  },
  {
    id: 'activePrinciples',
    title: 'Principios Activos',
    options: ['Desinflamatorios Y Calmantes', 'Hidratantes Y Humectantes', 'Reafirmantes Y Nutritivos', 'Regeneradores', 'Regularizador Del Sebo', 'Vitaminas Y Antioxidantes'],
  },
  {
    id: 'treatment',
    title: 'Tratamiento',
    options: ['Acné', 'Control De Sebo', 'Hidratación', 'Hiperpigmentación', 'Líneas De Expresión', 'Ojeras e Hinchazón', 'Poros y Control de sebo', 'Rojeces', 'Sensibilidad'],
  },
];


// --- COMPONENTE HIJO: EL ACORDEÓN INDIVIDUAL ---

interface FilterAccordionProps {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}

const FilterAccordion = ({ title, options, selected, onToggle }: FilterAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCount = selected.length;

  return (
    <div className="border-b border-gray-200 py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left hover:opacity-75 transition-opacity"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-sm md:text-base font-semibold text-gray-800">{title}</h3>
          {selectedCount > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#f46096ff] rounded-full">
              {selectedCount}
            </span>
          )}
        </div>
        <span className={`text-2xl font-light text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Contenido desplegable con transición */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen mt-3' : 'max-h-0'
        }`}
      >
        <div className="space-y-2 pb-2">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-pink-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="w-4 h-4 text-[#f46096ff] bg-white border-gray-300 rounded focus:ring-2 focus:ring-[#f46096ff] cursor-pointer"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL: LA BARRA LATERAL DE FILTROS ---

type SelectedFilters = Record<string, string[]>;

interface FilterSidebarProps {
  onFilterChange: (filters: SelectedFilters) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});
  const totalSelectedCount = Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0);

  // Función memoizada para manejar cambios
  const handleToggleOption = useCallback((sectionId: string, option: string) => {
    setSelectedFilters(prev => {
      const currentSelection = prev[sectionId] || [];
      const newSelection = currentSelection.includes(option)
        ? currentSelection.filter((item) => item !== option)
        : [...currentSelection, option];

      return {
        ...prev,
        [sectionId]: newSelection,
      };
    });
  }, []);

  // Notifica cambios al padre
  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  // Función para limpiar todos los filtros
  const handleClearFilters = useCallback(() => {
    setSelectedFilters({});
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Encabezado con título y contador */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-gray-900">Filtros</h2>
          {totalSelectedCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-xs font-semibold text-[#f46096ff] hover:text-[#fa4f8dff] transition-colors"
            >
              Limpiar ({totalSelectedCount})
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500">Personaliza tu búsqueda</p>
      </div>

      {/* Secciones de filtros */}
      <div className="divide-y divide-gray-200">
        {filterSections.map((section) => (
          <FilterAccordion
            key={section.id}
            title={section.title}
            options={section.options}
            selected={selectedFilters[section.id] || []}
            onToggle={(option) => handleToggleOption(section.id, option)}
          />
        ))}
      </div>

      {/* Footer con info */}
      <div className="p-4 bg-gray-50 text-xs text-gray-600 text-center border-t border-gray-200 rounded-b-lg">
        Ajusta los filtros para encontrar tu producto ideal
      </div>
    </div>
  );
};

export default FilterSidebar;