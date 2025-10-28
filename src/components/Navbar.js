"use client";

import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown, FiChevronRight, FiHeart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // 'useState' se usa de nuevo
import { useShopContext } from "@/contexts/ShopContext";

const Navbar = () => {
  const { totalCartItems, categories } = useShopContext();
  const itemsInCart = totalCartItems();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchOpenDesktop, setIsSearchOpenDesktop] = useState(false);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e.key !== "Enter" || !searchQuery.trim()) return;

    router.push(`/search?q=${searchQuery}`);

    setSearchQuery("");
    setIsSearchOpenDesktop(false);
    setIsSearchOpen(false);
  };

  const pathname = usePathname();

  const styleSlugs = ["urban", "running", "basketball", "outdoor", "skate"];

  const styleCategories = categories.filter((cat) =>
    styleSlugs.includes(cat.slug)
  );

  const brandCategories = categories.filter(
    (cat) => !styleSlugs.includes(cat.slug)
  );

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        setIsSearchOpen(false);
      } else {
        setOpenMobileSubMenu(null);
      }
      return isOpen;
    });
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        setIsMenuOpen(false);
        setOpenMobileSubMenu(null);
      }
      return isOpen;
    });
  };

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-0 bg-[#1a1a1a] w-full z-50 px-4 md:px-8 h-16">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
          <div className="flex items-center">
             {" "}
            <button
              onClick={toggleMenu}
              className={`md:hidden flex items-center justify-center w-8 h-8 focus:outline-none focus:ring-2 focus:ring-[#D64541] rounded mr-4 ${
                isSearchOpen ? "hidden" : ""
              }`}
            >
              {" "}
              {isMenuOpen ? (
                <FiX className="w-6 h-6 text-[#FFEFEF]" />
              ) : (
                <FiMenu className="w-6 h-6 text-[#FFEFEF]" />
              )}
            </button>
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/imgs/logoreal.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto"
              />{" "}
            </Link>{" "}
          </div>

          {!isSearchOpenDesktop ? (
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex items-center gap-8 text-[#FFEFEF] font-medium text-[16px] tracking-wider">
                <li
                  className={`transition-colors duration-300 ${
                    pathname === "/" ? "text-[#D64541]" : "hover:text-[#D64541]"
                  }`}
                >
                  <Link href="/">HOME</Link>
                </li>

                <li
                  className={`relative group cursor-pointer ${
                    pathname.startsWith("/shop") ||
                    pathname.startsWith("/category/")
                      ? "text-[#D64541]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-1 hover:text-[#D64541] transition-colors duration-300">
                    SHOP
                    <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[160px] pointer-events-none group-hover:pointer-events-auto">
                    {styleCategories.length > 0 ? (
                      styleCategories.map((cat) => (
                        <Link
                          key={cat._id}
                          href={`/shop/${cat.slug}`}
                          className="block px-4 py-2 text-sm text-[#FFEFEF] hover:bg-[#D64541] transition-colors capitalize"
                        >
                          {cat.name}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-[#272626]/60">
                        Cargando...
                      </p>
                    )}
                  </div>
                </li>

                <li
                  className={`relative group cursor-pointer ${
                    pathname.startsWith("/brands/") ? "text-[#D64541]" : ""
                  }`}
                >
                  <div className="flex items-center gap-1 hover:text-[#D64541] transition-colors duration-300">
                    BRANDS
                    <FiChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-[160px] pointer-events-none group-hover:pointer-events-auto">
                    {brandCategories.length > 0 ? (
                      brandCategories.map((brand) => (
                        <Link
                          key={brand._id}
                          href={`/brands/${brand.slug}`}
                          className="block px-4 py-2 text-sm text-[#FFEFEF] hover:bg-[#D64541] transition-colors capitalize"
                        >
                          {brand.name}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-sm text-[#272626]/60">
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
          ) : (
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-2">
              <div className="flex items-center bg-[#FFEFEF] text-[#1a1a1a]/80 rounded-full px-4 py-2 w-[350px]">
                <FiSearch className="h-5 w-5" />
                <input
                  type="text"
                  placeholder="BUSCAR Y PRESIONAR ENTER"
                  autoFocus
                  className="outline-none text-sm w-full pl-2 tracking-widest bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
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

          <div className="flex items-center gap-4">
            {!isSearchOpenDesktop && (
              <button
                onClick={() => setIsSearchOpenDesktop(true)}
                className="hidden md:block p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer"
              >
                <FiSearch className="h-6 w-6" />
              </button>
            )}

            <button
              onClick={toggleSearch}
              className="md:hidden p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors"
            >
              <FiSearch className="h-6 w-6" />
            </button>

            <Link
              href="/wishlist"
              className="p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer"
            >
              <FiHeart className="h-6 w-6" />
            </Link>

            <Link
              href="/checkout"
              className="relative p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors cursor-pointer"
            >
              <FiShoppingCart className="h-6 w-6" />
              {itemsInCart > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-[#ffefef] bg-[#D64541] rounded-full">
                  {itemsInCart}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
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
            <FiSearch className="h-5 w-5" />
            <input
              type="text"
              placeholder="Buscar y presionar Enter"
              className="outline-none text-sm w-full pl-2 bg-transparent"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-16 left-0 bottom-0 w-full bg-[#1a1a1a] z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-8 h-full flex flex-col overflow-y-auto">
          <ul className="flex flex-col gap-6 text-[#FFEFEF] font-medium text-lg tracking-wider">
            <li className={pathname === "/" ? "text-[#D64541]" : ""}>
              {" "}
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                HOME{" "}
              </Link>{" "}
            </li>
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
                SHOP
                <FiChevronRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openMobileSubMenu === "shop" ? "rotate-90" : ""
                  }`}
                />
              </div>
              {openMobileSubMenu === "shop" && (
                <ul className="mt-2 pl-4 flex flex-col gap-2">
                  {styleCategories.map(function (cat) {
                    return (
                      <li key={cat._id}>
                        <Link
                          href={`/shop/${cat.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm capitalize hover:text-[#D64541]"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
            <li
              className={
                pathname.startsWith("/brands/") ? "text-[#D64541]" : ""
              }
            >
              <div
                className="flex items-center justify-between cursor-pointer hover:text-[#D64541] transition-colors"
                onClick={() => handleMobileSubMenuToggle("brands")}
              >
                BRANDS
                <FiChevronRight
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openMobileSubMenu === "brands" ? "rotate-90" : ""
                  }`}
                />
              </div>
              {openMobileSubMenu === "brands" && (
                <ul className="mt-2 pl-4 flex flex-col gap-2">
                  {brandCategories.map(function (brand) {
                    return (
                      <li key={brand._id}>
                        <Link
                          href={`/brands/${brand.slug}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm capitalize hover:text-[#D64541]"
                        >
                          {brand.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
            <li className={pathname === "/about" ? "text-[#D64541]" : ""}>
              {" "}
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>
                ABOUT US{" "}
              </Link>{" "}
            </li>{" "}
            <li className={pathname === "/blog" ? "text-[#D64541]" : ""}>
              {" "}
              <Link href="/blog" onClick={() => setIsMenuOpen(false)}>
                BLOG{" "}
              </Link>{" "}
            </li>
          </ul>

          <div className="mt-auto pt-6 border-t">
            <div className="flex items-center gap-4">
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors"
              >
                <FiHeart className="w-5 h-5" />
                <span>Wishlist</span>
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 text-[#FFEFEF] hover:text-[#D64541] transition-colors relative"
              >
                <FiShoppingCart className="w-5 h-5" />
                <span>Carrito</span>
                {itemsInCart > 0 && (
                  <span className="absolute top-0 right-[-10px] flex items-center justify-center w-5 h-5 text-xs font-bold text-[#ffefef] bg-[#D64541] rounded-full">
                    {itemsInCart}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
