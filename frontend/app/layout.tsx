import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EPAM Corporate PR Agent',
  description: 'AI-powered Corporate PR Agent for EPAM Social Media Growth',
  generator: 'EPAM Corporate PR Team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
