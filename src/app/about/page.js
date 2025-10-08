import Image from "next/image";

export default function About() {
  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Más que una tienda, somos guardianes de la historia del calzado urbano
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Nuestra Historia
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Fundada en 2018 por un grupo de apasionados coleccionistas, nuestra tienda nació 
                del amor por las zapatillas que marcaron épocas y definieron culturas urbanas.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Comenzamos como un pequeño local en el barrio, pero nuestra pasión por encontrar 
                y preservar modelos icónicos nos llevó a convertirnos en referentes del calzado retro.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cada par que vendemos cuenta una historia, y nosotros somos los narradores 
                de esas historias que caminaron por las calles del mundo.
              </p>
            </div>
            <div className="relative h-80 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/assets/imgs/store-vintage.jpg"
                alt="Tienda vintage"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Autenticidad</h3>
              <p className="text-gray-600">
                Cada producto es verificado y garantizamos su originalidad y calidad.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">P</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pasión</h3>
              <p className="text-gray-600">
                Vivimos y respiramos la cultura sneaker, compartiendo ese amor contigo.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">C</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comunidad</h3>
              <p className="text-gray-600">
                Creamos conexiones entre personas que comparten el amor por el estilo retro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              ¿Tenés alguna consulta?
            </h2>
            <p className="text-lg text-gray-600">
              Nos encanta escuchar de nuestra comunidad. Escribinos y te respondemos pronto.
            </p>
          </div>

          <form className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
                placeholder="¿De qué querés hablarnos?"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje *
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Contanos qué tenés en mente..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}