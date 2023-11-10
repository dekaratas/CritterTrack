/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './MyLibrary.css'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { getMyRecords, deleteRecordById } from '../../services/apiClientService'
import sortRecordsByDate from '../../Utils/recordDateSorter'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ImageFilter from 'react-image-filter'

// Map component receiving all records including the positional data
//! Latitude (North/South) first
// TODO: Fix issue of markers being displayed twice bc of the two tile layers presumably (GridLayer would be better?)
// TODO: Here as well, fix issue of A/An (maybe util function?)
// TODO: Automatically scroll to the record entry when map marker is selected
function Map({ records }) {
  return (
    <MapContainer center={[-23.0322, 113.715]} zoom={3}>
      <TileLayer url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg" />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" />
      {records.map((marker) => (
        <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
          <Popup>
            A {marker.vernacular} sighting from {marker.date}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

function Entry({ record, onDelete }) {
  const [imageFilter, setImageFilter] = useState('grayscale')
  const formattedDate = format(new Date(record.date), "do 'of' MMMM yyyy")

  // Delete a personal record
  const handleDeletion = () => {
    onDelete(record.id)
  }

  //TODO: For polish, in cardText, change A/An dynamically

  return (
    <div className="record">
      <div className="data">
        <div className="imgContainer">
          {/* <img src={record.imgURL} alt="leNature"></img> */}
          <ImageFilter image={record.imgURL} alt="leImage" filter={imageFilter} />
        </div>
        {/* Available data 
        <p>Date: {record.date}</p>
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
        <div className="cardShort">
          <p className="cardText">
            A {record.vernacular} photographed <br /> in {record.country} on <br />
            the {formattedDate}.
          </p>
        </div>
      </div>
      <button onClick={handleDeletion} className="rmvRecordBtn" title="Delete record permanently?">
        X
      </button>
    </div>
  )
}

//* DEFAULT EXPORT
export default function MyLibrary() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    async function fetchRecords() {
      try {
        const data = await getMyRecords()
        const sortedRecords = sortRecordsByDate(data)
        setRecords(sortedRecords)
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
      const sortedRecords = sortRecordsByDate(data)
      setRecords(sortedRecords)
    } catch (error) {
      console.error('Error deleting record:', error)
    }
  }
  //TODO: Polish the dragging idea/feature, bit crude rn
  return (
    <div className="myLibraryContainer">
      <Map records={records} />
      <motion.div className="entryContainer" drag="x">
        {records.map((record) => (
          <Entry key={record.id} record={record} onDelete={handleDeletion} />
        ))}
      </motion.div>
    </div>
  )
}
