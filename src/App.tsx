import routes from '@/routes'
import { useRoutes } from 'react-router'
import '@/App.css'

function App() {
  const SetupRoutes = () => useRoutes(routes)
  return <SetupRoutes />
}

export default App
