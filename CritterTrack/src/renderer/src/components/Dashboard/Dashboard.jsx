import { useState } from 'react'
import AddRecord from '../AddRecord/AddRecord'
import Header from '../Header/Header'
import './dashboard.css'
import MyLibrary from '../MyLibrary/MyLibrary'

export default function Dashboard() {
  const [viewState, setViewState] = useState('addRecord')

  // TODO: Use handleComponentChange to delay the view change and slide the components in and out
  const handleComponentChange = (component) => {
    console.log(viewState)
    setViewState(component)
    console.log(component)
  }

  return (
    <div className="dashboardContainer">
      <Header onComponentChange={handleComponentChange} />
      <AddRecord viewState={viewState} />
      <MyLibrary viewState={viewState} />
    </div>
  )
}
