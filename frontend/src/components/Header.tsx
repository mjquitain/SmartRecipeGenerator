import { ActionIcon, Box, Flex, Group, Text, Title } from '@mantine/core'
import { Link, useNavigate } from '@tanstack/react-router'
import { Bell, ChefHat, Home, LogOut, Menu, User, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?')
    if (confirmed) {
      setIsOpen(false)
      navigate({ to: '/login' })
    }
  }

  return (
    <>
      <header className="p-4 flex items-center shadow-lg border-b" style={{ borderColor: '#8a9a7b', }}>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-black rounded-lg hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <Box style={{ display: 'flex', justifyContent: 'space-between', width: '100%', }}>
          <Group ml={'16px'} >
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
          <Flex direction="row" justify='flex-end' mr={"16px"} gap={"lg"} align={"center"}>
            <Link to="/notification">
              <ActionIcon variant="transparent" aria-label='Notification'>
                <Bell size={32} color="#8a9a7b" />
              </ActionIcon>
            </Link>
            <Link to="/profile">
              <ActionIcon variant="transparent" aria-label='Settings'>
                <User size={32} color="#8a9a7b" />
              </ActionIcon>
            </Link>
          </Flex>
        </Box>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ backgroundColor: '#8a9a7b' }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white">
          <h2 className="text-xl font-bold text-white">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-black rounded-lg transition-colors text-white"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-green-100 hover:text-black transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-white transition-colors mb-2',
              style: { color: 'black' }
            }}
          >
            <Home size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/ingredients"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-green-100 hover:text-black transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-white transition-colors mb-2',
              style: { color: 'black' }
            }}
          >
            <Home size={20} />
            <span className="font-medium">My Ingredients</span>
          </Link>

          <Link
            to="/recipe"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-green-100 hover:text-black transition-colors mb-2"
            activeProps={{
              className:
                'flex items-center gap-3 p-3 rounded-lg bg-white transition-colors mb-2',
              style: { color: 'black' }
            }}
          >
            <Home size={20} />
            <span className="font-medium">Recipe</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-green-100 hover:text-black transition-colors w-full text-left"
          >
            <LogOut size={20} />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
