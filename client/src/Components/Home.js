import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import { getItem } from "./ApiHelper"
import SearchBar from "./SearchBar"
import AsyncSelect from "react-select/async"

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
   inputElemen.current !== null ? inputElemen.current.focus() : setRerender(!rerender)
  }, [selectedId])

  useEffect(() => {
    console.log(inputElemen.current)
   inputElemen.current !== null && inputElemen.current.focus()
  }, [rerender])


  const getQueryData = async () => {
    return await getItem(search, 1)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    e.target.value.length > 3 && getSuggestions(e.target.value)
  }

  const getSuggestions = async (str) => {
    console.log(str)
    const suggestions = await getItem(str, 50)
    console.log(suggestions)
    setSuggestions(suggestions.foods)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const resp = await getQueryData(search, 1)
    console.log(resp)
    if (resp.foods.length !== 0) {
      let currentItem = resp.foods[0].foodNutrients
      nutrientVals.length === 0 && setNutrientVals(currentItem)
      nutrientVals.length !== 0 &&
        setNutrientVals((prevState) => {
          return [
            ...prevState.map((item, index) => {
              return { ...item, value: item.value.toFixed(2) + currentItem[index].value.toFixed(2) }
            }),
          ]
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
        return [
          ...prevState.map((item, index) => {
          console.log(item.value.toFixed(2), removed[0].foods[0].foodNutrients[index].value.toFixed(2))
            return {
              ...item,
              value:
                item.value.toFixed(2) - removed[0].foods[0].foodNutrients[index].value.toFixed(2),
            }
          }),
        ]
      })
    setItems(newItems)
  }

  const handleUpdateIndex = async (option) => {


    console.log(option)
    // e.preventDefault()
    console.log(input[selectedId])
    let resp = await getItem(option.label, 1)
    console.log(resp)
    let newItems = [...items]
    console.log(newItems)
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

  const handleUpdateChange = (e) => {
    
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  const loadOptions = async (inputText, callback) => {
    const response = await getItem(inputText, 20)
    setSuggestions(response)
    return callback(
      response.foods.map((el) => ({ label: el.description, value: el.fdcId }))
    )
  }
  const onChange = async (option, name) => {
    // console.log(option.label, name, suggestions)

    // let resp = suggestions.foods.find(suggestion=>{
    //   return suggestion.description === option[0].label
    console.log(null? 1: selectedId + 1)
      setSelectedId(items.length+1)
      console.log(items.length)
      // })

    const resp = await getItem(option.label, 1)
    // console.log(resp)
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

  const goHere = () => {
    console.log('here')
  }

  return (
    <Layout>
      <div className="home">
        <section className="item-info-wrapper">
          {items.map((item, idx) => {
            // console.log("l")
            // console.log(input && input[`input` + idx])
            // console.log(item.foods[0].description)
            // console.log(selectedId)
            return (
              // <div
              //   key={idx}
              //   className="item-input"
              //   onSubmit={handleUpdateIndex}
              // >
                selectedId === idx ? (
                    
                    <AsyncSelect
                      value={{ value: "oragne pasoof", label: item.foods[0].description}}
                      onChange={(option, name) =>
                        handleUpdateIndex(option, items.length)
                      }
                      // onClick={() => setSelectedId(idx)}
                      loadOptions={loadOptions}
                      name={items.length}
                      id={`ingr${items.length}`}
                      placeholder="...food"
                      ref={inputElemen}
                    />
                   
                ) : (
                 
                  <div type="text" onClick={() => setSelectedId(idx)}>
                    {item.foods[0].description}
                    {item.foods[0].foodNutrients[0].value}

                  </div>
                
                )
              //   <div onClick={() => removeItem(idx)}>X</div>
              // </div>
            )
          })}

          {/* <form className="item-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input[items.length]}
              onChange={handleChange}
              onClick={() => setSelectedId(items.length)}
              name={items.length}
              id={`ingr${items.length}`}
              placeholder="...food"
              ref={inputElement}
            />
            <button type="submit">></button>
          </form> */}

          {
            <AsyncSelect
              value={{ value: "oragne pasoof", label: input[items.length] }}
              onChange={(option, name) => onChange(option, items.length)}
              // onClick={() => console.log('hi') && setSelectedId(items.length)}
              // onClick={()=> goHere}
              loadOptions={loadOptions}
              name={items.length}
              id={`ingr${items.length}`}
              placeholder="...food"
              ref={inputElemen}
              
            />
          }
        </section>

        <NutritionLabel>
          <div>Cals:{nutrientVals.calories}</div>
          {/* {getNutrients()} */}
        </NutritionLabel>
      </div>
    </Layout>
  )
}

export default Home
