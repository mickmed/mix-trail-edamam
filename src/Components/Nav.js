import React from 'react'
import { Link } from 'react-router-dom'
import './nav.scss'
import Search from './Search.js'

const Nav = (props) => {
  const { handleChange, handleSubmit, search } = props
  return(
    <div className='nav'>
     
      <Search handleChange={handleChange} handleSubmit={handleSubmit} search={search}/>
    
    </div>
  )
}

export default Nav



