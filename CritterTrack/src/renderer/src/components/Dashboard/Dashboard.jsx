import { useState } from 'react'
import AddRecord from '../AddRecord/AddRecord'
import Header from '../Header/Header'
import './dashboard.css'
import MyLibrary from '../MyLibrary/MyLibrary'
import Home from '../Home/Home'
import Settings from '../Settings/Settings'
import CritterSearch from '../CritterSearch/CritterSearch'
import Statistics from '../Statistics/Statistics'

export default function Dashboard() {
  const [viewState, setViewState] = useState('myHome')

  const handleComponentChange = (component) => {
    console.log(viewState)
    setViewState(component)
    console.log(component)
  }

  return (
    <div className="dashboardContainer">
      <Header onComponentChange={handleComponentChange} state={viewState} />
      {viewState == 'addRecord' && <AddRecord />}
      {viewState == 'myLibrary' && <MyLibrary />}
      {viewState == 'myHome' && <Home />}
      {viewState == 'settings' && <Settings />}
      {viewState == 'critterSearch' && <CritterSearch />}
      {viewState == 'stats' && <Statistics />}
      {viewState == 'crittersearch' && <CritterSearch />}
    </div>
  )
}
