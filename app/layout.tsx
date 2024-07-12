// File: app/layout.tsx

import { AuthProvider } from '@/components/auth/AuthProvider'
import AppContent from '@/components/generic/AppContent'
import '@/styles/globals.css'
import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Providers>
            <AppContent>{children}</AppContent>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}