import './settings.css'
import { useMusic } from '../MusicContext/MusicContext'
import { useEffect } from 'react'
import oceanSound from '../../assets/ocean-waves-sounds.mp3'

// TODO: Current Bug: Audio keeps restarting/layering when revisiting the Settings component...Implement better State Management

export default function Settings() {
  const { isMusicPlaying, toggleMusic } = useMusic(false)

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

  const handleCheckboxChange = () => {
    console.log('togglingBG')
    toggleMusic(!isMusicPlaying)
  }

  return (
    <div className="settingContainer">
      <h1>Configure your app</h1>
      <form>
        <label htmlFor="bgSound">Enable soothing ocean sounds?</label>
        <input
          type="checkbox"
          id="bgSound"
          name="bgSound"
          checked={isMusicPlaying}
          onChange={handleCheckboxChange}
        />
      </form>
    </div>
  )
}
