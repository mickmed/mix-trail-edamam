import React from "react"
import { Link } from 'react-router-dom'
import './Splash.scss'

const Splash = () => {
  return (
    <div className = 'splash'>
      
      <Link to='/recipes/new'><div className='home-banner'>Start calculating meal plans</div></Link>
      <Link to='/recipes'><div className='recipes-banner'>See your saved recipes</div></Link>
      <Link to='/about'><div className='learn-more-banner'>Learn more....</div></Link>
    </div>
  )
}

export default Splash
