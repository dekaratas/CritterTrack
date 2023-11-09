import addImage from '../../assets/icons8-image-file-add-64.png'
import './imageupload.css'
import { useState } from 'react'

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('')
  async function onOpenFileClick() {
    const filePath = await window.electronAPI.openFile()
    setImageUrl(filePath)
  }

  return (
    <div className="image-upload-container">
      <h1 className="upload-instruct">Upload your image here!</h1>
      <button onClick={onOpenFileClick}>
        <img src={addImage} alt="imageAdd" />
        <p>{imageUrl}</p>
      </button>
    </div>
  )
}
