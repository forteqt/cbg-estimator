// app/layout.tsx
import { AuthProvider } from '@/components/AuthProvider'
import { Navbar } from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container mx-auto mt-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
