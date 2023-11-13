/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-undef */
import { useState, useEffect } from 'react'
import './Home.css'
import { getOccCount, getSpeciesCount } from '../../services/apiClientService'
import { getSpecWikiText } from '../../services/wikiApiService'

export default function Home() {
  const [occCount, setOccCount] = useState(null)
  const [speccsCount, setSpeccsCount] = useState(null)
  const [wikiText, setWikiText] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const occCountResult = await getOccCount()
        console.log(occCountResult)
        const speccsCountResult = await getSpeciesCount()
        console.log(speccsCountResult)
        const textResult = await getSpecWikiText("https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Whale_shark")
        let obj = textResult.data.query.pages;
        console.log('myObjKeys', Object.keys(obj));
        let objKey = Object.keys(obj);
        console.log(objKey[0]);
        console.log('MyData', textResult.data.query.pages[objKey].extract)
        setWikiText(textResult.data.query.pages[objKey].extract);
        console.log("WikiText", wikiText);
        setOccCount(occCountResult.data)
        setSpeccsCount(speccsCountResult.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  //! Make async, will complain otherwise 
  // function removeHtmlTags(htmlString) {
  //   return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
  // }

  // const cleanedWikiText = removeHtmlTags(wikiText)

  return (
    <div className="homeContainer">
      <h1>Welcome Page(soon)</h1>
      <div className="welcomeContainer">
        <h1>
          Database currently featuring:
          <br />
          {occCount} external entries containing
          <br />
          {speccsCount} unique species.
        </h1>
        <div className="critterOfTheDayContainer">
          <h1>Critter of the Day</h1>
          <p>{wikiText}</p>
        </div>
      </div>
    </div>
  )
}
