import React, { useState, useEffect } from "react"
import "./home.scss"
import Layout from "./Layout"
import NutritionLabel from "./NutritionLabel"

const Home = (props) => {
  const { search, currentItem, items, nutrients } = props
  const [nutrientVals, setNutrientVals] = useState({})

  useEffect(() => {
    console.log(currentItem)
    if (!nutrientVals.calories) {
      console.log("nuts", nutrientVals)
      setNutrientVals((prevState) => ({
        ...prevState,
        calories: currentItem.calories,
        totalNutrients: currentItem.totalNutrients,
      }))
    } else {
      let cur = currentItem.totalNutrients

      console.log(
        Object.entries(currentItem.totalNutrients).map(([key, value]) =>
          console.log(key)
        )
      )
      setNutrientVals((prevState) => {
        console.log(prevState)
        let totalNutrients = {}
        for (let obj in prevState.totalNutrients) {
          totalNutrients[obj] = {...prevState[obj], quantity:prevState.totalNutrients[obj].quantity + cur[obj].quantity}
        }
        return {
          ...prevState,
          calories: prevState.calories + currentItem.calories,
          totalNutrients: totalNutrients
        }
      })
    }

    // let ifem = currentItem.parsed[0]
    // console.log(item)
    // setNutrientVals((prevState) => ({
    //   ...prevState,
    //   cals: prevState.cals + item.food.nutrients.ENERC_KCAL,
    // }))
  }, [items])
  return (
    <Layout>
      <div className="home">
        <section className="item-info-wrapper">
          {items.map((item) => {
            return (
              <section className="item-info">
                <div>{item.ingredients[0].text}</div>
                <div>{item.calories}</div>
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
        {console.log("here", nutrientVals)}
        <NutritionLabel>
          <div>Cals:{nutrientVals.calories}</div>
        </NutritionLabel>
      </div>
    </Layout>
  )
}

export default Home
