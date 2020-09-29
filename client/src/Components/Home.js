import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import { getItem } from "./ApiHelper"

const Home = (props) => {
  const [nutrientVals, setNutrientVals] = useState([])
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [suggestions, setSuggestions] = useState("")

  const inputElement = useRef(null)

  useEffect(() => {
    inputElement.current.focus()
  }, [nutrientVals])

  const getQueryData = async () => {
    return await getItem(search, 1)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
    e.target.value.length > 3 && getSuggestions(e.target.value)
  }

  const getSuggestions = () => {
    const suggestions = getItem(search, 20)
    setSuggestions(suggestions)
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
              return { ...item, value: item.value + currentItem[index].value }
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
            return {
              ...item,
              value:
                item.value - removed[0].foods[0].foodNutrients[index].value,
            }
          }),
        ]
      })
    setItems(newItems)
  }

  const handleUpdateIndex = async (e) => {
    e.preventDefault()
    // console.log(e.target, selectedId)
    let resp = await getItem(input[selectedId], 1)
    console.log(resp)
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
  }

  const handleUpdateChange = (e) => {
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
            // console.log(input && input[`input` + idx])
            // console.log(item.foods[0].description)
            return (
              <form
                key={idx}
               
                className="item-input"
                onSubmit={handleUpdateIndex}
              >
                {selectedId === idx ? (
                  <div>
                    <input
                      type="text"
                      value={input[idx] || item.foods[0].description}
                      onChange={handleUpdateChange}
                      onClick={() => setSelectedId(idx)}
                      name={idx}
                      id={idx}
                    />
                    <button type="submit">></button>
                  </div>
                ) : (
                  <div type="text" onClick={() => setSelectedId(idx)}>
                    {item.foods[0].description}
                  </div>
                )}{" "}
                <div onClick={() => removeItem(idx)}>X</div>
              </form>
            )
          })}

          <form className="item-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input[items.length]}
              onChange={handleChange}
              onClick={() => setSelectedId(items.length)}
              name={items.length}
              id={`ingr${items.length}`}
              placeholder='...food'
              ref={inputElement}
            />
            <button type="submit">></button>
          </form>
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

/*CODE FOR EDAMAME TO SET THE STATE OF ITEMS */
// items.map((item, idx) => {

//   console.log(item)
//   calories += item.calories
//   for (let obj in item.totalNutrients) {
//     tots[obj] = {
//       ...item.totalNutrients[obj],
//       quantity:
//         tots[obj] !== undefined
//           ? tots[obj].quantity + item.totalNutrients[obj].quantity
//           : item.totalNutrients[obj].quantity,
//     }
//   }
//   setInput({
//     ...input,
//     [`ingr${idx}`]: item.ingredients[0].text,
//   })
//   setInput({ ingr0: currentItem.ingredients[0].text })
// })

// setNutrientVals((prevState) => {
//   console.log(Object.keys(prevState))
//   return {
//     ...prevState,
//     calories: calories,
//     totalNutrients: tots,
//   }
// })

// items.map((item, idx) => {

//   console.log(item)
//   calories += item.calories
//   for (let obj in item.totalNutrients) {
//     tots[obj] = {
//       ...item.totalNutrients[obj],
//       quantity:
//         tots[obj] !== undefined
//           ? tots[obj].quantity + item.totalNutrients[obj].quantity
//           : item.totalNutrients[obj].quantity,
//     }
//   }
//   setInput({
//     ...input,
//     [`ingr${idx}`]: item.ingredients[0].text,
//   })
//   setInput({ ingr0: currentItem.ingredients[0].text })
// })

// setNutrientVals((prevState) => {
//   console.log(Object.keys(prevState))
//   return {
//     ...prevState,
//     calories: calories,
//     totalNutrients: tots,
//   }
// })

//   let cur = currentItem.totalNutrients

//   setNutrientVals((prevState) => {
//     let totalNutrients = {}
//     for (let obj in prevState.totalNutrients) {
//       totalNutrients[obj] = {
//         ...prevState[obj],
//         quantity:
//           prevState.totalNutrients[obj].quantity + cur[obj].quantity,
//       }
//     }
//     return {
//       ...prevState,
//       calories: prevState.calories + currentItem.calories,
//       totalNutrients: totalNutrients,
//     }
//   })
