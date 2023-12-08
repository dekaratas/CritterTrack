/* eslint-disable react/prop-types */
import ImageUpload from '../ImageUpload/ImageUpload'
import addNewRecord from '../../services/apiClientService'
import './AddRecord.css'
import { useState } from 'react'
import { formatISO, parseISO, setSeconds, setMilliseconds } from 'date-fns'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formElementsArray = Array.from(e.target.elements)

    const inputFields = formElementsArray.filter((element) => element.tagName === 'INPUT')

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

    const jsonData = JSON.stringify(data)
    console.log(jsonData)

    const resData = await addNewRecord(jsonData)

    if (resData) {
      console.log(resData)
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
