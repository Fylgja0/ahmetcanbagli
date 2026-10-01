import { ImageResponse } from 'next/og';

export const alt = 'Ahmetcan Bağlı - Big Data Analytics Student & Software Developer Candidate';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#040906',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(0, 255, 102, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(0, 255, 102, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          fontFamily: 'monospace',
          border: '2px solid rgba(0, 255, 102, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#00ff66',
              boxShadow: '0 0 12px #00ff66',
            }}
          />
          <span style={{ color: '#00ff66', fontSize: '24px', fontWeight: 'bold' }}>
            $ ahmetcan.dev
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Ahmetcan Bağlı
          </div>
          <div style={{ color: '#00ff66', fontSize: '32px', fontWeight: 600 }}>
            Software Developer Candidate · Big Data Analytics
          </div>
          <div style={{ color: '#86efac', fontSize: '24px', opacity: 0.85 }}>
            Manisa Celal Bayar University · C# · .NET 10 · SQL Server · Python Data Science
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(0, 255, 102, 0.25)',
            paddingTop: '24px',
            color: '#a7f3d0',
            fontSize: '20px',
          }}
        >
          <span>https://ahmetcanbagli.dev</span>
          <span>github.com/Fylgja0 · linkedin.com/in/ahmetcanbagli</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
