/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import './MyLibrary.css'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect, useRef } from 'react'
import { getMyRecords, deleteRecordById } from '../../services/apiClientService'
import sortRecordsByDate from '../../Utils/recordDateSorter'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet'
import { Icon } from 'leaflet'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ImageFilter from 'react-image-filter'
import fishMarker from '../../assets/icons8-fish-64.png'

function SetViewOnClick({ animateRef }) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current || false
    })
  })

  return null
}

// Map component receiving all records including the positional data
//! Latitude (North/South) first
// TODO: Automatically scroll to the record entry when map marker is selected
function Map({ records }) {
  const animateRef = useRef(true)

  const customIcon = new Icon({
    iconUrl: fishMarker,
    iconSize: [38, 38]
  })

  function getArticle(vernacularName) {
    const vowels = ['a', 'e', 'i', 'o', 'u']

    // Convert the vernacularName to lowercase for easier comparison
    const firstLetter = vernacularName.toLowerCase()[0]
    console.log(firstLetter)

    return vowels.includes(firstLetter) ? 'An' : 'A'
  }

  return (
    <MapContainer center={[-23.0322, 113.715]} zoom={3} scrollWheelZoom={false}>
      <TileLayer url="https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg" />
      <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png" />
      {records.map((marker) => (
        <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon}>
          <Popup>
            {`${getArticle(marker.vernacular)} ${marker.vernacular} sighting from ${marker.date}`}
          </Popup>
        </Marker>
      ))}
      <SetViewOnClick animateRef={animateRef} />
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

  // Very Wet code but I'm rushing to the finish line here
  function getArticle(vernacularName) {
    const vowels = ['a', 'e', 'i', 'o', 'u']

    // Convert the vernacularName to lowercase for easier comparison
    const firstLetter = vernacularName.toLowerCase()[0]
    console.log(firstLetter)

    return vowels.includes(firstLetter) ? 'An' : 'A'
  }

  // TODO: Sort out the somewhat messed up CSS (due to ImageFilter)
  // TODO: Sort out the wave svg because the element is bigger than the actual waves blocking interaction with content
  return (
    <div className="record">
      <div className="data">
        <div
          className="imgContainer"
          onMouseEnter={() => setImageFilter(undefined)}
          onMouseLeave={() => setImageFilter('grayscale')}
        >
          <ImageFilter image={record.imgURL} alt="leImage" filter={imageFilter} />
        </div>
        <div className="cardShort">
          <p className="cardText">
            {`${getArticle(record.vernacular)} ${record.vernacular}`} photographed <br /> in{' '}
            {record.country} on <br />
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
