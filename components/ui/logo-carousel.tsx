"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { TextRoll } from "./text-roll";

export type LogoItem = {
  src: string;
  alt: string;
};

export const AnimatedCarousel = ({
  title = "Trusted by thousands of businesses worldwide",
  logoCount = 15,
  autoPlay = true,
  autoPlayInterval = 1000,
  logos = null as LogoItem[] | null,
  containerClassName = "",
  titleClassName = "",
  carouselClassName = "",
  logoClassName = "",
  itemsPerViewMobile = 4,
  itemsPerViewDesktop = 6,
  spacing = "gap-10",
  padding = "py-20 lg:py-40",
  logoContainerWidth = "w-48",
  logoContainerHeight = "h-24",
  logoImageWidth = "w-full",
  logoImageHeight = "h-full",
  logoMaxWidth = "",
  logoMaxHeight = "",
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // useReducedMotion() can be true on the first client render and false during
  // SSR. Branching the heading on it swaps "Powering the Web" for the rolled
  // letters and fails hydration. Ignore the preference until after mount.
  useEffect(() => {
    setMounted(true);
  }, []);
  const reduceMotion = mounted && prefersReducedMotion === true;

  useEffect(() => {
    if (!api || !autoPlay || !mounted || reduceMotion) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, autoPlayInterval);

    return () => clearTimeout(timer);
  }, [api, current, autoPlay, autoPlayInterval, mounted, reduceMotion]);

  const defaultLogos: LogoItem[] = Array.from({ length: logoCount }, (_, i) => ({
    src: `https://via.placeholder.com/100x100?text=Logo+${i + 1}`,
    alt: `Logo ${i + 1}`,
  }));

  const logoItems = logos || defaultLogos;

  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

  return (
    <div className={`w-full ${padding} ${containerClassName}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${spacing}`}>
          <h2
            className={`text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left ml-2 ${titleClassName}`}
          >
            {reduceMotion ? title : <TextRoll>{title}</TextRoll>}
          </h2>

          <div className="relative px-10 md:px-12">
            <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className={`w-full ${carouselClassName}`}>
              <CarouselPrevious className="-left-1 top-1/2 z-10 h-9 w-9 md:h-10 md:w-10 -translate-y-1/2 rounded-full border-white/10 bg-[var(--void)] text-white hover:bg-white/5" />
              <CarouselNext className="-right-1 top-1/2 z-10 h-9 w-9 md:h-10 md:w-10 -translate-y-1/2 rounded-full border-white/10 bg-[var(--void)] text-white hover:bg-white/5" />

              <CarouselContent>
                {logoItems.map((logo, index) => (
                  <CarouselItem className={`basis-1/${itemsPerViewMobile} lg:basis-1/${itemsPerViewDesktop}`} key={index}>
                    <div className={`flex rounded-md ${logoContainerWidth} ${logoContainerHeight} items-center justify-center p-4 transition-colors hover:bg-white/[0.03] ${logoClassName}`}>
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className={`${logoImageSizeClasses} object-contain brightness-0 invert`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Pre-configured carousel for the portfolio ── */

const partnerLogos: LogoItem[] = [
  { src: "/icons/react.svg", alt: "React" },
  { src: "/icons/nextdotjs.svg", alt: "Next.js" },
  { src: "/icons/vercel.svg", alt: "Vercel" },
  { src: "/icons/typescript.svg", alt: "TypeScript" },
  { src: "/icons/tailwindcss.svg", alt: "Tailwind CSS" },
  { src: "/icons/threedotjs.svg", alt: "Three.js" },
  { src: "/icons/github.svg", alt: "GitHub" },
  { src: "/icons/figma.svg", alt: "Figma" },
  { src: "/icons/python.svg", alt: "Python" },
  { src: "/icons/nodedotjs.svg", alt: "Node.js" },
  { src: "/icons/framer.svg", alt: "Framer Motion" },
];

export const LogoCarousel = () => {
  return (
    <section className="bg-[var(--void)]">
      <AnimatedCarousel
        title="Powering the Web"
        logos={partnerLogos}
        autoPlay
        autoPlayInterval={3500}
        itemsPerViewMobile={3}
        itemsPerViewDesktop={6}
        spacing="gap-12"
        padding="py-16 lg:py-24"
        containerClassName="text-white"
        titleClassName="text-white font-medium"
        logoContainerWidth="w-full lg:w-40"
        logoContainerHeight="h-20"
        logoImageWidth="w-auto"
        logoImageHeight="h-8 md:h-10"
      />
    </section>
  );
};

export const Case1 = (props: Record<string, unknown>) => {
  return <AnimatedCarousel {...props} />;
};
