import React from 'react'

const Search = (props) => {
  const { handleChange, handleSubmit, searchString } = props
  return(
    <div className='search-form'>
      <form>
        <input type='text'value={searchString} onChange={handleChange}></input>
      
      </form>
    </div>
  )
}

export default Search