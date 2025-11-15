import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Routes, Route } from 'react-router-dom'
import { NavigationTopBar } from '@/components/navigation-top-bar'
import Home from './pages/Home'
import Art from './pages/Art'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="fixed top-3 left-3 z-50">
          <NavigationTopBar />
        </div>
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        
        {/* Main content area */}
        <main className="container mx-auto max-w-6xl px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/art" element={<Art />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
