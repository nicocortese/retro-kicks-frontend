"use client";

import {
  FiSearch,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronRight,
  FiHeart,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchOpenDesktop, setIsSearchOpenDesktop] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const processProductData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/products");
        const products = res.data.products || [];
        const allStyles = products.map((p) => p.style).filter(Boolean);
        const uniqueStyles = [...new Set(allStyles)];
        setCategories(uniqueStyles);
        const allBrands = products.flatMap((p) => p.brand).filter(Boolean);
        const uniqueBrands = [...new Set(allBrands)];
        setBrands(uniqueBrands);
      } catch (error) {
        console.error("Error al cargar datos del Navbar:", error);
      }
    };
    processProductData();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) setOpenMobileSubMenu(null);
  };

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleMobileSubMenuToggle = (menu) => {
    setOpenMobileSubMenu(openMobileSubMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
      if (isSearchOpen) setIsSearchOpen(false);
      if (isSearchOpenDesktop) setIsSearchOpenDesktop(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, isSearchOpen, isSearchOpenDesktop]);

  // Cerrar menús al cambiar tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isSearchOpen]);

  return (
    <>
      {/* Navbar principal */}
      <div className="fixed top-0 bg-[#1a1a1a] w-full z-50 px-4 md:px-8 h-16">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
          {/* Botón móvil + Logo */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-[#D64541] rounded mr-4"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-[#FFEFEF]" />
              ) : (
                <FiMenu className="w-6 h-6 text-[#FFEFEF]" />
              )}
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/imgs/logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-8 text-[#FFEFEF] font-medium text-[16px] tracking-wider">
              <li
                className={`transition-colors duration-300 ${
                  pathname === "/" ? "text-[#D64541]" : "hover:text-[#D64541]"
                }`}
              >
                <Link href="/">HOME</Link>
              </li>

              {/* SHOP Dropdown */}
              <li
                className={`relative group cursor-pointer ${
                  pathname.startsWith("/shop") ||
                  pathname.startsWith("/category/")
                    ? "text-[#D64541]"
                    : ""
                }`}
              >
                <div className="flex items-center gap-1 hover:text-[#D64541] transition-colors duration-300">
                  <span>SHOP</span>
                  <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[160px]">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/shop/${cat.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-[#FFEFEF] hover:bg-[#D64541] transition-colors capitalize"
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-400">
                      Cargando...
                    </p>
                  )}
                </div>
              </li>

              {/* BRANDS Dropdown */}
              <li
                className={`relative group cursor-pointer ${
                  pathname.startsWith("/brands/") ? "text-[#D64541]" : ""
                }`}
              >
                <div className="flex items-center gap-1 hover:text-[#D64541] transition-colors duration-300">
                  <span>BRANDS</span>
                  <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[160px]">
                  {brands.length > 0 ? (
                    brands.map((brand) => (
                      <Link
                        key={brand}
                        href={`/brands/${brand.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-[#FFEFEF] hover:bg-[#D64541] transition-colors capitalize"
                      >
                        {brand}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-sm text-gray-400">
                      Cargando...
                    </p>
                  )}
                </div>
              </li>

              <li
                className={`transition-colors duration-300 ${
                  pathname === "/about"
                    ? "text-[#D64541]"
                    : "hover:text-[#D64541]"
                }`}
              >
                <Link href="/about">ABOUT US</Link>
              </li>
              <li
                className={`transition-colors duration-300 ${
                  pathname === "/blog"
                    ? "text-[#D64541]"
                    : "hover:text-[#D64541]"
                }`}
              >
                <Link href="/blog">BLOG</Link>
              </li>
            </ul>
          </nav>

          {/* Acciones (search + wishlist + cart) */}
          <div className="flex items-center gap-4">
            {/* Desktop search - Colapsable */}
            {!isSearchOpenDesktop ? (
              <button
                onClick={() => setIsSearchOpenDesktop(true)}
                className="hidden md:block p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer"
              >
                <FiSearch className="h-6 w-6" />
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <div className="flex items-center bg-[#FFEFEF] text-[#1a1a1a]/80 rounded-full px-4 py-2 w-[280px]">
                  <FiSearch className="h-5 w-5 cursor-pointer" />
                  <input
                    type="text"
                    placeholder="BUSCAR"
                    autoFocus
                    className="outline-none text-sm w-full pl-2 tracking-widest bg-transparent"
                  />
                </div>
                <button
                  onClick={() => setIsSearchOpenDesktop(false)}
                  className="p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Mobile search */}
            <button
              onClick={toggleSearch}
              className="md:hidden p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors"
            >
              <FiSearch className="h-6 w-6" />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <button className="p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer">
                <FiHeart className="h-6 w-6" />
              </button>
            </Link>

            {/* Cart */}
            <Link href="/checkout">
              <button className="p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer">
                <FiShoppingCart className="h-6 w-6" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda móvil */}
      <div
        className={`fixed top-16 right-0 w-80 bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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

      {/* Menú móvil */}
      <div
        className={`fixed top-16 left-0 w-full bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-8">
          <ul className="flex flex-col gap-6 text-[#FFEFEF] font-medium text-lg tracking-wider">
            <li className={pathname === "/" ? "text-[#D64541]" : ""}>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                HOME
              </Link>
            </li>

            {/* SHOP submenu */}
            <li
              className={
                pathname.startsWith("/shop") ||
                pathname.startsWith("/category/")
                  ? "text-[#D64541]"
                  : ""
              }
            >
              <div
                className="flex items-center justify-between cursor-pointer hover:text-[#D64541] transition-colors"
                onClick={() => handleMobileSubMenuToggle("shop")}
              >
                <span>SHOP</span>
                <FiChevronRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openMobileSubMenu === "shop" ? "rotate-90" : ""
                  }`}
                />
              </div>
              {openMobileSubMenu === "shop" && (
                <ul className="mt-2 pl-4 flex flex-col gap-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/shop/${cat.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm capitalize hover:text-[#D64541]"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* BRANDS submenu */}
            <li
              className={
                pathname.startsWith("/brands/") ? "text-[#D64541]" : ""
              }
            >
              <div
                className="flex items-center justify-between cursor-pointer hover:text-[#D64541] transition-colors"
                onClick={() => handleMobileSubMenuToggle("brands")}
              >
                <span>BRANDS</span>
                <FiChevronRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openMobileSubMenu === "brands" ? "rotate-90" : ""
                  }`}
                />
              </div>
              {openMobileSubMenu === "brands" && (
                <ul className="mt-2 pl-4 flex flex-col gap-2">
                  {brands.map((brand) => (
                    <li key={brand}>
                      <Link
                        href={`/brands/${brand.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm capitalize hover:text-[#D64541]"
                      >
                        {brand}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li className={pathname === "/about" ? "text-[#D64541]" : ""}>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                ABOUT US
              </Link>
            </li>
            <li className={pathname === "/blog" ? "text-[#D64541]" : ""}>
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
                BLOG
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
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
