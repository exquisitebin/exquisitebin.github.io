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

        {/* Top bar with Portfolio title, navigation, and theme toggle */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
          <div className="container mx-auto flex h-14 items-center justify-between">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-foreground">TRISTAN CLARK</h1>
              </div>
              <div className="flex items-center">
                <NavigationTopBar />
              </div>
            </div>
            <div className="flex items-center">
              <ModeToggle />
            </div>
          </div>
        </header>
        
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
