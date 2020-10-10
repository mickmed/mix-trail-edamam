import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Recipes = () => { 
  const [recipes, setRecipes] = useState([])

  useEffect(()=>{
    const getRecipes = async() => {
      const resp = await axios.get('http://localhost:3000/api/recipes')
      console.log(resp)
      setRecipes(resp)
    }
    getRecipes()
  },[])

  return(
    <div>
      Recipes
    </div>
  )
}


export default Recipes