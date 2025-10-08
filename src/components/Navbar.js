"use client";

import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Link from "next/link";
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Cerrar menús al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isSearchOpen]);

  // Cerrar menús al redimensionar ventana
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, isSearchOpen]);

  return (
    <>
      <div className="fixed top-0 bg-[#1a1a1a] w-full z-50 px-4 md:px-8 h-16">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
          {/* Mobile: Hamburger | Desktop: Logo */}
          <div className="flex items-center">
            {/* Botón hamburguesa - solo mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-[#D64541] rounded mr-4"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-[#FFEFEF]" />
              ) : (
                <FiMenu className="w-6 h-6 text-[#FFEFEF]" />
              )}
            </button>

            {/* Logo - centrado en mobile, izquierda en desktop */}
            <Link href="/CheckoutContainer" className="logoFont text-[#FFEFEF] font-bold text-2xl md:text-4xl">
              LOGO PÁGINA
            </Link>
          </div>

          {/* Navegación desktop - centrada */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-8 text-[#FFEFEF] font-medium text-[16px] tracking-wider">
              <li className="text-[#D64541] hover:text-[#FF5B57] transition-colors duration-300">
                <Link href="/">HOME</Link>
              </li>

              <li className="flex items-center gap-1 cursor-pointer hover:text-[#D64541] transition-colors duration-300 group">
                <Link href="/">SHOP</Link>
                <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </li>

              <li className="flex items-center gap-1 cursor-pointer hover:text-[#D64541] transition-colors duration-300 group">
                <Link href="/">BRANDS</Link>
                <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </li>

              <li className="hover:text-[#D64541] transition-colors duration-300">
                <Link href="/about">ABOUT US</Link>
              </li>

              <li className="hover:text-[#D64541] transition-colors duration-300">
                <Link href="/blog">BLOG</Link>
              </li>
            </ul>
          </nav>

          {/* Acciones - Desktop: Búsqueda + Carrito | Mobile: Iconos */}
          <div className="flex items-center gap-4">
            {/* Desktop: Barra de búsqueda completa */}
            <div className="hidden md:flex items-center bg-[#FFEFEF] text-[#1a1a1a]/80 rounded-full px-4 py-2 w-[280px]">
              <FiSearch className="h-5 w-5 cursor-pointer" />
              <input
                type="text"
                placeholder="BUSCAR"
                className="outline-none text-sm w-full pl-2 tracking-widest bg-transparent"
              />
            </div>

            {/* Mobile: Solo icono de búsqueda */}
            <button 
              onClick={toggleSearch}
              className="md:hidden p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors"
            >
              <FiSearch className="h-6 w-6" />
            </button>

            {/* Carrito - visible en ambos */}
            <button className="p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors">
              <FiShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda móvil deslizante */}
      <div className={`fixed top-16 right-0 w-80 bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        isSearchOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#FFEFEF] font-medium text-lg">Buscar</h3>
            <button 
              onClick={toggleSearch}
              className="p-1 text-[#FFEFEF] hover:text-[#D64541] transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center bg-[#FFEFEF] text-[#1a1a1a]/80 rounded-full px-4 py-3">
            <FiSearch className="h-5 w-5 cursor-pointer" />
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="outline-none text-sm w-full pl-2 bg-transparent"
              autoFocus
            />
          </div>
        </div>
      </div>

      {/* Menú móvil de navegación */}
      <div className={`fixed top-16 left-0 w-full bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="px-6 py-8">
          {/* Solo navegación móvil - SIN búsqueda ni carrito */}
          <ul className="flex flex-col gap-6 text-[#FFEFEF] font-medium text-lg tracking-wider">
            <li className="text-[#D64541] hover:text-[#FF5B57] transition-colors duration-300">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>HOME</Link>
            </li>

            <li className="flex items-center gap-2 cursor-pointer hover:text-[#D64541] transition-colors duration-300">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg">SHOP</Link>
              <FiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            </li>

            <li className="flex items-center gap-2 cursor-pointer hover:text-[#D64541] transition-colors duration-300">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg">BRANDS</Link>
              <FiChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            </li>

            <li className="hover:text-[#D64541] transition-colors duration-300">
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link>
            </li>

            <li className="hover:text-[#D64541] transition-colors duration-300">
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>BLOG</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay para cerrar menús */}
      {(isMenuOpen || isSearchOpen) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;