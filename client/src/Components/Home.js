import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import "./Home.scss"
import NutritionLabel from "./NutritionLabel"
import Form from "./Form.js"
import { getItem } from "./ApiHelper"
import CreateRecipeModal from "./CreateRecipeModal"
import apiUrl from "./apiConfig"

import { foods } from "./data.js"
import axios from "axios"
// import CreateRecipe from "./CreateRecipe"

const Home = (props) => {
  const [nutrientVals, setNutrientVals] = useState([])
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [suggestions, setSuggestions] = useState(null)
  const [rerender, setRerender] = useState(false)
  const [renderModal, setRenderModal] = useState(false)
  const [item, setItem] = useState([])
  const [fadeOut, setFadeOut] = useState([])
  const inputElement = useRef(null)
  const inputRef = useRef(null)
  const { id } = useParams()

  useEffect(() => {
    console.log(apiUrl)
    inputElement.current !== null
      ? inputElement.current.focus()
      : setRerender(!rerender)
  }, [selectedId])

  useEffect(() => {
    console.log(props.recipes)
    inputRef.current.focus()
    if (id) {
      const item = props.recipes.find((recipe) => recipe._id === id)
      const getItem = async () => {
        console.log("here")
        const resp = await axios(`${apiUrl}/recipes/${id}`)
        console.log(resp)
        setItems(resp.data.ingredients)
        setNutrientVals(resp.data.nutrientVals[0])
        setItem(resp.data)
        setInput({ ...input, name: resp.data.name })
      }
      console.log(item)
      getItem()
      // console.log(id, props.recipes)
      // console.log(item)
    }
  }, [])

  const getQueryData = async () => {
    return await getItem(search, 1)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = foods.find((food) => {
      console.log(search)
      return food.foods[0].food_name === search
    })
    // let resp = res.foods[0]
    const rest = await getQueryData(search, 1)

    let resp = rest !== undefined && rest.foods[0]

    if (resp) {
      let foodKeys = Object.keys(resp)
      let nutVals = {}
      for (let key in resp) {
        if (key.substring(0, 3) === "nf_") {
          nutVals[key] = resp[key]
        }
      }

      nutrientVals.length === 0 && setNutrientVals(nutVals)
      nutrientVals.length !== 0 &&
        setNutrientVals((prevState) => {
          let prev = { ...prevState }
          let newState = {}
          for (let key in prev) {
            newState[key] = prev[key] + nutVals[key]
          }
          return newState
        })
      setItems((prevState) => [...prevState, resp])
      setSelectedId(selectedId + 1)
    }
  }
  const removeItem = async (index) => {
    let newItems = [...items]
    let removed = newItems.splice(index, 1)

    nutrientVals.length !== 0 &&
      setNutrientVals((prevState) => {
        let prev = { ...prevState }
        let newState = {}
        for (let key in prev) {
          newState[key] = prev[key] - removed[0][key]
        }
        return newState
      })
    setItems(newItems)
  }

  const handleUpdateIndex = async (e) => {
    e.preventDefault()
    const resp = await getItem(input[selectedId], 1)
    // let resp = foods.find((food) => {
    //   return food.foods[0].food_name === input[selectedId]
    // })

    let newItems = [...items]
    let removed = newItems.splice(selectedId, 1, resp.foods[0])

    nutrientVals.length !== 0 &&
      setNutrientVals((prevState) => {
        let prev = { ...prevState }
        let newState = {}
        for (let key in prev) {
          newState[key] = prev[key] - removed[0][key] + resp.foods[0][key]
        }
        return newState
      })
    await setSelectedId(items.length)
    await setItems(newItems)
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const saveRecipe = async () => {
    console.log("submit")
    // e.preventDefault()
    setRenderModal(false)
    const body = { ...input, ingredients: items, nutrientVals: nutrientVals }
    console.log({ ...input }, items, body)

    const resp = await axios.post(`${apiUrl}/recipes`, body)
    console.log(resp)
    setItem(resp.data)
  }

  const updateRecipe = async (e) => {
    console.log("update", items)
    console.log("input", input)

    setRenderModal(false)
    const body = { ...input, ingredients: items, nutrientVals: nutrientVals }
    console.log({ ...input }, items, body)

    const resp = await axios.put(`${apiUrl}/recipes/${item._id}`, body)
    console.log(resp)
    setItem(resp.data)
  }

  const randNum = () => {
    return Math.random()
  }

  return (
    <div className={`home ${fadeOut}`}>
      <section className="item-info-wrapper">
        {renderModal && (
          <CreateRecipeModal
            renderModal={renderModal}
            setItem={setItem}
            setRenderModal={setRenderModal}
            items={items}
            setItems={setItems}
            nutrientVals={nutrientVals}
            item={item}
            input={input}
            onChange={onChange}
          />
        )}

        <div className="save-button">
          <input
            type="text"
            name="name"
            className="recipe-name"
            value={input.name || ""}
            placeholder="...add recipe name"
            onChange={onChange}
            ref={inputRef}
          />
          {items.length > 1 && (
            <>
              <button
                className="save-recipe"
                onClick={() => setRenderModal(!renderModal)}
                style={renderModal ? {background:'blue', color:'white'} : {}}
              >
                details
              </button>
              <button
                className="save-recipe"
                onClick={id ? updateRecipe : saveRecipe}
               
              >
                {id ? "update" : "save"}
              </button>
            </>
          )}
        </div>

        {!renderModal &&
          items.map((item, idx) => {
            return (
              <div key={idx} className="menu-item">
                {selectedId === idx ? (
                  <Form
                    idx={idx}
                    value={input[idx] || ""}
                    onClick={setSelectedId}
                    onChange={onChange}
                    onSubmit={handleUpdateIndex}
                    refo={inputElement}
                  />
                ) : (
                  <div type="text" onClick={() => setSelectedId(idx)}>
                    <span>{item.serving_qty}</span>
                    <span>{item.serving_unit}</span>

                    <span>{item.food_name}</span>
                    {/* {item.nf_calories} */}
                  </div>
                )}
                <div className="remove-X" onClick={() => removeItem(idx)}>
                  X
                </div>
              </div>
            )
          })}

        {!renderModal && (
          <Form
            idx={items.length}
            value={input[items.length]}
            onClick={setSelectedId}
            onChange={handleChange}
            onSubmit={handleSubmit}
            refo={inputElement}
          />
        )}
      </section>
      <NutritionLabel nutrientVals={nutrientVals} />
    </div>
  )
}

export default Home
