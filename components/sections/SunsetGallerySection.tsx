'use client'

import Image from 'next/image'
import { VideoIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from '@/components/ui/animated-gallery'

const IMAGES_1 = [
  {
    src: '/beyond/arz-dreams/dream-1.png',
    alt: 'Low-light mirror portrait in a dark marble interior lit by a single warm strip light',
    label: '01',
  },
  {
    src: '/beyond/arz-dreams/dream-2.jpg',
    alt: 'Black and white studio portrait leaning against a bare wall in a "be original" sweatshirt',
    label: '02',
  },
  {
    src: '/beyond/arz-dreams/dream-3.png',
    alt: 'Black and white frame of a lone figure standing barefoot among bare winter branches',
    label: '03',
  },
]
const IMAGES_2 = [
  {
    src: '/beyond/arz-dreams/dream-4.mp4',
    sourceWebm: '/beyond/arz-dreams/dream-4.webm',
    poster: '/beyond/arz-dreams/dream-4-poster.jpg',
    alt: 'Sitting at the waterline watching waves break under an overcast sky',
    label: '04',
    type: 'video' as const,
  },
  {
    src: '/beyond/arz-dreams/dream-5.jpg',
    alt: 'Three figures spread across a harvested paddy field at dawn under a pale orange sky',
    label: '05',
  },
  {
    src: '/beyond/arz-dreams/dream-6.jpg',
    alt: 'Sitting on a roadside ledge above a green valley of mist-covered hills',
    label: '06',
  },
]
const IMAGES_3 = [
  {
    src: '/beyond/arz-dreams/dream-7.png',
    alt: 'Golden hour triptych — a mountain ridge, a walker in mist, and a figure in tall grass',
    label: '07',
  },
  {
    src: '/beyond/arz-dreams/dream-8.png',
    alt: 'Standing in a grove of tall areca palms with morning sun cutting between the trunks',
    label: '08',
  },
  {
    src: '/beyond/arz-dreams/dream-9.jpg',
    alt: 'Looking out from a balcony over treetops toward a turquoise sea',
    label: '09',
  },
]

interface FrameProps {
  src: string
  alt: string
  label: string
  aspect?: string
  priority?: boolean
  type?: 'image' | 'video'
  poster?: string
  sourceWebm?: string
}

function Frame({ src, alt, label, aspect = 'aspect-[4/5]', priority, type = 'image', poster, sourceWebm }: FrameProps) {
  return (
    <div className={`group relative ${aspect} block w-full overflow-hidden rounded-md border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.28)]`}>
      {type === 'video' ? (
        <video
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={alt}
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ filter: 'sepia(0.14) contrast(1.04) brightness(0.94) saturate(1.04)' }}
        >
          {sourceWebm ? <source src={sourceWebm} type="video/webm" /> : null}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 768px) 48vw, 92vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          style={{ filter: 'sepia(0.14) contrast(1.04) brightness(0.94) saturate(1.04)' }}
          priority={priority}
        />
      )}
      <span className="pointer-events-none absolute left-2 top-2 rounded-sm bg-black/45 px-2 py-0.5 font-code text-[10px] tracking-[0.3em] text-[#f5d99a] backdrop-blur-md">
        {label}
      </span>
    </div>
  )
}

export default function SunsetGallerySection() {
  return (
    <section id="gallery" className="relative bg-[#f7efe0]">
      <div className="pointer-events-none absolute inset-x-0 -top-12 z-[2] h-28 bg-[radial-gradient(100%_120%_at_50%_0%,rgba(255,214,145,0.36)_0%,rgba(245,166,35,0.12)_40%,transparent_82%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,246,0.35)_0%,rgba(247,236,215,0.24)_32%,rgba(230,198,151,0.3)_68%,rgba(156,102,42,0.28)_100%)]" />

      <div className="relative">
        <ContainerStagger className="relative z-[9999] -mb-12 place-self-center px-6 pt-16 text-center md:pt-20">
          <ContainerAnimated>
            <p className="font-code text-xs tracking-[0.3em] text-[#8a5a1e]/60">
              // ARZ DREAMS ARCHIVE
            </p>
          </ContainerAnimated>

          <ContainerAnimated>
            <h2 className="mt-3 font-soul text-4xl italic text-[#7a4a00] md:text-6xl">
              Frames From <span className="text-[#b86f1a]">Life</span>
            </h2>
          </ContainerAnimated>

          <ContainerAnimated className="my-4">
            <p className="font-code text-xs leading-relaxed tracking-[0.06em] text-[#7a5a34]/75 md:text-sm">
              A cinematic archive of personal frames, concepts, and visual explorations.
              <br className="hidden md:block" />
              Visuals 01 — 09, in numeric flow.
            </p>
          </ContainerAnimated>

          <ContainerAnimated className="flex items-center justify-center gap-2">
            <Button className="gap-1 bg-[#7a4a00] hover:bg-[#8b5604]">
              Explore visuals <VideoIcon className="size-4" />
            </Button>
            <Button variant="link" className="text-[#7a4a00]">
              About this archive
            </Button>
          </ContainerAnimated>
        </ContainerStagger>

        <div
          className="pointer-events-none absolute z-10 h-[70vh] w-full"
          style={{
            background:
              'linear-gradient(to right, rgba(122,74,0,0.22), rgba(245,166,35,0.28), rgba(88,56,24,0.18))',
            filter: 'blur(84px)',
            mixBlendMode: 'screen',
          }}
        />

        <ContainerScroll className="relative h-[350vh]">
          <ContainerSticky className="h-svh">
            <GalleryContainer className="mx-auto w-[94vw] max-w-7xl gap-3 p-2 md:gap-4 md:p-4">
              <GalleryCol yRange={['-10%', '2%']} className="-mt-2">
                {IMAGES_1.map((img, index) => (
                  <Frame
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    label={img.label}
                    aspect="aspect-[4/5]"
                    priority={index === 0}
                  />
                ))}
              </GalleryCol>

              <GalleryCol className="mt-[-50%]" yRange={['15%', '5%']}>
                {IMAGES_2.map((img) => (
                  <Frame
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    label={img.label}
                    aspect="aspect-video"
                    type={'type' in img ? img.type : 'image'}
                    poster={'poster' in img ? img.poster : undefined}
                    sourceWebm={'sourceWebm' in img ? img.sourceWebm : undefined}
                  />
                ))}
              </GalleryCol>

              <GalleryCol yRange={['-10%', '2%']} className="-mt-2">
                {IMAGES_3.map((img) => (
                  <Frame
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    label={img.label}
                    aspect="aspect-[4/5]"
                  />
                ))}
              </GalleryCol>
            </GalleryContainer>
          </ContainerSticky>
        </ContainerScroll>
      </div>
    </section>
  )
}
