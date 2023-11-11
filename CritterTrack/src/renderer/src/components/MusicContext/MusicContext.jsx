/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react'

const MusicContext = createContext()

//! Establish Music Context which is then provided to all components in App.jsx
// TODO: Fix bug of music overlaying when returning to Settings menu

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
