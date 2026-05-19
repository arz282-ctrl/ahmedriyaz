'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CosmicAmbient from '@/components/ui/cosmic-ambient-dynamic';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = parallaxRef.current;
    if (!container) return;

    const triggerElement = container.querySelector('[data-parallax-layers]');
    if (!triggerElement) return;

    const isMobile = window.innerWidth < 768;

    const layers = isMobile
      ? [
          { layer: '1', yPercent: 50 },
          { layer: '2', yPercent: 40 },
          { layer: '3', yPercent: 30 },
          { layer: '4', yPercent: 8 },
        ]
      : [
          { layer: '1', yPercent: 70 },
          { layer: '2', yPercent: 55 },
          { layer: '3', yPercent: 40 },
          { layer: '4', yPercent: 10 },
        ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: '0% 0%',
        end: '100% 0%',
        scrub: 0,
      },
    });

    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: 'none',
        },
        idx === 0 ? undefined : '<'
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div className="relative bg-[#030608]" ref={parallaxRef}>
      <section className="relative h-[130vh] md:h-[150vh] w-full overflow-hidden">
        <div className="relative h-full w-full">

          <div data-parallax-layers className="absolute inset-0 h-full w-full">
            {/* Layer 1: Background */}
            <div
              data-parallax-layer="1"
              className="absolute -top-[25%] left-0 h-[150%] w-full"
            >
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp"
                loading="eager"
                alt="Mountain background layer"
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Layer 2: Midground */}
            <div
              data-parallax-layer="2"
              className="absolute -bottom-[25%] left-0 flex h-[130%] w-full items-end justify-center"
            >
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp"
                loading="eager"
                alt="Midground terrain layer"
                className="w-full min-h-full object-cover object-bottom"
              />
            </div>

            {/* Layer 3: Title */}
            <div
              data-parallax-layer="3"
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <h2 className="font-soul text-[clamp(3.5rem,14vw,10rem)] italic leading-none text-[#f7efe0] opacity-90 mix-blend-overlay drop-shadow-2xl">
                Breathe
              </h2>
            </div>

            {/* Layer 4: Foreground */}
            <div
              data-parallax-layer="4"
              className="absolute -bottom-[12%] left-0 z-20 flex w-full items-end justify-center"
            >
              <img
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp"
                loading="eager"
                alt="Foreground terrain layer"
                className="w-full translate-y-[8%] object-cover object-bottom"
              />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-36 md:h-48 bg-gradient-to-t from-[#030608] to-transparent" />
        </div>
      </section>

      <section className="relative flex items-center justify-center bg-[#030608] py-10 md:py-14">
        <CosmicAmbient tone="neural" starCount={35} dotCount={3} galaxyOpacity={0.04} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 160 160"
          fill="none"
          className="text-[rgba(200,200,210,0.2)] w-14 md:w-20"
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          />
        </svg>
      </section>
    </div>
  );
}
