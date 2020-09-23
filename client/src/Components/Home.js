import React, { useState, useEffect, useRef } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"
import { getItem } from "./ApiHelper"

const Home = (props) => {
  const {
    items,

    setItems,

    handleSubmit,
    handleChange,
    handleUpdate,
  } = props
  const [nutrientVals, setNutrientVals] = useState({})
  const [input, setInput] = useState({})
  const [selectedId, setSelectedId] = useState(null)
  const inputElement = useRef(null)

  useEffect(() => {
    inputElement.current.focus()
    setSelectedId(items.length)

    console.log(items)
    items.map((item, idx) => {
      return (
        <div>
          {item.foods[0].description}
          {item.foods.forEach((el) => (
            <div>{el}</div>
          ))}
        </div>
      )

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
    })
  }, [items])

  const removeItem = (index) => {
    console.log(index)
    setItems((prevState) => {
      let newState = [...prevState.splice(index, 1)]
      console.log([...prevState])
      return [...prevState]
    })
  }

  const getNutrients = () => {
    if (nutrientVals.totalNutrients !== undefined) {
      return Object.keys(nutrientVals.totalNutrients).map((key, index) => (
        <div className="nutrient-info" key={index}>
          <div>{nutrientVals.totalNutrients[key].label}</div>
          <div>{nutrientVals.totalNutrients[key].quantity.toFixed(2)}</div>
        </div>
      ))
    }
  }
  const handleUpdateIndex = async (e) => {
    e.preventDefault()

    await handleUpdate(selectedId, input[selectedId])
    await setSelectedId(items.length)
  }
  const handleUpdateChange = (e) => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }
  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   let resp = await getItem(input[`ingr${selectedId}`])
  //   console.log(resp)
  //   setItems((prevState) => {
  //     console.log(selectedId)
  //     let a = [...prevState]
  //     let x = a.splice(selectedId, 1, resp)
  //     console.log(a)

  //     return a
  //   })
  // }
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
                    <div type="text" onClick={() => setSelectedId(idx)}>
                      {item.foods[0].description}
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
          {getNutrients()}
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
