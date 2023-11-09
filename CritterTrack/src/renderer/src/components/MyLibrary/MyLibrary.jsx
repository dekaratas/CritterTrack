/* eslint-disable react/prop-types */
import './MyLibrary.css'

export default function MyLibrary({ viewState }) {
  return (
    <div
      className={
        viewState === 'myLibrary'
          ? 'myLibraryContainer itsThere'
          : 'myLibraryContainer itsThere itsGone'
      }
    ></div>
  )
}
