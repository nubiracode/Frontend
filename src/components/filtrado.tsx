import { useState, useEffect } from 'react';

// --- ESTRUCTURA DE DATOS PARA LOS FILTROS ---
// Fácil de modificar para añadir o quitar secciones y opciones.
const filterSections = [
  {
    id: 'ingredient',
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
    title: 'Piel',
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

  return (
    <div className="border-b border-gray-200 py-4">
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <span className="text-2xl font-light text-gray-500">{isOpen ? '−' : '+'}</span>
      </button>

      {/* Contenido desplegable con transición */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}>
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="h-4 w-4 rounded 300 text-black focus:ring-black accent-black"
              />
              <span className="font-sans">{option}</span>
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
  // Estado para guardar todas las selecciones. Ej: { brand: ['Cosrx', 'Anua'], skinType: ['Grasa'] }
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({});

  // Función para manejar el cambio en cualquier checkbox
  const handleToggleOption = (sectionId: string, option: string) => {
    const currentSelection = selectedFilters[sectionId] || [];
    const newSelection = currentSelection.includes(option)
      ? currentSelection.filter((item) => item !== option) // Si ya está, lo quita
      : [...currentSelection, option]; // Si no está, lo añade

    setSelectedFilters((prev) => ({
      ...prev,
      [sectionId]: newSelection,
    }));
  };
  
  // Notifica al componente padre cada vez que los filtros cambian
  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);


  return (
    <div className="w-full max-w-xs p-4 bg-white font-semibold font-serif tracking-tight">
           <h1 className='text-xl md:text-xl font-semibold font-serif tracking-tight'>Filtros específicos</h1>
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
  );
};

export default FilterSidebar;