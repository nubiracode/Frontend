import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const navLinksLeft = [
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#productos', label: 'Productos' },
  { href: '#app', label: 'App' },
];
const navLinksRight = [
  { href: '#signup', label: 'Sign Up' },
  { href: '#login', label: 'Log In' },
];
const mobileNavLinks = [...navLinksLeft, ...navLinksRight];

type NavLinkProps = {
  href: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ href, label, onClick, className = '' }) => (
  <a
    href={href}
    onClick={onClick}
    className={`block relative w-full text-center px-4 py-2 rounded-md transition duration-200 font-medium 
      hover:text-[#f46096ff] hover:before:scale-x-100 before:content-[''] before:absolute 
      before:bottom-0 before:left-0 before:w-full before:h-[2px] before:bg-[#f46096ff] 
      before:scale-x-0 before:origin-left before:transition-transform ${className}`}
  >
    {label}
  </a>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="bg-[#ffc8dc] text-[#f46096ff] shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">

          {/* Sección izquierda */}
          <div className="flex items-center flex-1">
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 focus:outline-none focus:ring-2 focus:ring-[#f46096ff]"
                aria-label="Abrir menú"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
            <div className="hidden md:flex space-x-6">
              {navLinksLeft.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-md transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#f46096ff] text-md text-[#f46096ff] hover:underline
                `}
              >
                {link.label}
              </a>
            ))}
            </div>
          </div>

   
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <a href="/" className="flex items-center space-x-2 group transition-transform hover:scale-105">
              <img
                src="/logo.png"
                alt="Logo de Beauty"
                className="h-12 w-12 md:h-14 md:w-14 rounded-full shadow-md"
              />
              <span className="text-2xl md:text-3xl font-semibold font-serif tracking-wide">
                Beauty
              </span>
            </a>
          </div>

          {/* Sección derecha */}
          <div className="flex items-center justify-end flex-1 space-x-3 hidden md:flex">
            {navLinksRight.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-md transition duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#f46096ff] text-md
                  ${
                    index === 0
                      ? 'bg-white text-[#f46096ff] hover:bg-pink-100 shadow-sm'
                      : 'text-[#f46096ff] hover:underline'
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] pt-4 pb-6 px-4' : 'max-h-0'
        }`}
      >
        <div className="space-y-2">
          {mobileNavLinks.map((link) => (
            <NavLink
              key={link.label}
              {...link}
              onClick={toggleMobileMenu}
             className="text-base text-[#f46096ff] text-center w-full border border-white border-opacity-60 rounded-md"

            />
          ))}
          <button className="flex items-center justify-center w-full mt-3 px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100 transition border border-white border-opacity-60 rounded-md">
            <Globe size={18} className="mr-2" />
            Idioma
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
