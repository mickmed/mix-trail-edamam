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
  const inputValues = ["name", "description", "imgURL", "category"]

  const [value, setValue] = useState({
    name: "",
    description: "",
    imgURL: "",
    category: "",
  })

  useEffect(() => {
    console.log(item)
    setValue({
      ...value,
      name: item.name,
      description: item.description,
      imgURL: item.imgURL,
      category: item.category,
    })
  }, [renderModal])

  // const handleChange = (e, val) => {
  //   // console.log('e.target.value', e.target.value, val)
  //   setValue({ ...value, [val]: e.target.value })
  // }

  const handleSubmit = async (e) => {
    console.log("submit")
    e.preventDefault()
    setRenderModal(false)
    const body = { ...value, ingredients: items, nutrientVals: nutrientVals }
    console.log(value, items, body)

    const resp = await axios.post(`${apiUrl}/recipes`, body)
    console.log(resp)
    setItem(resp.data)
  }

  const handleUpdate = async (e) => {
    console.log("update", items)
    e.preventDefault()
    setRenderModal(false)
    const body = { ...value, ingredients: items, nutrientVals: nutrientVals }
    console.log(value, items, body)

    const resp = await axios.put(`${apiUrl}/recipes/${item._id}`, body)
    console.log(resp)
    setItem(resp.data)
  }
  return (
    <div className="create-recipe-modal">
      <form onSubmit={props.item.length !== 0 ? handleUpdate : handleSubmit}>
        {inputValues.map((val, idx) => (
          <input
            key={idx}
            type="text"
            name={val}
            value={input[val] || ''}
            placeholder={val}
            onChange={(e) => onChange(e)}
          />  
        ))}

        <div className="create-buttons">
          <button onClick={() => setRenderModal()} type="button">
            cancel
          </button>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateRecipeModal
