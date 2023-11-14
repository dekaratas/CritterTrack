import './critterSearch.css'
import { useState, useEffect } from 'react'
import { getImage } from '../../services/imageUploadService'
import { getSpecWikiText } from '../../services/wikiApiService'
import fishMarker from '../../assets/icons8-fish-64.png'

export default function CritterSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [pageContent, setPageContent] = useState(null)
  const [wikiText, setWikiText] = useState(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)

  //! Check input and suggest terms
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`http://localhost:3001/species?search=${searchTerm}`)
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
      }
    }

    //! Fetch suggestions only if the search term is not empty
    if (searchTerm.trim() !== '') {
      fetchSuggestions()
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  //! Listen to every key stroke
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm('')
    setSuggestions([])
    setPageContent(suggestion)
    console.log(suggestion)
    //! Adjust wiki search query
    const formattedWikiSuggestion = convertToValidWikiQuery(suggestion)
    getWikiText(formattedWikiSuggestion)

    //! Adjust imgur search query
    const formattedImgurSuggestion = convertToValidImgurQuery(suggestion)
    getImgurImage(formattedImgurSuggestion)
  }

  //! Help formatting to adjust to wikipedia page
  const convertToValidWikiQuery = (suggestion) => {
    return suggestion.replace(/ /g, '_')
  }

  //! Help formatting to adjust to imgur search
  const convertToValidImgurQuery = (suggestion) => {
    return encodeURIComponent(suggestion)
  }

  //! Async function to get cleaned WikiText
  async function getWikiText(wikiQuery) {
    try {
      const textResult = await getSpecWikiText(
        `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${wikiQuery}`
      )
      let obj = textResult.data.query.pages
      let objKey = Object.keys(obj)
      let cleanedWikiText = removeHtmlTags(obj[objKey].extract)
      console.log(cleanedWikiText)
      setWikiText(cleanedWikiText)
    } catch (err) {
      console.error(err)
    }
  }

  //! Async function to get first Imgur image
  async function getImgurImage(imgurQuery) {
    try {
      const imageData = await getImage(`{${imgurQuery}}`)
      console.log('Le Image', imageData.data[0].images[0].link)
      const cleanedImageLink = imageData.data[0].images[0].link
      setImage(cleanedImageLink)
    } catch (err) {
      console.error(err)
    }
  }

  //! WikiText cleaner
  function removeHtmlTags(htmlString) {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, '')
  }

  return (
    <div className="searchContainer">
      <div className="searchInfo">
        <h1>Search for specific Species</h1>
        <input type="text" value={searchTerm} onChange={handleInputChange} />
        {suggestions.length > 0 && (
          <ul className="suggestionList">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {wikiText ? wikiText : 'Waiting for your selection!'}
      </div>
      <div className="critterInfo">
        <img src={image ? image : fishMarker} alt="searchImage" />
      </div>
    </div>
  )
}
