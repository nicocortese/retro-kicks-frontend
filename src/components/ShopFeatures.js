import { FiTruck, FiHeadphones, FiRefreshCw, FiShield } from "react-icons/fi";

const features = [
  {
    icon: <FiTruck className="w-8 h-8" />,
    title: "Envíos Gratis",
    description: "Envíos GRATIS a todo el país",
  },
  {
    icon: <FiHeadphones className="w-8 h-8" />,
    title: "Soporte 24/7",
    description: "Atención las 24 horas, los 7 días de la semana",
  },
  {
    icon: <FiRefreshCw className="w-8 h-8" />,
    title: "Devolución en 30 días",
    description: "Devolvé tu compra dentro de los 30 días",
  },
  {
    icon: <FiShield className="w-8 h-8" />,
    title: "Pago 100% Seguro",
    description: "Protección en todas tus compras",
  },
];

const ShopFeatures = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      {features.map((feature, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="mb-4 text-[#D64541]">{feature.icon}</div>
          <h3 className="font-semibold text-lg">{feature.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ShopFeatures;
