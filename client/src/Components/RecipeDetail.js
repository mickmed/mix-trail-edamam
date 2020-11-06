import React, { useState, useEffect, useLayoutEffect, useRef } from "react"
import { useParams, useHistory } from "react-router-dom"
import "./RecipeDetail.scss"
import NutritionLabel from "./NutritionLabel"
import Form from "./Form.js"
import { getItem } from "./ApiHelper"
import CreateRecipeModal from "./CreateRecipeModal"
import api from "./apiConfig"
import { foods } from "./data.js"
import axios from "axios"
import { getRecipeById, createRecipe, updateRecipe } from "../Services/recipes"

const RecipeDetail = (props) => {
  const [item, setItem] = useState([])
  const [items, setItems] = useState([])
  const [nutrientVals, setNutrientVals] = useState({})
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState("")
  const [renderModal, setRenderModal] = useState(false)
  const [fadeOut, setFadeOut] = useState([])
  const [verifyRecipeUser, setVerifyRecipeUser] = useState(false)
  const inputElement = useRef(null)
  const history = useHistory()
  // const inputRef = useRef(null)
  const { id } = useParams()

  const {
    user,
    recipes,
    setRecipes,
    userRecipes,
    setUserRecipes,
    sidebar,
  } = props

  useEffect(() => {
    if (id !== "new") {
      const item = props.recipes.find((recipe) => recipe._id === id)
      const getItem = async () => {
        const resp = await getRecipeById(id)

        setItems(resp.ingredients)
        setNutrientVals(resp.nutrientVals)
        setItem(resp)
        setInput({ ...input, ...resp })

        if (user && Object.keys(resp).length > 0) {
          console.log(user, resp)
          if(user.username === resp.user.username){
            setVerifyRecipeUser(true)
          }
        }
      }

      getItem()
    }

    setItems([])
    setNutrientVals({})
    setItem([])
    setInput({})
    //   inputElement.current.focus()
  }, [id, user])

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
      Object.keys(nutrientVals).length === 0 && setNutrientVals(nutVals)
      Object.keys(nutrientVals).length !== 0 &&
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
    Object.keys(nutrientVals).length !== 0 &&
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
    Object.keys(nutrientVals).length !== 0 &&
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
    const body = {
      ...input,
      ingredients: items,
      nutrientVals: nutrientVals,
      user: user.id,
    }
    // console.log("userid", user.id)

    if (id === "new") {
      const resp = await createRecipe(body)
      setUserRecipes((userRecipes) => [...userRecipes, resp.data]) &&
        setRecipes((recipes) => [...recipes, resp.data])
    } else {
      const resp = await updateRecipe(id, body)
      console.log(resp)
      const recipesIndex = recipes.findIndex((recipe) => {
        if (recipe._id === id) {
          return true
        }
      })
      const userRecipesIndex = userRecipes.findIndex((recipe) => {
        if (recipe._id === id) {
          return true
        }
      })

      recipes.splice(recipesIndex, 1, resp)
      userRecipes.splice(userRecipesIndex, 1, resp)
      setRecipes(recipes)
      setUserRecipes(userRecipes)
      history.push("/recipes")
    }
    // let resp =
    //   id !== "new"
    //     ? await updateRecipe(id, body)
    //     : (await createRecipe(body)) &&
    //       setUserRecipes((userRecipes) => [...userRecipes, resp.data]) &&
    //       setRecipes((recipes) => [...recipes, resp.data])
    // console.log(resp.data)
    // setItem(resp.data)

    // setUserRecipes((userRecipes) => [...userRecipes, resp.data])
    // setRecipes((recipes) => [...recipes, resp.data])
  }
  return (
    <div className={`recipe-detail ${fadeOut}`}>
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
            onChange={verifyRecipeUser && onChange}
            ref={inputElement}
            autoComplete="off"
          />
          {verifyRecipeUser && items.length > 1 && (
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
                    onClick={verifyRecipeUser && setSelectedId}
                    onChange={verifyRecipeUser && onChange}
                    onSubmit={updateItem}
                    // refo={inputElement}
                  />
                ) : (
                  <div type="text" onClick={() => verifyRecipeUser && setSelectedId(idx)}>
                    <span>{item.serving_qty}</span>
                    <span>{item.serving_unit}</span>
                    <span>{item.food_name}</span>
                  </div>
                )}
                {verifyRecipeUser && <div className="remove-X" onClick={() => removeItem(idx)}>
                  X
                </div>}
              </div>
            )
          })}

        {verifyRecipeUser && !renderModal && (
          <Form
            className="add-item-form"
            idx={items.length}
            value={"" || input[items.length]}
            onClick={verifyRecipeUser && setSelectedId}
            onChange={verifyRecipeUser && itemHandleChange}
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
export default RecipeDetail
