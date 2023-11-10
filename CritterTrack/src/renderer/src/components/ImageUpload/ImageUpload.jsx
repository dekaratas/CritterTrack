/* eslint-disable react/prop-types */
import addImage from '../../assets/icons8-image-file-add-64.png'
import './imageupload.css'
import { useState } from 'react'
import uploadImage from '../../services/imageUploadService'
import convertImageToBase64 from '../../Utils/imageConverter'
import arrowUp from '../../assets/icons8-chevron-up-24.png'
import arrowDown from '../../assets/icons8-chevron-down-24.png'

//! Image Upload does only work on Preview Server, not Dev Server

export default function ImageUpload({ onImageUpload }) {
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
    try {
      console.log(imageUrl)
      const formattedBase64Image = imageUrl.split(',')[1]
      const formData = new FormData()
      formData.append('image', formattedBase64Image)
      formData.append('type', 'base64')

      const resData = await uploadImage(formData)
      console.log('Great success: ', resData.data.link)
      onImageUpload(resData.data.link)
    } catch (err) {
      console.error('Error uploading: ', err)
    }
  }

  return (
    <div className="image-upload-container">
      <button onClick={onOpenFileClick}>
        <img src={imageUrl ? imageUrl : addImage} alt="imageAdd" />
      </button>
      <img src={arrowUp} alt="arrowup" className="arrow" id="arrUp" />
      <h1 className="upload-instruct">
        1. Select your image!
        <br />
        2. Upload it to imgur!
      </h1>
      <img src={arrowDown} alt="arrowdown" className="arrow" id="arrDown" />
      <button onClick={handleUpload} className="upload-btn">
        Upload
      </button>
    </div>
  )
}
