import React, { useState, useEffect } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"

const Home = (props) => {
  const { search, currentItem, items, nutrients, setItems } = props
  const [nutrientVals, setNutrientVals] = useState({})
  const [remove, setRemove] = useState()

  useEffect(() => {
    const tots = {}
    let calories = 0
    items.map((item) => {
      // console.log(item)
      calories += item.calories
      for (let obj in item.totalNutrients) {
        tots[obj] = {
          ...item.totalNutrients[obj],
          quantity:
            tots[obj] !== undefined
              ? tots[obj].quantity + item.totalNutrients[obj].quantity
              : item.totalNutrients[obj].quantity,
        }
      }
    })

    setNutrientVals((prevState) => {
      console.log(Object.keys(prevState))
      return {
        ...prevState,
        calories: calories,
        totalNutrients: tots,
      }
    })

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
        <div className='nutrient-info' key={index}>
          <div>{nutrientVals.totalNutrients[key].label}</div>
          <div>{nutrientVals.totalNutrients[key].quantity}</div>
        </div>
      ))
    }
  }
  return (
    <Layout>
      <div className="home">
        <section className="item-info-wrapper">
          {items.map((item, idx) => {
            return (
              <section key={idx} className="item-info">
                <div>{item.ingredients[0].text}</div>
                <div>{item.calories}</div>
                <div onClick={() => removeItem(idx)}>X</div>
                {/* <div>{item.food.label}</div>
                <div>{item.food.nutrients.ENERC_KCAL}</div> */}
              </section>
            )
          })}
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
