import AddRecord from '../AddRecord/AddRecord'
import Header from '../Header/Header'
import './dashboard.css'

export default function Dashboard() {
  return (
    <div className="dashboardContainer">
      <Header />
      <AddRecord />
    </div>
  )
}
