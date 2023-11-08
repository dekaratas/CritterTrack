import './AddRecord.css'

export default function AddRecord() {
  return (
    <div className="addRecordContainer">
      <div className="addImage">Image</div>
      <div className="additionalInfo">
        <form>
          <label>
            Common Name:
            <input type="text" name="vernacular" />
          </label>
          <label>
            Sea Surface Salinity:
            <input type="number" step="any" name="sss" />
          </label>
          <label>
            Sea Surface Temperature:
            <input type="number" step="any" name="sst" />
          </label>
          <label>
            Date:
            <input type="date" name="date" />
          </label>
          <label>
            Shore Distance:
            <input type="number" name="shoredistance" />
          </label>
          <label>
            Depth:
            <input type="number" name="depth" />
          </label>
          <label>
            Count:
            <input type="number" name="count" />
          </label>
          <label>
            Image URL:
            <input type="text" name="imgURL" />
          </label>
          <label>
            Longitude:
            <input type="number" step="any" name="longitude" />
          </label>
          <label>
            Latitude:
            <input type="number" step="any" name="latitude" />
          </label>
          <label>
            Country:
            <input type="text" name="country" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
