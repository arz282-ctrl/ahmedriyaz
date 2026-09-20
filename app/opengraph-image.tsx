import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ahmed Riyaz — Full-Stack & AI Systems | ARZ.dev'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background:
            'radial-gradient(ellipse 80% 60% at 30% 30%, rgba(125,211,252,0.18) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 90%, rgba(245,166,35,0.08) 0%, transparent 55%),' +
            '#030608',
          color: '#e0e0e0',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 18,
            letterSpacing: '0.4em',
            color: '#7dd3fc',
            opacity: 0.9,
          }}
        >
          ARZ.DEV
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              fontStyle: 'italic',
              color: '#ffffff',
            }}
          >
            Ahmed Riyaz
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              letterSpacing: '0.18em',
              color: '#7dd3fc',
              textTransform: 'uppercase',
            }}
          >
            Founder · Product Systems · AI-Native Execution
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 16,
            color: 'rgba(224,224,224,0.45)',
            letterSpacing: '0.2em',
          }}
        >
          <span>RAREWARE_STUDIO // CEO</span>
          <span>arz-dev.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
