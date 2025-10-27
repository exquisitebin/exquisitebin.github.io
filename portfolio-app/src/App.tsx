import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'
import { Routes, Route } from 'react-router-dom'
import { NavigationTopBar } from '@/components/navigation-top-bar'
import Home from './pages/Home'
import Art from './pages/Art'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NavigationTopBar />
      <ModeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art" element={<Art />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
