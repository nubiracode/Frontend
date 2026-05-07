import React, { useState, useCallback } from 'react';

interface FiltersState {
  skinType: string;
  sensitivity: string;
  sort: string;
}

interface SearchCriteria extends FiltersState {
  searchTerm: string;
}

interface SearchBarProps {
  onSearch: (criteria: SearchCriteria) => void;
}

const SearchBarWithFilters = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<FiltersState>({
    skinType: 'todos',
    sensitivity: 'todos',
    sort: 'relevancia',
  });

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => {
      const newFilters = { ...prev, [name]: value };
      // Notifica inmediatamente cuando cambian los filtros
      onSearch({ searchTerm, ...newFilters });
      return newFilters;
    });
  }, [searchTerm, onSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ searchTerm, ...filters });
  };

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Notifica en tiempo real mientras escribes
    onSearch({ searchTerm: value, ...filters });
  }, [filters, onSearch]);

  return (
    <section className="px-4 font-sans w-full max-w-6xl mx-auto shadow-lg bg-white rounded-2xl -mt-[-24px]">
      <form
        onSubmit={handleSearchSubmit}
        className="flex flex-col md:flex-row md:items-center md:gap-4 gap-2 p-5"
      >
        {/* Filtro: Tipo de piel */}
        <select
          name="skinType"
          value={filters.skinType}
          onChange={handleFilterChange}
          className="w-full md:w-auto px-4 py-2 text-gray-700 text-sm bg-white border border-pink-200 rounded-lg hover:border-[#f46096ff] focus:outline-none focus:ring-2 focus:ring-[#f46096ff] focus:border-transparent transition-all cursor-pointer"
        >
          <option value="todos">Tipo de piel</option>
          <option value="Mixta">Mixta</option>
          <option value="Grasa">Grasa</option>
          <option value="Seca">Seca</option>
        </select>

        {/* Filtro: Sensibilidad */}
        <select
          name="sensitivity"
          value={filters.sensitivity}
          onChange={handleFilterChange}
          className="w-full md:w-auto px-4 py-2 text-gray-700 text-sm bg-white border border-pink-200 rounded-lg hover:border-[#f46096ff] focus:outline-none focus:ring-2 focus:ring-[#f46096ff] focus:border-transparent transition-all cursor-pointer"
        >
          <option value="todos">Sensibilidad</option>
          <option value="sensible">Piel Sensible</option>
          <option value="no-sensible">Piel No Sensible</option>
        </select>

        {/* Filtro: Ordenar */}
        <select
          name="sort"
          value={filters.sort}
          onChange={handleFilterChange}
          className="w-full md:w-auto px-4 py-2 text-gray-700 text-sm bg-white border border-pink-200 rounded-lg hover:border-[#f46096ff] focus:outline-none focus:ring-2 focus:ring-[#f46096ff] focus:border-transparent transition-all cursor-pointer"
        >
          <option value="relevancia">Ordenar por</option>
          <option value="mayor">Mayor precio</option>
          <option value="menor">Menor precio</option>
          <option value="popular">Más popular</option>
        </select>

        {/* Buscador de texto */}
        <div className="flex w-full md:flex-grow gap-0">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 text-gray-700 text-sm bg-white border border-pink-200 border-r-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#f46096ff] focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#f46096ff] text-white text-sm font-medium rounded-r-lg hover:bg-[#fa4f8dff] active:scale-95 transition-all duration-200"
          >
            Buscar
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchBarWithFilters;