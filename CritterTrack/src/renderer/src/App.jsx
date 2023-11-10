import Dashboard from './components/Dashboard/Dashboard'
import SplashScreen from './components/SplashScreen/SplashScreen'
import { MusicProvider } from './components/MusicContext/MusicContext'

function App() {
  return (
    <MusicProvider>
      <SplashScreen />
      <Dashboard />
    </MusicProvider>
  )
}

export default App
