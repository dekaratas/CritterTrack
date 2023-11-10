import { useState } from 'react'
import splashImage from '../../assets/SplashScreen_Two/png/logo-no-background.png'
import './splashScreen.css'

export default function SplashScreen() {
  const [trigger, setTrigger] = useState(false)
  const [triggerFadeIn, setTriggerFadeIn] = useState(false)
  const [triggerFadeInButton, setTriggerFadeInButton] = useState(false)

  const moveSplashScreen = function () {
    setTrigger(true)
  }

  setTimeout(() => {
    setTriggerFadeIn(true)
  }, 2000)

  setTimeout(() => {
    setTriggerFadeInButton(true)
  }, 3500)

  return (
    <div className={trigger === true ? 'startScreen itsThere itsGone' : 'startScreen itsThere'}>
      <img
        src={splashImage}
        alt="sploochScreen"
        className={triggerFadeIn === true ? 'fade-in-element fade-in' : 'fade-in-element'}
      />
      <button
        className={
          triggerFadeInButton === true
            ? 'splashButton fade-in-element fade-in'
            : 'splashButton fade-in-element'
        }
        onClick={moveSplashScreen}
      >
        Start
      </button>
    </div>
  )
}

{
  /* <div class="startScreen" [ngClass]="{'itsThere': true, 'itsGone': triggerGone}">
    <img src="../../assets/logo-alt/png/logo-no-background.png" alt="myLogo" [ngClass]="{ 'fade-in-element': true, 'fade-in': triggerFadeIn}">
    <button class="splashButton" [ngClass]="{ 'fade-in-element': true, 'fade-in': triggerFadeInButton}" (click)="moveSplashScreen()">Start</button>
</div> */
}
