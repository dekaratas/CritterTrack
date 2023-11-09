import { useState } from 'react'
import AddRecord from '../AddRecord/AddRecord'
import Header from '../Header/Header'
import './dashboard.css'
import MyLibrary from '../MyLibrary/MyLibrary'

export default function Dashboard() {
  const [viewState, setViewState] = useState('addRecord')

  const handleComponentChange = (component) => {
    setViewState(component)
  }

  return (
    <div className="dashboardContainer">
      <Header onComponentChange={handleComponentChange} />
      {viewState === 'addRecord' && <AddRecord />}
      {viewState === 'myLibrary' && <MyLibrary />}
    </div>
  )
}
