import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Recipes.scss'
import { Link } from 'react-router-dom'

const Recipes = (props) => { 
  const { recipes } = props

 

  return(
    <div className='recipes'>
      
      {recipes && recipes.map((recipe, idx)=>(
        <Link to={`/recipes/${recipe._id}`}key={idx} ><div className='recipe-name'>{recipe.name}</div></Link>
      ))}
    </div>
  )
}


export default Recipes