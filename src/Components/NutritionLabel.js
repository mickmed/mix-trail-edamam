import React from "react"
import './nutritionLabel.scss'

const NutritionalLabel = (props) => {
  return <section className="nutrition-label">{props.children}</section>
}

export default NutritionalLabel
