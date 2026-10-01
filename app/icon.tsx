import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#040906',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#00ff66',
          borderRadius: 6,
          border: '1.5px solid #00ff66',
          fontWeight: 800,
          fontFamily: 'monospace',
        }}
      >
        &gt;_
      </div>
    ),
    {
      ...size,
    }
  );
}
