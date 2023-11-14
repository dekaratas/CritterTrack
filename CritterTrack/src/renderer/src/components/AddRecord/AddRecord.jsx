/* eslint-disable react/prop-types */
import ImageUpload from '../ImageUpload/ImageUpload'
import addNewRecord from '../../services/apiClientService'
import './AddRecord.css'
import { useState } from 'react'
import { formatISO, parseISO, setSeconds, setMilliseconds } from 'date-fns'

// TODO: After creating a species table, have the input field suggest autocompletions

export default function AddRecord() {
  const initialInputs = [
    { id: 'vernacular', value: '', name: 'Species (Vernacular)', type: 'text' },
    { id: 'date', value: '', name: 'Date' },
    { id: 'sss', value: '', name: 'Sea Surface Salinity (g/kg)', type: 'number' },
    { id: 'sst', value: '', name: 'Sea Surface Temperature (°C)', type: 'number' },
    { id: 'shoredistance', value: '', name: 'Shore Distance (in m)', type: 'number' },
    { id: 'depth', value: '', name: 'Depth (in m)', type: 'number' },
    { id: 'count', value: '', name: 'Count', type: 'number' },
    { id: 'imgURL', value: '', name: 'Image URL' },
    { id: 'longitude', value: '', name: 'Longitude', type: 'number' },
    { id: 'latitude', value: '', name: 'Latitude', type: 'number' },
    { id: 'country', value: '', name: 'Country', type: 'text' }
  ]
  const [inputs, setInputs] = useState(initialInputs)

  const resetInputs = () => {
    setInputs(initialInputs)
  }

  const handleInputChange = (e, id) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value: e.target.value }
      }
      return input
    })
    setInputs(updatedInputs)
  }

  //! Handle change within ImageUpload component and fill url field automatically
  const handleImageChange = (url) => {
    console.log('handleImageChange is called', url)
    const updatedInputs = inputs.map((input) => {
      if (input.id === 'imgURL') {
        return { ...input, value: url }
      }
      return input
    })
    setInputs(updatedInputs)
  }

  //! Submit form and send to backend db
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Note: HTMLCollection aka form data is NOT an array...
    // Bloody behaves like one but regardless, have to turn it into array to map over it
    const formElementsArray = Array.from(e.target.elements)

    // Filter through all html elements within the form and only get the Input ones
    const inputFields = formElementsArray.filter((element) => element.tagName === 'INPUT')

    // Populate the data object and jump through major hoops to get properly ISO-8601 time format
    const data = {}
    inputFields.forEach((field) => {
      if (field.id === 'date') {
        const parsedDate = parseISO(field.value)
        const updatedDate = setSeconds(parsedDate, 0)
        const finalDate = setMilliseconds(updatedDate, 0)
        const formattedDate = formatISO(finalDate)
        data[field.id] = formattedDate
      } else {
        data[field.id] = field.value
      }
    })
    // Stringify my data to prepare it for sendoff
    const jsonData = JSON.stringify(data)
    console.log(jsonData)

    const resData = await addNewRecord(jsonData)

    if (resData) {
      console.log(resData)
      // Clearing all fields
      // TODO: Find a better method for success notifications
      resetInputs()
      alert('Great Success! Your new record was added! 🐬')
    }
  }

  return (
    <div className={'addRecordContainer'}>
      <ImageUpload onImageUpload={handleImageChange} />
      <div className="form-container">
        <form action="" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div className="input-container" key={input.id}>
              <input
                type={input.id === 'date' ? 'datetime-local' : input.type}
                id={input.id}
                required
                value={input.value || ''}
                onChange={(e) => handleInputChange(e, input.id)}
              />
              <label htmlFor={input.id} className={input.value ? 'float' : ''}>
                {input.name}
              </label>
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
