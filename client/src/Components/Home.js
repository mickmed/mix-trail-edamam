import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import { getItem } from "./ApiHelper"
import SearchBar from "./SearchBar"
import AsyncSelect from "react-select/async"
import AutoSelect from "./AutoSelect"

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

  useEffect(() => {
    console.log(inputElemen.current)
    inputElemen.current !== null && inputElemen.current.focus()
  }, [rerender])

  const getQueryData = async () => {
    return await getItem(search, 1)
  }

  const removeItem = async (index) => {
    let newItems = [...items]
    let removed = newItems.splice(index, 1)

    nutrientVals.length !== 0 &&
      setNutrientVals((prevState) => {
        return [
          ...prevState.map((item, index) => {
            console.log(
              item.value.toFixed(2),
              removed[0].foods[0].foodNutrients[index].value.toFixed(2)
            )
            return {
              ...item,
              value:
                item.value.toFixed(2) -
                removed[0].foods[0].foodNutrients[index].value.toFixed(2),
            }
          }),
        ]
      })
    setItems(newItems)
  }

  const handleUpdateIndex = async (option) => {
    // e.preventDefault()
    let resp = await getItem(option.label, 1)
    let newItems = [...items]
    let removed = newItems.splice(selectedId, 1, resp)

    nutrientVals.length !== 0 &&
      setNutrientVals((prevState) => {
        return [
          ...prevState.map((item, index) => {
            return {
              ...item,
              value:
                item.value -
                removed[0].foods[0].foodNutrients[index].value +
                resp.foods[0].foodNutrients[index].value,
            }
          }),
        ]
      })
    setItems(newItems)
    setSelectedId(items.length)
  }

  const loadOptions = async (inputText, callback) => {
    const response = await getItem(inputText, 20)
    setSuggestions(response)
    return callback(
      response.foods.map((el) => ({ label: el.description, value: el.fdcId }))
    )
  }
  const onChange = async (option, name) => {
    setSelectedId(items.length + 1)

    const resp = await getItem(option.label, 1)

    if (resp.foods.length !== 0) {
      let currentItem = resp.foods[0].foodNutrients
      nutrientVals.length === 0 && setNutrientVals(currentItem)
      nutrientVals.length !== 0 &&
        setNutrientVals((prevState) => {
          return [
            ...prevState.map((item, index) => {
              return { ...item, value: item.value + currentItem[index].value }
            }),
          ]
        })
      setItems((prevState) => [...prevState, resp])
      setInput({
        ...input,
        [name]: option.label,
      })
    }
  }

  return (
    <Layout>
      <div className="home">
        <section className="item-info-wrapper">
          {items.map((item, idx) => {
            return (
              <div key={idx} className="menu-item" onSubmit={handleUpdateIndex}>
                {selectedId === idx ? (
                  <AutoSelect
                    label={item.foods[0].description}
                    items={items}
                    handleUpdateIndex={handleUpdateIndex}
                    loadOptions={loadOptions}
                    inputElemen={inputElemen}
                  />
                ) : (
                  <div type="text" onClick={() => setSelectedId(idx)}>
                    {item.foods[0].description}
                    {item.foods[0].foodNutrients[0].value}
                  </div>
                )}
                <div className="remove-X" onClick={() => removeItem(idx)}>
                  X
                </div>
              </div>
            )
          })}

          {
            <AutoSelect
              label={input[items.length]}
              items={items}
              handleUpdateIndex={onChange}
              loadOptions={loadOptions}
              inputElemen={inputElemen}
            />
          }
        </section>

        <NutritionLabel nutrientVals={nutrientVals} />
      </div>
    </Layout>
  )
}

export default Home
