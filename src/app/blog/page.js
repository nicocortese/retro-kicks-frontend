import Image from "next/image";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "AND1: La Revolución del Streetball",
      excerpt: "Cómo una marca nacida en las canchas de Filadelfia cambió para siempre el mundo del basketball urbano.",
      image: "/assets/imgs/and1-basketball.jpg",
      date: "15 Enero 2025",
      readTime: "5 min",
      category: "Historia"
    },
    {
      id: 2,
      title: "Converse All Star: 100 Años de Rebeldía",
      excerpt: "Desde las canchas de basketball hasta los escenarios de rock, la historia de un ícono cultural.",
      image: "/assets/imgs/converse-allstar.jpg",
      date: "10 Enero 2025",
      readTime: "7 min",
      category: "Clásicos"
    },
    {
      id: 3,
      title: "Vans: Del Skate a la Moda",
      excerpt: "La evolución de una marca californiana que conquistó el mundo desde las rampas de skate.",
      image: "/assets/imgs/vans-skate.jpg",
      date: "5 Enero 2025",
      readTime: "6 min",
      category: "Cultura"
    }
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sneaker Stories
          </h1>
          <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
            Las historias detrás de las zapatillas que marcaron generaciones
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
            <div className="md:flex">
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <Image
                  src="/assets/imgs/and1-basketball.jpg"
                  alt="AND1 Basketball"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <span className="inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Artículo Destacado
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                  AND1: La Revolución del Streetball
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  En 1993, tres estudiantes universitarios de Filadelfia tenían una visión: crear una marca 
                  que representara el verdadero espíritu del basketball callejero. Seth Berger, Jay Coen Gilbert 
                  y Tom Austin fundaron AND1 con una simple premisa: el streetball era más que un deporte, 
                  era una forma de arte urbano.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Lo que comenzó como camisetas con frases provocativas como &quot;I&apos;m the bus driver, I take everyone to school&quot; 
                  pronto se convirtió en un movimiento cultural. AND1 no solo vendía zapatillas, vendía actitud, 
                  estilo y la promesa de que cualquiera podía ser una leyenda en su propia cancha.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Las zapatillas AND1 se convirtieron en el calzado oficial de los jugadores de streetball más 
                  legendarios: Skip to My Lou, Hot Sauce, The Professor. Cada modelo contaba la historia de 
                  movimientos imposibles, de partidos que se jugaban hasta el amanecer, de una cultura que 
                  transformó el asfalto en escenario.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>15 Enero 2025</span>
                  <span className="mx-2">•</span>
                  <span>5 min de lectura</span>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Más Historias</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-red-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              No te pierdas ninguna historia
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              Suscribite a nuestro newsletter y recibí las mejores historias del mundo sneaker
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 outline-none"
              />
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
