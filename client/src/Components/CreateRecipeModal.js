import React, { useState, useEffect } from "react"
// import CreateRecipe from "./CreateRecipe"
import "./CreateRecipeModal.scss"
import axios from "axios"
import { set } from "mongoose"
import apiUrl from "./apiConfig"

const CreateRecipeModal = (props) => {
  const {
    setRenderModal,
    renderModal,
    items,
    setItem,
    nutrientVals,
    item,
    onChange,
    input
  } = props
  const inputValues = ["description", "imgURL", "category"]




  return (
    <div className="create-recipe-modal">
      <form>
        {inputValues.map((val, idx) => (
          <input
            key={idx}
            type="text"
            name={val}
            value={input[val] || item[val] || ''}
            placeholder={val}
            onChange={(e) => onChange(e)}
          />  
        ))}

       
      </form>
    </div>
  )
}

export default CreateRecipeModal
