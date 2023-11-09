import './header.css'

export default function Header() {
  return (
    <div className="headerContainer">
      <h1 className="logo">CritterTrack</h1>
      <h1 className="separator">|</h1>
      <button>
        <h1 className="library">My Library</h1>
      </button>
      <h1 className="separator">|</h1>
      <button>
        <h1 className="search">CritterSearch</h1>
      </button>
      <h1 className="separator">|</h1>
      <button>
        <h1 className="addrecord">Add new Record</h1>
      </button>
      <h1 className="separator">|</h1>
      <button>
        <h1 className="settings">Settings</h1>
      </button>
    </div>
  )
}
