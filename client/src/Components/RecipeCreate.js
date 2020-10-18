import React from 'react'
import { Link } from 'react-router-dom'
import './RecipeCreate.scss'


const RecipeCreate = () => {
  return(
    <Link to='/recipes/new' className='recipe-create'>New Recipe</Link>
  )
}

export default RecipeCreate