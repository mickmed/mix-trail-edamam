import React from 'react'

const Search = (props) => {
  const { handleChange, handleSubmit, search } = props
  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text'value={search} onChange={handleChange}></input>
        <button>submit</button>
      </form>
    </div>
  )
}

export default Search