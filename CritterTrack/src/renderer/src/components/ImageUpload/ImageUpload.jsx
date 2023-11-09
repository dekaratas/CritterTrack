import addImage from '../../assets/icons8-image-file-add-64.png'
import './imageupload.css'
import { useState } from 'react'
import uploadImage from '../../services/imageUploadService'
import convertImageToBase64 from '../../Utils/imageConverter'

// TODO: Fix image mess when cancelling the image selection

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState('')

  const onOpenFileClick = async () => {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'image/*'
    fileInput.onchange = async (e) => {
      const file = e.target.files[0]
      if (file) {
        const base64Image = await convertImageToBase64(file)
        setImageUrl(base64Image)
        console.log(base64Image)
      }
    }
    fileInput.click()
  }

  async function handleUpload() {
    console.log(imageUrl)
    const formattedBase64Image = imageUrl.split(',')[1]
    const formData = new FormData()
    formData.append('image', formattedBase64Image)
    formData.append('type', 'base64')

    await uploadImage(formData)
  }

  return (
    <div className="image-upload-container">
      <button onClick={onOpenFileClick}>
        <img src={imageUrl ? imageUrl : addImage} alt="imageAdd" />
      </button>
      <h1 className="upload-instruct">Select your image here!</h1>
      <button onClick={handleUpload}>Upload to imgur!</button>
    </div>
  )
}
