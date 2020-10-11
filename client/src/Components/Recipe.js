import React from 'react'
import { useParams } from 'react-router-dom'


const Recipe = () => {
  const { id } = useParams()
  return(
    <div>
      Recipes
    </div>
  )
}


export default Recipe