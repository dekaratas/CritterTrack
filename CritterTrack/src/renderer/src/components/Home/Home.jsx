/* eslint-disable react/jsx-no-undef */
import { useState } from 'react'
import './Home.css'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'

const MagicComponent = () => {
  const [hidden, setHidden] = useState(false)

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.button
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setHidden(true)}
        >
          Click to hide
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  return (
    <div className="homeContainer">
      <h1>Welcome Back</h1>
      <MagicComponent />
    </div>
  )
}
