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
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!api || !autoPlay) {
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
  }, [api, current, autoPlay, autoPlayInterval]);

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
            {shouldReduceMotion ? title : <TextRoll>{title}</TextRoll>}
          </h2>

          <div className="relative">
            <Carousel setApi={setApi} opts={{ align: "start", loop: true }} className={`w-full ${carouselClassName}`}>
              <CarouselPrevious className="left-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-white/10 bg-[var(--void)] text-white hover:bg-white/5" />
              <CarouselNext className="right-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-white/10 bg-[var(--void)] text-white hover:bg-white/5" />

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
  { src: "https://cdn.simpleicons.org/react", alt: "React" },
  { src: "https://cdn.simpleicons.org/nextdotjs", alt: "Next.js" },
  { src: "https://cdn.simpleicons.org/vercel", alt: "Vercel" },
  { src: "https://cdn.simpleicons.org/typescript", alt: "TypeScript" },
  { src: "https://cdn.simpleicons.org/tailwindcss", alt: "Tailwind CSS" },
  { src: "https://cdn.simpleicons.org/threedotjs", alt: "Three.js" },
  { src: "https://cdn.simpleicons.org/github", alt: "GitHub" },
  { src: "https://cdn.simpleicons.org/figma", alt: "Figma" },
  { src: "https://cdn.simpleicons.org/python", alt: "Python" },
  { src: "https://cdn.simpleicons.org/nodedotjs", alt: "Node.js" },
  { src: "https://cdn.simpleicons.org/openai", alt: "OpenAI" },
  { src: "https://cdn.simpleicons.org/framer", alt: "Framer Motion" },
];

export const LogoCarousel = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[var(--void)]">
      <AnimatedCarousel
        title="Powering the Web"
        logos={partnerLogos}
        autoPlay={!shouldReduceMotion}
        autoPlayInterval={3500}
        itemsPerViewMobile={3}
        itemsPerViewDesktop={6}
        spacing="gap-12"
        padding="py-16 lg:py-24"
        containerClassName="text-white"
        titleClassName="text-white font-medium"
        logoContainerWidth="w-40"
        logoContainerHeight="h-20"
        logoImageWidth="w-auto"
        logoImageHeight="h-10"
      />
    </section>
  );
};

export const Case1 = (props: Record<string, unknown>) => {
  return <AnimatedCarousel {...props} />;
};
