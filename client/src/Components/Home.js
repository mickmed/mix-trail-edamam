import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import Form from "./Form.js"
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
  const inputElement = useRef(null)

  useEffect(() => {
    console.log(inputElement.current)
    inputElement.current !== null
      ? inputElement.current.focus()
      : setRerender(!rerender)
  }, [selectedId])

  //   useEffect(() => {
  //   console.log(inputElement.current)
  //   inputElement.current !== null && inputElement.current.focus()
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
    console.log(input[selectedId])
    const resp = await getItem(input[selectedId], 1)
console.log(resp)
    // let resp = foods.find((food) => {
    //   return food.foods[0].food_name === input[selectedId]
    // })

    let newItems = [...items]
    let removed = newItems.splice(selectedId, 1, resp.foods[0])

    // nutrientVals.length !== 0 &&
    //   setNutrientVals((prevState) => {
    //     let prev = { ...prevState }
    //     let newState = {}
    //     for (let key in prev) {
    //       newState[key] = prev[key] - removed[0][key] + resp.foods[0][key]
    //     }
    //     return newState
    //   })
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

  return (
    <Layout>
      <div className="home">
     

        <section className="item-info-wrapper">
          {items.map((item, idx) => {
            return (
              <div key={idx} className="menu-item">
                {selectedId === idx ? (
                  <Form
                    idx={idx}
                    value={input[idx]}
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

          {
            <Form
              idx={items.length}
              value={input[items.length]}
              onClick={setSelectedId}
              onChange={handleChange}
              onSubmit={handleSubmit}
              refo={inputElement}
            />
          }
        </section>
        <NutritionLabel nutrientVals={nutrientVals} />
      </div>
    </Layout>
  )
}

export default Home
