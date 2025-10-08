"use client";

import Slider from "react-slick";
import ShopCards from "./ShopCards";
import { useShopContext } from "@/contexts/ShopContext";
import Loading from "@/components/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCarousel = () => {
  const { products, loading } = useShopContext();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  if (loading) return <Loading />;

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[rgb(var(--foreground-rgb))] text-center">
          ¡Descubre las ofertas de hoy!
        </h2>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product._id} className="px-2">
            <ShopCards product={product} />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default ProductCarousel;
