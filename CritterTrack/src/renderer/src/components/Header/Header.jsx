/* eslint-disable react/prop-types */
import './header.css'
import nauti from '../../assets/icons8-nautilus-50.png'

export default function Header({ onComponentChange }) {
  const handleButtonClick = (component) => {
    onComponentChange(component)
  }

  return (
    <div className="headerContainer">
      <div className="logo-container">
        <img src={nauti} alt="nauti" />
        <h1 className="logo">CritterTrack</h1>
      </div>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('myLibrary')}>
        <h1 className="library">My Library</h1>
      </button>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('critterSearch')}>
        <h1 className="search">CritterSearch</h1>
      </button>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('addRecord')}>
        <h1 className="addrecord">Add new Record</h1>
      </button>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('settings')}>
        <h1 className="settings">Settings</h1>
      </button>
    </div>
  )
}
