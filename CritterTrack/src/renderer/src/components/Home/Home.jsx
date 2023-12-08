/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react'
import './Home.css'
import { getSpecWikiText } from '../../services/wikiApiService'
import { getImage } from '../../services/imageUploadService'

export default function Home() {
  const [wikiText, setWikiText] = useState(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const textResult = await getSpecWikiText(
          'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Whale_shark'
        )

        const imageData = await getImage(`{whale%20shark}`)
        console.log('Le Image', imageData.data[0].account_url)
        const imageSrc = await imageData.data[0].images[0].link
        setImage(imageSrc)

        let obj = textResult.data.query.pages
        let objKey = Object.keys(obj)
        let cleanedWikiText = removeHtmlTags(obj[objKey].extract)

        console.log('trying to get name: ', textResult.data.query.normalized[0].to)
        let wikiTitle = textResult.data.query.normalized[0].to
        setTitle(wikiTitle)

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
      <h1 id="welcome-header">Good evening, Anon!</h1>
      <div className="welcomeContainer">
        <div className="critterOfTheDayContainer">
          <h1>Critter of the Day - {title}</h1>
          <p>{wikiText}</p>
        </div>
        <div className="welcome-left">
          <figure>
            <img src={image} alt="imgur" className="cotd-img" />
            <figcaption>Picture supplied by dadmonker @ imgur</figcaption>
          </figure>
        </div>
      </div>
    </div>
  )
}
