import React from "react"
import "./home.scss"
import Layout from "./Layout"

const Home = (props) => {
  const { items, nutrients } = props
  // console.log(items)

  return (
    <Layout>
      <div className="home">
        {items.map((item) => {
          // <div>{item.food.text}</div>
          item = item.parsed[0]
          return (
            <>
              <div>{item.food.label}</div>
              <div>{item.food.quantity}</div>
              <div>{item.food.nutrients.ENERC_KCAL}</div>
              <div>{item.quantity}</div>
            </>
          )
        })}
        {/* <div className="title">{`${item.common[0].tag_name}`}</div>
        <div>{food.label}</div>
        <img src={food.image} />
        <p>Calories:{food.nutrients.ENERC_KCAL}</p>
        <p>Protein:{food.nutrients.PROCNT}</p> */}
      </div>
    </Layout>
  )
}

export default Home
