/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './MyLibrary.css'
import { getMyRecords, deleteRecordById } from '../../services/apiClientService'

export default function MyLibrary() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    async function fetchRecords() {
      try {
        const data = await getMyRecords()
        setRecords(data)
      } catch (error) {
        console.error('Error fetching records: ', error)
      }
    }
    fetchRecords()
  }, [])

  const handleDeletion = (id) => (e) => {
    try {
      e.preventDefault()
      deleteRecordById(id)
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }

  return (
    <div className="myLibraryContainer">
      <h1>My Previous Sightings</h1>
      <div className="entryContainer">
        {records.map((record) => (
          <div key={record.id} className="record">
            <p>Date: {record.date}</p>
            <p>Vernacular: {record.vernacular}</p>
            <p>SST: {record.sst}</p>
            <p>SSS: {record.sss}</p>
            <p>Shoredistance: {record.shoredistance}</p>
            <p>Depth: {record.depth}</p>
            <p>Count: {record.count}</p>
            <p>ImgUrl: {record.imgURL}</p>
            <p>Longitude: {record.longitude}</p>
            <p>Latitude: {record.latitude}</p>
            <p>Country: {record.country}</p>
            <p>Creation: {record.createdAt}</p>
            <button onClick={handleDeletion(record.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}
