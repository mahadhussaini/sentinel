import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navigation from '@/components/Navigation'
import { NotificationProvider } from '@/contexts/NotificationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sentinel - Cybersecurity Guardian',
  description: 'AI-powered cybersecurity monitoring and threat detection system',
  icons: {
    icon: './logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-cyber-black text-white min-h-screen`}>
        <NotificationProvider>
          <div className="flex h-screen bg-gradient-to-br from-cyber-black via-cyber-dark to-cyber-gray-100">
            <Navigation />
            <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6 xl:p-8">
              {children}
            </main>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #2a2a2a',
                fontSize: '14px',
                maxWidth: '90vw',
              },
            }}
          />
        </NotificationProvider>
      </body>
    </html>
  )
}
