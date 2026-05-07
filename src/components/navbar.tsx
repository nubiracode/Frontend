import { useState, useEffect, type SetStateAction } from 'react';
import {
  Search, User, ShoppingBag, Menu, X, ChevronDown, ArrowRight, Heart,
} from 'lucide-react';

/* ─── data ──────────────────────────────────────────────────── */
const NAV_LINKS = [
  {
    label: 'New',
    featured: {
      tag: '✦ Destacado',
      title: 'Rutina completa de primavera',
      desc: 'Los 5 productos esenciales para esta temporada',
      href: '#guia',
      cta: 'Ver guía',
    },
    subcategories: [
      {
        title: 'Lanzamientos',
        links: [
          { href: '#', label: 'New Arrivals' },
          { href: '#', label: 'Best Sellers' },
          { href: '#', label: 'Latest Drops' },
          { href: '#', label: 'Editor\'s Picks' },
        ],
      },
      {
        title: 'Tendencias',
        links: [
          { href: '#', label: 'Trending Now' },
          { href: '#', label: 'TikTok Famous' },
          { href: '#', label: 'Clean Beauty' },
          { href: '#', label: 'Skinimalism' },
        ],
      },
    ],
  },
  {
    label: 'Skincare',
    featured: {
      tag: '✦ Guía',
      title: 'Arma tu rutina ideal',
      desc: 'Productos según tu tipo de piel',
      href: '#rutina',
      cta: 'Descubrir',
    },
    subcategories: [
      {
        title: 'Limpieza',
        links: [
          { href: '#', label: 'Tónicos' },
          { href: '#', label: 'Exfoliantes' },
          { href: '#', label: 'Desmaquillantes' },
          { href: '#', label: 'Limpiadores Faciales' },
        ],
      },
      {
        title: 'Protección & Trat.',
        links: [
          { href: '#', label: 'Protectores Solares' },
          { href: '#', label: 'Mascarillas' },
          { href: '#', label: 'Serums & Ampollas' },
          { href: '#', label: 'Contorno de Ojos' },
        ],
      },
    ],
  },
  { label: 'Makeup', href: '#' },
  { label: 'Sale', href: '#', isSale: true },
  { label: 'Blog', href: '#' },
];

/* ─── Google Fonts loader ────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    if (document.getElementById('nb-gfonts')) return;
    const link = document.createElement('link');
    link.id = 'nb-gfonts';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

type MegaMenuLink = {
  label: string;
  featured: {
    tag: string;
    title: string;
    desc: string;
    href: string;
    cta: string;
  };
  subcategories: {
    title: string;
    links: { href: string; label: string }[];
  }[];
};

type MegaMenuProps = {
  link: MegaMenuLink;
  onClose: () => void;
};

/* ─── Full-width Mega Menu ───────────────────────────────────── */
function MegaMenu({ link, onClose }: MegaMenuProps) {
  return (
    /* full-width panel attached to the bottom of the sticky header */
    <div
      className="absolute left-0 right-0 top-full z-50"
      style={{ boxShadow: '0 20px 60px rgba(180,60,120,0.10)' }}
    >
      <div className="bg-white border-t border-pink-100">
        <div className="max-w-8xl mx-auto px-6 py-8 grid grid-cols-[1fr_1fr_1fr_300px] gap-0">

          {/* col 1 – category 1 */}
          <div className="pr-8 border-r border-pink-100">
            <p className="text-[14px] font-semibold tracking-[0.18em] uppercase text-pink-300 mb-5"
               style={{ fontFamily: 'Jost, sans-serif' }}>
              {link.subcategories[0].title}
            </p>
            <ul className="space-y-1 list-none p-0 m-0">
              {link.subcategories[0].links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-gray-600
                               no-underline hover:bg-pink-50 hover:text-pink-500 transition-colors group"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-pink-200 group-hover:bg-pink-400 transition-colors shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* col 2 – category 2 */}
          <div className="px-8 border-r border-pink-100">
            <p className="text-[14px] font-semibold tracking-[0.18em] uppercase text-pink-300 mb-5"
               style={{ fontFamily: 'Jost, sans-serif' }}>
              {link.subcategories[1].title}
            </p>
            <ul className="space-y-1 list-none p-0 m-0">
              {link.subcategories[1].links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-gray-600
                               no-underline hover:bg-pink-50 hover:text-pink-500 transition-colors group"
                    style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-pink-200 group-hover:bg-pink-400 transition-colors shrink-0" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 – ver todo / quick links */}
          <div className="px-8 border-r border-pink-100">
            <p className="text-[14px] font-semibold tracking-[0.18em] uppercase text-pink-300 mb-5"
               style={{ fontFamily: 'Jost, sans-serif' }}>
              Populares
            </p>
            <div className="space-y-2">
              {['Ver todo', 'Más vendidos', 'Novedades de la semana', 'Ofertas especiales'].map((t) => (
                <a
                  key={t}
                  href="#"
                  onClick={onClose}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-sm
                             text-gray-600 no-underline hover:bg-pink-50 hover:text-pink-500
                             transition-colors group"
                  style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500 }}
                >
                  {t}
                  <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-pink-400" />
                </a>
              ))}
            </div>
          </div>

          {/* col 4 – featured card */}
          <div className="pl-8">
            <div
              className="h-full rounded-2xl p-6 flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, #fff0f6 0%, #fde8f0 100%)' }}
            >
              <div>
                <span
                  className="inline-block text-[14px] font-bold tracking-[0.16em] uppercase
                             text-pink-400 bg-white/70 rounded-full px-3 py-1 mb-4"
                  style={{ fontFamily: 'Jost, sans-serif' }}
                >
                  {link.featured.tag}
                </span>
                <h3
                  className="text-2xl leading-tight text-rose-950 mb-3"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
                >
                  {link.featured.title}
                </h3>
                <p
                  className="text-sm text-rose-400 leading-relaxed"
                  style={{ fontFamily: 'Jost, sans-serif' }}
                >
                  {link.featured.desc}
                </p>
              </div>
              <a
                href={link.featured.href}
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold
                           text-white bg-pink-500 hover:bg-pink-600 no-underline
                           px-5 py-2.5 rounded-full transition-colors self-start"
                style={{ fontFamily: 'Jost, sans-serif' }}
              >
                {link.featured.cta}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useFonts();

  const toggleMenu = (label: string) => {
    setSearchOpen(false);
    setActiveMenu(activeMenu === label ? null : label);
  };
  const closeAll = () => { setActiveMenu(null); setMobileOpen(false); };

  return (
    <div className="relative w-full">

      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 w-full bg-white border-b border-pink-100"
        style={{ boxShadow: '0 1px 12px rgba(200,80,130,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-white"
                 style={{ background: 'linear-gradient(135deg,#f472b6,#db2777)' }}>
              <Heart size={22} />
            </div>
            <span
              className="text-[36px] text-pink-500 tracking-tight"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
            >
              Beauty
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.3 h-full flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const isOpen = activeMenu === link.label;
              const hasMenu = !!link.subcategories;
              return (
                <div key={link.label} className="relative h-16 flex items-center">
                  {hasMenu ? (
                    <button
                      onClick={() => toggleMenu(link.label)}
                      className="flex items-center gap-1.5 px-4 h-full text-[17px] font-medium
                                 bg-transparent border-none cursor-pointer transition-colors"
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        color: isOpen ? '#ec4899' : '#4f5866',
                      }}
                    >
                      {link.label}
                      <ChevronDown
                        size={15}
                        style={{
                          transition: 'transform .2s',
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="flex items-center px-4 h-full text-[17px] font-medium no-underline transition-colors"
                      style={{
                        fontFamily: 'Jost, sans-serif',
                        color: link.isSale ? '#e11d48' : '#4f5866',
                        fontWeight: link.isSale ? 600 : 500,
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                  {/* Active bar */}
                  <span
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-pink-400"
                    style={{
                      transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform .22s cubic-bezier(.4,0,.2,1)',
                    }}
                  />
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-0.5 shrink-0">
            {/* Search input */}
            <div
              className="flex items-center gap-2 h-9 rounded-full border bg-pink-50 overflow-hidden transition-all duration-300"
              style={{
                width: searchOpen ? '300px' : '0px',
                opacity: searchOpen ? 1 : 0,
                padding: searchOpen ? '0 19px' : '0',
                borderColor: searchOpen ? '#fbcfe8' : 'transparent',
              }}
            >
              <Search size={16} className="text-pink-300 shrink-0" />
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-pink-300 min-w-0"
                style={{ fontFamily: 'Jost, sans-serif' }}
                placeholder="Buscar..."
                autoFocus={searchOpen}
              />
            </div>

            {[
              {
                icon: searchOpen ? <X size={17} /> : <Search size={26} />,
                onClick: () => { closeAll(); setSearchOpen(!searchOpen); },
              },
              { icon: <User size={26} />, className: 'hidden sm:flex' },
              {
                icon: (
                  <>
                    <ShoppingBag size={26} />
                    <span className="absolute top-1 right-1.5 w-3.5 h-3.5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                      0
                    </span>
                  </>
                ),
              },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={`relative w-9 h-9 flex items-center justify-center rounded-full
                            text-gray-500 hover:bg-pink-50 hover:text-pink-500 transition-colors
                            border-none bg-transparent cursor-pointer ${btn.className || ''}`}
              >
                {btn.icon}
              </button>
            ))}

            <button
              onClick={() => { closeAll(); setMobileOpen(!mobileOpen); }}
              className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full
                         text-gray-500 hover:bg-pink-50 hover:text-pink-500 transition-colors
                         border-none bg-transparent cursor-pointer"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* ── Full-width mega menus (rendered inside sticky header so they flow below it) ── */}
        {NAV_LINKS.filter((l) => l.subcategories).map((link) =>
          activeMenu === link.label ? (
            <MegaMenu key={link.label} link={link} onClose={closeAll} />
          ) : null
        )}

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-pink-100 bg-white">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                {link.subcategories ? (
                  <>
                    <button
                      onClick={() => toggleMenu(link.label)}
                      className="w-full flex items-center justify-between px-6 py-3.5 text-sm font-medium
                                 text-gray-700 hover:text-pink-500 hover:bg-pink-50 transition-colors
                                 bg-transparent border-none cursor-pointer"
                      style={{ fontFamily: 'Jost, sans-serif' }}
                    >
                      {link.label}
                      <ChevronDown
                        size={13}
                        style={{
                          transition: 'transform .2s',
                          transform: activeMenu === link.label ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}
                      />
                    </button>
                    {activeMenu === link.label && (
                      <div className="bg-pink-50/60 px-6 pb-4 pt-2 space-y-4">
                        {link.subcategories.map((cat) => (
                          <div key={cat.title}>
                            <p className="text-[13px] font-bold tracking-widest uppercase text-pink-300 mb-2"
                               style={{ fontFamily: 'Jost, sans-serif' }}>
                              {cat.title}
                            </p>
                            {cat.links.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="block py-1.5 text-sm text-gray-600 hover:text-pink-500
                                           no-underline transition-colors"
                                style={{ fontFamily: 'Jost, sans-serif' }}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    className={`flex px-6 py-3.5 text-sm font-medium no-underline
                                hover:bg-pink-50 transition-colors
                                ${link.isSale ? 'text-rose-500 font-semibold' : 'text-gray-700 hover:text-pink-500'}`}
                    style={{ fontFamily: 'Jost, sans-serif' }}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Overlay */}
      {activeMenu && (
        <div className="fixed inset-0 bg-black/10 z-30" onClick={closeAll} />
      )}
    </div>
  );
}