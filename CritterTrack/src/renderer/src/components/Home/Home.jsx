/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react'
import './Home.css'
import { getOccCount, getSpeciesCount } from '../../services/apiClientService'
import { getSpecWikiText } from '../../services/wikiApiService'
import { getImage } from '../../services/imageUploadService'

export default function Home() {
  const [occCount, setOccCount] = useState(null)
  const [speccsCount, setSpeccsCount] = useState(null)
  const [wikiText, setWikiText] = useState(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const occCountResult = await getOccCount()
        const speccsCountResult = await getSpeciesCount()
        const textResult = await getSpecWikiText(
          'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Whale_shark'
        )

        const imageData = await getImage(`{whale%20shark}`)
        console.log('Le Image', imageData.data[0].images[0].link)
        const imageSrc = await imageData.data[0].images[0].link
        setImage(imageSrc)

        let obj = textResult.data.query.pages
        let objKey = Object.keys(obj)
        let cleanedWikiText = removeHtmlTags(obj[objKey].extract)

        // Get Wiki Title normalized
        console.log('trying to get name: ', textResult.data.query.normalized[0].to)
        let wikiTitle = textResult.data.query.normalized[0].to
        setTitle(wikiTitle)

        setOccCount(occCountResult.data)
        setSpeccsCount(speccsCountResult.data)
        setWikiText(cleanedWikiText)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function removeHtmlTags(htmlString) {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, '')
  }

  return (
    <div className="homeContainer">
      <h1 id="welcome-header">Welcome Back!</h1>
      <div className="welcomeContainer">
        <div className="critterOfTheDayContainer">
          <h1>Critter of the Day - {title}</h1>
          <p>{wikiText}</p>
        </div>
        <div className="welcome-left">
          <h1>
            Database currently featuring:
            <br />
            {occCount} external entries containing
            <br />
            {speccsCount} unique species.
          </h1>
          <figure>
            <img src={image} alt="imgur" className="cotd-img" />
            <figcaption>Picture supplied by dadmonker @ imgur</figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
