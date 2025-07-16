import React, { useState } from 'react';

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ searchTerm, ...filters });
  };

  return (
    <section className="px-4 font-sans w-full max-w-4xl mx-auto shadow-xl bg-white rounded-md md:rounded-full mt-[20%] md:mt-[10%]">
  <form
    onSubmit={handleSearchSubmit}
    className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3 p-4"
  >
    <select
      name="skinType"
      value={filters.skinType}
      onChange={handleFilterChange}
      className="w-full md:w-40 transition-transform duration-300 text-[#f46096ff] px-4 py-2 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f46096ff]"
    >
      <option value="todos">Tipo de piel</option>
      <option value="Mixta">Mixta</option>
      <option value="Grasa">Grasa</option>
      <option value="Seca">Seca</option>
    </select>

    <select
      name="sensitivity"
      value={filters.sensitivity}
      onChange={handleFilterChange}
      className="w-full md:w-40 text-[#f46096ff] transition-transform duration-300 px-4 py-2 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f46096ff]"
    >
      <option value="todos">Sensibilidad</option>
      <option value="sensible">Piel Sensible</option>
      <option value="no-sensible">Piel No Sensible</option>
    </select>

    <select
      name="sort"
      value={filters.sort}
      onChange={handleFilterChange}
      className="w-full md:w-40 text-[#f46096ff] transition-transform duration-300 px-4 py-2 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f46096ff]"
    >
      <option value="relevancia">Ordenar por</option>
      <option value="mayor">Mayor precio</option>
      <option value="menor">Menor precio</option>
      <option value="popular">Más popular</option>
    </select>

    <div className="flex w-full md:flex-grow">
      <input
        type="text"
        placeholder="Buscar producto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow px-4 py-2 text-[#f46096ff] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f46096ff] rounded-l-md md:rounded-l-full"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[#f46096ff] text-white text-sm rounded-full md:rounded-r-full hover:bg-pink-500 transition"
      >
        Buscar
      </button>
    </div>
  </form>
</section>


  );
};

export default SearchBarWithFilters;
