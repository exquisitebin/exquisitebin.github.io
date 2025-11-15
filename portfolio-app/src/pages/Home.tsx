import { useState } from 'react'
import { Button } from '@/components/ui/button'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl font-bold text-foreground mb-8">Vite + React</h1>
      
      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <Button 
          onClick={() => setCount((count) => count + 1)}
          className="mb-4"
        >
          count is {count}
        </Button>
        <p className="text-muted-foreground">
          Edit <code className="bg-muted px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="text-muted-foreground text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default Home
