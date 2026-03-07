import type { Metadata, Viewport } from 'next'
import { ZCOOL_KuaiLe } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const zcoolKuaiLe = ZCOOL_KuaiLe({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cute',
});

export const metadata: Metadata = {
  title: '清风日历 - 简洁的日历应用',
  description: '一款极简清新的日历应用，支持公历、农历、节气显示，深色/浅色主题切换',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fce7f3' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1f1f' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${zcoolKuaiLe.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
