/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const MusicContext = createContext()

export const MusicProvider = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev)
  }
  return (
    <MusicContext.Provider value={{ isMusicPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  return useContext(MusicContext)
}
