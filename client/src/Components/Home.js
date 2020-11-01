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

const Home = (props) => {
  const [item, setItem] = useState([])
  const [items, setItems] = useState([])
  const [nutrientVals, setNutrientVals] = useState([])
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState("")
  const [renderModal, setRenderModal] = useState(false)
  const [fadeOut, setFadeOut] = useState([])
  const inputElement = useRef(null)
  // const inputRef = useRef(null)
  const { id } = useParams()

  const { user, recipes, sidebar } = props

  useEffect(() => {
    setItems([])
    setItem([])
    setNutrientVals([])
    setInput({})
    inputElement.current.focus()
  }, [id])

  useEffect(() => {
    if (id !== "new") {
      const item = props.recipes.find((recipe) => recipe._id === id)
      const getItem = async () => {
        const resp = await axios(`${apiUrl}/recipes/${id}`)
        setItems(resp.data.ingredients)
        setNutrientVals(resp.data.nutrientVals[0])
        setItem(resp.data)
        setInput({ ...input, ...resp.data })
      }
      console.log(inputElement)

      getItem()
    }
  }, [])

  const itemHandleChange = (e) => {
    setSearch(e.target.value)
  }

  const addItem = async (e) => {
    e.preventDefault()
    // let res = foods.find((food) => {
    //   console.log(search)
    //   return food.foods[0].food_name === search
    // })
    const rest = await getItem(search, 1)
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

  const updateItem = async (e) => {
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
    setRenderModal(false)
    const body = { ...input, ingredients: items, nutrientVals: nutrientVals, user: user.id }
    console.log('userid', user.id)
    let resp =
      id !== "new"
        ? await axios.put(`${apiUrl}/recipes/${item._id}`, body)
        : await axios.post(`${apiUrl}/recipes`, body)
    console.log(resp.data)
    setItem(resp.data)
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
            id={id}
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
            ref={inputElement}
            autoComplete="off"
          />
          {items.length > 1 && (
            <>
              <button
                className="save-recipe"
                onClick={() => setRenderModal(!renderModal)}
                style={
                  renderModal ? { background: "blue", color: "white" } : {}
                }
              >
                details
              </button>
              <button className="save-recipe" onClick={saveRecipe}>
                {id !== "new" ? "update" : "save"}
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
                    className="edit-item-form"
                    idx={idx}
                    value={
                      input[idx] ||
                      `${item.serving_qty}  ${item.serving_unit} ${item.food_name}`
                    }
                    onClick={setSelectedId}
                    onChange={onChange}
                    onSubmit={updateItem}
                    // refo={inputElement}
                  />
                ) : (
                  <div type="text" onClick={() => setSelectedId(idx)}>
                    <span>{item.serving_qty}</span>
                    <span>{item.serving_unit}</span>
                    <span>{item.food_name}</span>
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
            className="add-item-form"
            idx={items.length}
            value={"" || input[items.length]}
            onClick={setSelectedId}
            onChange={itemHandleChange}
            onSubmit={addItem}
            // refo={inputElement}
            origin="addItem"
          />
        )}
      </section>
      <NutritionLabel nutrientVals={nutrientVals} />
    </div>
  )
}
export default Home
