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
      <h1 className="settingHeader">Configure your app</h1>
      <form>
        <div className="settingField">
          <label htmlFor="bgSound">Enable soothing ocean sounds?</label>
          <input
            type="checkbox"
            id="bgSound"
            name="bgSound"
            checked={isMusicPlaying}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className="settingField nameInput">
          <label htmlFor="username">Enter your Name:</label>
          <input type="text" id="username" name="username" placeholder="Your Name..." />
        </div>
        <div className="settingField">
          <button id="deleteRecords" name="deleteRecords">
            Delete all personal records?
          </button>
        </div>
      </form>
    </div>
  )
}
