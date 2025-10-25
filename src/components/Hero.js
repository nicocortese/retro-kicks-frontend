import React from "react";

const Hero = () => {
  return (
    <section className="relative h-[200px] md:h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/videos/retro_shoes.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      <h1 className="relative z-20 text-[#ffefef] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4 text-balance">
        El estilo que dejó huella
      </h1>
    </section>
  );
};

export default Hero;
