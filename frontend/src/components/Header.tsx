import { Group, Text, Title } from '@mantine/core'
import { Link } from '@tanstack/react-router'
import { ChefHat, Home, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <header className="p-4 flex items-center shadow-lg border-b border-gray-700">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-green-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4">
          <Group justify="space-between">
            <Group>
              <ChefHat size={32} color="#8a9a7b" />
              <div>
                <Title order={2} style={{ color: '#2d3319', marginBottom: 0 }}>
                  Smart Recipe Generator
                </Title>
                <Text size="sm" c="dimmed" style={{ color: '#5a6b4f' }}>
                  Reduce food waste, one recipe at a time
                </Text>
              </div>
            </Group>
          </Group>
        </h1>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-green-200 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-green-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-green-300 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-green-300 transition-colors mb-2',
            }}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
        </nav>
      </aside>
    </>
  )
}
