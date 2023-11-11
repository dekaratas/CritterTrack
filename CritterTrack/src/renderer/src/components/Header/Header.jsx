/* eslint-disable react/prop-types */
import './header.css'
import nauti from '../../assets/icons8-nautilus-50.png'

export default function Header({ onComponentChange, state }) {
  const handleButtonClick = (component) => {
    onComponentChange(component)
  }

  const underlineStyle = (component) => ({
    textDecoration: state === component ? 'underline' : 'none'
  })

  const handleImageClick = () => {
    alert('Hi')
  }

  return (
    <div className="headerContainer">
      <div className="logo-container">
        <img src={nauti} alt="nauti" onClick={handleImageClick} id="nauti" />
        <button onClick={() => handleButtonClick('myHome')}>
          <h1 className="logo" style={underlineStyle('myHome')}>
            CritterTrack
          </h1>
        </button>
      </div>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('myLibrary')}>
        <h1 className="library" style={underlineStyle('myLibrary')}>
          My Library
        </h1>
      </button>
      <h1 className="separator">|</h1>
      <button>
        <h1 className="search">Critter Search</h1>
      </button>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('addRecord')}>
        <h1 className="addrecord" style={underlineStyle('addRecord')}>
          Add New Record
        </h1>
      </button>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('settings')}>
        <h1 className="settings" style={underlineStyle('settings')}>
          Settings
        </h1>
      </button>
      <h1 className="separator">|</h1>
      <button onClick={() => handleButtonClick('stats')}>
        <h1 className="stats" style={underlineStyle('stats')}>
          Statistics
        </h1>
      </button>
    </div>
  )
}
