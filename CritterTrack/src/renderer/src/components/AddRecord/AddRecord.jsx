import ImageUpload from '../ImageUpload/ImageUpload'
import './AddRecord.css'
import { useState } from 'react'

// TODO: After creating a species table, have the input field suggest autocompletions
// TODO: Adjust the input types accordingly
// TODO: Try to do something about the Date label blocking the mm/dd/yyyy, looks a wee bit ugly

export default function AddRecord() {
  const [inputs, setInputs] = useState([
    { id: 'vernacular', value: '', name: 'Species (Vernacular)*' },
    { id: 'date', value: '', name: 'Date*' },
    { id: 'sss', value: '', name: 'Sea Surface Salinity' },
    { id: 'sst', value: '', name: 'Sea Surface Temperature' },
    { id: 'shoredistance', value: '', name: 'Shore Distance' },
    { id: 'depth', value: '', name: 'Depth' },
    { id: 'count', value: '', name: 'Count' },
    { id: 'imgURL', value: '', name: 'Image URL' },
    { id: 'longitude', value: '', name: 'Longitude' },
    { id: 'latitude', value: '', name: 'Latitude' },
    { id: 'country', value: '', name: 'Country' }
  ])

  const handleInputChange = (e, id) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value: e.target.value }
      }
      return input
    })
    setInputs(updatedInputs)
  }

  return (
    <div className="addRecordContainer">
      <ImageUpload />
      <div className="form-container">
        <form action="">
          {inputs.map((input) => (
            <div className="input-container" key={input.id}>
              <input
                type={input.id === 'date' ? 'date' : 'text'}
                id={input.id}
                required
                value={input.value}
                onChange={(e) => handleInputChange(e, input.id)}
              />
              <label htmlFor={input.id} className={input.value ? 'float' : ''}>
                {input.name}
              </label>
            </div>
          ))}
        </form>
      </div>
    </div>
  )
}

//   <label>
//   Sea Surface Salinity:
//   <input type="number" step="any" name="sss" />
// </label>
// <label>
//   Sea Surface Temperature:
//   <input type="number" step="any" name="sst" />
// </label>
// <label>
//   Date:
//   <input type="date" name="date" />
// </label>
// <label>
//   Shore Distance:
//   <input type="number" name="shoredistance" />
// </label>
// <label>
//   Depth:
//   <input type="number" name="depth" />
// </label>
// <label>
//   Count:
//   <input type="number" name="count" />
// </label>
// <label>
//   Image URL:
//   <input type="text" name="imgURL" />
// </label>
// <label>
//   Longitude:
//   <input type="number" step="any" name="longitude" />
// </label>
// <label>
//   Latitude:
//   <input type="number" step="any" name="latitude" />
// </label>
// <label>
//   Country:
//   <input type="text" name="country" />
// </label>
