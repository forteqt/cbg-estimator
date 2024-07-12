// File: components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const { user } = useAuth()
  const pathname = usePathname()

  if (!user) return null

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/takeoff', label: 'Takeoff' },
    { path: '/estimates', label: 'Estimates' },
    { path: '/reports', label: 'Reports' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <aside className="bg-gray-200 w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block p-2 rounded transition duration-200 ease-in-out
                  ${isActive(item.path)
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-300'
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar