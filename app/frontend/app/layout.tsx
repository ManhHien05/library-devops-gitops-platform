import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shelf — Thư viện sách cộng đồng',
  description: 'Khám phá, đọc trực tuyến và chia sẻ những cuốn sách hay cùng cộng đồng Shelf.',
  applicationName: 'Shelf',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101a19',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
