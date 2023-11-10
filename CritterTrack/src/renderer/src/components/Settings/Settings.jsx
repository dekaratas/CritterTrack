import './settings.css'
import { useMusic } from '../MusicContext/MusicContext'
import { useEffect } from 'react'
import oceanSound from '../../assets/ocean-waves-sounds.mp3'

export default function Settings() {
  const { isMusicPlaying, toggleMusic } = useMusic()

  useEffect(() => {
    const audio = new Audio(oceanSound)

    if (isMusicPlaying) {
      audio.play()
    } else {
      audio.pause()
    }

    return () => {
      console.log('We playin alright')
    }
  }, [isMusicPlaying])

  return (
    <div className="settingContainer">
      <h1>Configure your app</h1>
      <p>Music is {isMusicPlaying ? 'playing' : 'paused'}</p>
      <button onClick={toggleMusic}>Toggle Music</button>
    </div>
  )
}
