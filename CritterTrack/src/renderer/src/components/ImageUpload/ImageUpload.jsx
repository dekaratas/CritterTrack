import addImage from '../../assets/icons8-image-file-add-64.png'
import './imageupload.css'

export default function ImageUpload() {
  return (
    <div className="image-upload-container">
      <h1 className="upload-instruct">Upload your image here!</h1>
      <button>
        <img src={addImage} alt="imageAdd" />
      </button>
    </div>
  )
}
