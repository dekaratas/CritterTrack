import './critterSearch.css'
import { useState, useEffect } from 'react'
import { getImage } from '../../services/imageUploadService'
import { getSpecWikiText } from '../../services/wikiApiService'

export default function CritterSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [pageContent, setPageContent] = useState('')
  const [wikiText, setWikiText] = useState(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)

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

    // Fetch suggestions only if the search term is not empty
    if (searchTerm.trim() !== '') {
      fetchSuggestions()
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm('')
    setSuggestions([])
    setPageContent(suggestion)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const textResult = await getSpecWikiText(
          `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Atlantic_sturgeon`
        )

        const imageData = await getImage(`{atlantic%20sturgeon}`)

        const imageSrc = await imageData.data[0].images[0].link
        setImage(imageSrc)

        let obj = textResult.data.query.pages
        let objKey = Object.keys(obj)
        let cleanedWikiText = removeHtmlTags(obj[objKey].extract)

        // Get Wiki Title normalized
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
    <div className="searchContainer">
      <div className="searchInfo">
        <h1>Here will be something grand...soon</h1>
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
      </div>
      <div className="critterInfo">
        <img src={image} alt="searchImage" />
      </div>
    </div>
  )
}
