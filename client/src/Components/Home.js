import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import { getItem } from "./ApiHelper"

import { foods } from "./data.js"

const Home = (props) => {
  const [nutrientVals, setNutrientVals] = useState([])
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [suggestions, setSuggestions] = useState(null)
  const [rerender, setRerender] = useState(false)
  const inputElemen = useRef(null)

  useEffect(() => {
    console.log(inputElemen.current)
    inputElemen.current !== null
      ? inputElemen.current.focus()
      : setRerender(!rerender)
  }, [selectedId])

  // useEffect(() => {
  //   console.log(inputElemen.current)
  //   inputElemen.current !== null && inputElemen.current.focus()
  // }, [rerender])

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

    // const resp = await getQueryData(search, 1)

    let resp = res.foods[0]
    console.log(resp)

    if (resp.length !== 0) {
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
          let prev = {...prevState}
          let newState = {}
          for(let key in prev){
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
      let prev = {...prevState}
      let newState = {}
      for(let key in prev){
        newState[key] = prev[key] - removed[0][key]
      }
      return newState
     
    })
    setItems(newItems)
  }

  const handleUpdateIndex = async (e) => {
    e.preventDefault()

    let resp = foods.find((food) => {
      return food.foods[0].food_name === input[selectedId]
    })
    let newItems = [...items]
    let removed = newItems.splice(selectedId, 1, resp.foods[0])
   
    nutrientVals.length !== 0 &&
    setNutrientVals((prevState) => {
      let prev = {...prevState}
      let newState = {}
      for(let key in prev){
        newState[key] = prev[key] - removed[0][key] + resp.foods[0][key]
      }
      return newState
     
    })
    await setItems(newItems)
    await setSelectedId(items.length)
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  return (
    <Layout>
      <div className="home">
        <section className="item-info-wrapper">
          {items.map((item, idx) => {
            return (
              <div key={idx} className="menu-item">
                {selectedId === idx ? (
                  <form className="item-input" onSubmit={handleUpdateIndex}>
                    <input
                      type="text"
                      value={input[idx]}
                      onChange={onChange}
                      onClick={() => setSelectedId(idx)}
                      name={idx}
                      id={`ingr${idx}`}
                      placeholder="...food"
                      // ref={inputElement}
                    />
                    <button type="submit">></button>
                  </form>
                ) : (
                  <div type="text" onClick={() => setSelectedId(idx)}>
                    {item.food_name}
                    {item.nf_calories}
                  </div>
                )}
                <div className="remove-X" onClick={() => removeItem(idx)}>
                  X
                </div>
              </div>
            )
          })}

          {
            <form className="item-input" onSubmit={handleSubmit}>
              <input
                type="text"
                value={input[items.length]}
                onChange={handleChange}
                onClick={() => setSelectedId(items.length)}
                name={items.length}
                id={`ingr${items.length}`}
                removeItem
                placeholder="...food"
                ref={inputElemen}
              />
              <button type="submit">></button>
            </form>
          }
        </section>
        // <NutritionLabel nutrientVals={nutrientVals} />
      </div>
    </Layout>
  )
}

export default Home
