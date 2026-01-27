import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '8px',
                    border: '1px solid #333',
                }}
            >
                <div style={{
                    background: 'linear-gradient(to bottom right, #6366f1, #a855f7)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontWeight: 'bold',
                    fontFamily: 'monospace'
                }}>
                    MZ
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}
