"use client";

import Link from "next/link";
import Image from "next/image";

const BrandLogos = () => {
  const brands = [
    { name: "Nike", slug: "nike", image: "/assets/imgs/nike-logo.png" },
    { name: "Adidas", slug: "adidas", image: "/assets/imgs/adidas-logoo.png" },
    { name: "Puma", slug: "puma", image: "/assets/imgs/puma-logo.png" },
    { name: "Reebok", slug: "reebok", image: "/assets/imgs/reebok-logo.png" },
    { name: "Converse", slug: "converse", image: "/assets/imgs/converse-logo.png" },
    { name: "Vans", slug: "vans", image: "/assets/imgs/vans-logo.png" },
    { name: "Fila", slug: "fila", image: "/assets/imgs/fila-logo.png" },
    { name: "Skechers", slug: "skechers", image: "/assets/imgs/skechers-log.png" },
    { name: "New Balance", slug: "newbalance", image: "/assets/imgs/nb-logo.png" },
    { name: "Asics", slug: "asics", image: "/assets/imgs/asics-logo.png" },

  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center text-[rgb(var(--foreground-rgb))]">
          Marcas con las que trabajamos
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative w-full h-20">
              <Image
                src={brand.image}
                alt={`${brand.name} logo`}
                className="object-contain"
                width={400}
                height={400}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BrandLogos;
