import Image from "next/image";
import Link from "next/link";

const trendingTopics = [
  {
    id: 1,
    title: "Moda Urbana",
    description: "Las zapatillas que están definiendo el estilo en las calles.",
    image: "/assets/imgs/vans-skate.jpg",
    href: "/blog",
  },
  {
    id: 2,
    title: "Clásicos Atemporales",
    description: "Iconos que nunca pasan de moda y siguen marcando tendencia.",
    image: "/assets/imgs/converse-allstar.jpg",
    href: "/blog",
  },
];

export default function Trendings() {
  return (
    <section className= "py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#272626] mb-4">
            Descubrí las Tendencias
          </h2>
          <p className="text-lg font-semibold text-[#272626]/80">
            Explorá las historias y estilos que están marcando el ritmo en el
            mundo sneaker.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trendingTopics.map((topic) => (
            <Link
              href={topic.href}
              key={topic.id}
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="relative w-full h-80">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-[#ffefef]">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-base lg:text-lg text-[#ffefef]">
                    {topic.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
