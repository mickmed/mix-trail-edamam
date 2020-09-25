import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import { getItem } from "./ApiHelper"

const Home = (props) => {
  const [currentItem, setCurrentItem] = useState()
  const [nutrientVals, setNutrientVals] = useState([])
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const [addNutrients, setAddNutrients] = useState([])
  const [removed, setRemoved] = useState({})
  const [action, setAction] = useState("")
  const [newFood, setNewFood] = useState("")
  const [search, setSearch] = useState("")
  const [items, setItems] = useState([])
  const [suggestions, setSuggestions] = useState("")

  const inputElement = useRef(null)

  useEffect(() => {
    console.log("usef")
    // items.length === 1 && setNutrientVals(currentItem)

    const addItem = () => {

      // console.log(nutrientVals, currentItem)

      nutrientVals.length === 0 && currentItem && setNutrientVals(currentItem)
      nutrientVals.length !== 0 &&
        setNutrientVals((prevState) => {
          return [
            ...prevState.map((item, index) => {
              // console.log(item.value, currentItem[index].value)
              return { ...item, value: item.value + currentItem[index].value }
            }),
          ]
        })
    }
    addItem()
  }, [currentItem])

  useEffect(() => {
    console.log('removed')
    nutrientVals.length !== 0 &&
    setNutrientVals((prevState) => {
      return [
        ...prevState.map((item, index) => {
          // console.log(item.value, currentItem[index].value)
          return { ...item, value: item.value - currentItem[index].value }
        }),
      ]
    })
  },[removed])

  const getQueryData = async () => {
    return await getItem(search, 1)
    // setItems((prevState) => [...prevState, itemResp])
    // setNutrients(nutsResp.data)
    // setLoaded(true)
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
    setCurrentItem(resp.foods[0].foodNutrients)

    setItems((prevState) => [...prevState, resp])
  }

 
  const removeItem = (index) => {
    console.log(index)
    let removedItem = {}
    setItems((prevState) => {
      removedItem = [...prevState.splice(index, 1)]
      return [...prevState]
    })
    setRemoved(removedItem)
  }

  const handleUpdateIndex = async (e) => {
    e.preventDefault()

    // await handleUpdate(selectedId, input[selectedId])
    // await setSelectedId(items.length)
    let resp = await getItem(input[selectedId], 1)

    await setItems((prevState) => {
      setRemoved([...prevState.splice(selectedId, 1, resp)])
      return [...prevState]
    })
    await setNutrientVals((prevState) => {
      return prevState.length !== 0
        ? prevState.map((item, id) => {
            // action === "newFood"
            console.log(removed.foods[0].foodNutrients[id].value, resp)

            return {
              ...item,
              value: item.value - removed[0].foods[0].foodNutrients[id].value,
            }
          })
        : currentItem
    })

    await setSelectedId(items.length)

    setNewFood(resp)
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
              <section key={idx} className="item-info">
                <form className="item-input" onSubmit={handleUpdateIndex}>
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
                    <div>
                      {/* <div>value{item.foods[0].foodNutrients[0].value}</div> */}
                      <div type="text" onClick={() => setSelectedId(idx)}>
                        {item.foods[0].description}
                      </div>
                    </div>
                  )}
                </form>

                <div>{item.calories}</div>
                <div onClick={() => removeItem(idx)}>X</div>
                {/* <div>{item.food.label}</div>
                <div>{item.food.nutrients.ENERC_KCAL}</div> */}
              </section>
            )
          })}

          <form className="item-input" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={input[items.length]}
                onChange={handleChange}
                onClick={() => setSelectedId(items.length)}
                name={items.length}
                id={`ingr${items.length}`}
                ref={inputElement}
              />
              <button type="submit">></button>
            </div>
            )
          </form>
        </section>
        {/* <div className="title">{`${item.common[0].tag_name}`}</div>
        <div>{food.label}</div>
        <img src={food.image} />
        <p>Calories:{food.nutrients.ENERC_KCAL}</p>
        <p>Protein:{food.nutrients.PROCNT}</p> */}
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
