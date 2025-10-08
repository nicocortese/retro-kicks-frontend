"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-[#FFEFEF] pt-16 pb-10 w-full">
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <p className="logoFont text-3xl font-bold">LOGO PÁGINA</p>
          <p className="text-sm text-[#FFEFEF]/70 leading-relaxed">
            Tu tienda de zapatillas retro favoritas. Estilo que trasciende
            generaciones.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold mb-2">Enlaces</h3>
          <Link href="/" className="hover:text-[#D64541] transition-colors">
            Home
          </Link>
          <Link href="/" className="hover:text-[#D64541] transition-colors">
            Shop
          </Link>
          <Link href="/" className="hover:text-[#D64541] transition-colors">
            Brands
          </Link>
          <Link href="/about" className="hover:text-[#D64541] transition-colors">
            About Us
          </Link>
          <Link href="/blog" className="hover:text-[#D64541] transition-colors">
            Blog
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold mb-2">Suscribite</h3>
          <p className="text-sm text-[#FFEFEF]/70 leading-relaxed">
            Recibí novedades y promociones
          </p>
          <form className="flex gap-2 mt-2">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 rounded-full text-black outline-none bg-white"
            />

            <button
              type="submit"
              className="bg-[#D64541] text-white px-5 py-3 rounded-r-full hover:bg-[#FF5B57] transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-[#FFEFEF]/20 pt-6 text-center text-sm text-[#FFEFEF]/50">
        © {new Date().getFullYear()} LOGO PÁGINA. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
