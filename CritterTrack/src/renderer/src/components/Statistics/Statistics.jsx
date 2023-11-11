import './stats.css'
import { VictoryChart, VictoryHistogram } from 'victory'

// Experimenting with Victory library

export default function Statistics() {
  return (
    <div className="statContainer">
      <h1>Customizable Stats and Graphs go here</h1>
      <VictoryChart domainPadding={10}>
        <VictoryHistogram
          style={{ data: { fill: '#c43a31' } }}
          data={[{ x: 1 }, { x: 2 }, { x: 2 }, { x: 4 }, { x: 4 }, { x: 5 }]}
        />
      </VictoryChart>
    </div>
  )
}
