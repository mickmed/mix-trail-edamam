import React, {  } from "react"
// import CreateRecipe from "./CreateRecipe"
import "./CreateRecipeModal.scss"


const CreateRecipeModal = (props) => {
  const {

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
            value={input[val]}
            placeholder={val}
            onChange={(e) => onChange(e)}
            autoComplete='off'
          />  
        ))}

       
      </form>
    </div>
  )
}

export default CreateRecipeModal
