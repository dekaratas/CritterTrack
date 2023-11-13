import './stats.css'
import { VictoryChart, VictoryHistogram, VictoryPie } from 'victory'

// Experimenting with Victory library

export default function Statistics() {
  return (
    <div className="statContainer">
      <h1>Customizable Stats and Graphs go here</h1>
      <VictoryPie
        data={[
          { x: 'Cats', y: 35 },
          { x: 'Dogs', y: 40 },
          { x: 'Birds', y: 55 }
        ]}
      />
    </div>
  )
}
