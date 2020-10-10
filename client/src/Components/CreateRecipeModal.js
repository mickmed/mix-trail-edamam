import React, { useState } from "react"
import CreateRecipe from "./CreateRecipe"
import "./CreateRecipeModal.scss"
import axios from "axios"

const CreateRecipeModal = (props) => {
  const {setRenderModal, items } = props
  const inputValues = ["name", "description", "imgURL", "category"]

  const [value, setValue] = useState({
    name: "",
    description: "",
    imgURL: "",
    category: "",
  })

  const handleChange = (e, val) => {
    console.log("here", e.target.value, val)
    setValue({ ...value, [val]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setRenderModal(false)
    const body = { ...value, items: items }
    console.log(value, items, body)

    const resp = await axios.post("http://localhost:3000/api/recipes", body)
    console.log(resp)
  }
  return (
    <div className="create-recipe-modal">
      <form>
        {inputValues.map((val) => (
          <input
            type="text"
            name="name"
            value={value[val]}
            placeholder={val}
            onChange={(e) => handleChange(e, val)}
          />
        ))}

        <div className="create-buttons">
          <button>cancel</button>
          <button onClick={handleSubmit}>save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipeModal
