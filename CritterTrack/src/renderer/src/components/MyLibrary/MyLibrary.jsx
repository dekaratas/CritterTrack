/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './MyLibrary.css'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { getMyRecords, deleteRecordById } from '../../services/apiClientService'
import { MapContainer, TileLayer } from 'react-leaflet'

// Latitude (North/South) first
function Map() {
  return (
    <MapContainer center={[-23.0322, 113.715]} zoom={3}>
      <TileLayer url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg" />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" />
    </MapContainer>
  )
}

function Entry({ record, onDelete }) {
  const handleDeletion = () => {
    onDelete(record.id)
  }

  return (
    <div className="record">
      <div className="data">
        <div className="imgContainer">
          <img src={record.imgURL} alt="leNature"></img>
        </div>
        {/* <p>Date: {record.date}</p>
        <p>Vernacular: {record.vernacular}</p>
        <p>Country: {record.country}</p>
        <p>SST: {record.sst}</p>
        <p>SSS: {record.sss}</p>
        <p>Shoredistance: {record.shoredistance}</p>
        <p>Depth: {record.depth}</p>
        <p>Count: {record.count}</p>
        <p>Longitude: {record.longitude}</p>
        <p>Latitude: {record.latitude}</p>
        <p>Creation: {record.createdAt}</p> */}
      </div>
      <button onClick={handleDeletion}>X</button>
    </div>
  )
}

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

  const handleDeletion = async (id) => async (e) => {
    try {
      e.preventDefault()
      deleteRecordById(id)
      const data = await getMyRecords()
      setRecords(data)
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }

  return (
    <div className="myLibraryContainer">
      <h1>My Records</h1>
      <Map />
      <div className="entryContainer">
        {records.map((record) => (
          <Entry key={record.id} record={record} onDelete={handleDeletion} />
        ))}
      </div>
    </div>
  )
}
