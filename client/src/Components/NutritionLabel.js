import React, { useState, useEffect } from "react"
import "./NutritionLabel.scss"

const NutritionalLabel = ({ nutrientVals }) => {
  const [scroll, setScroll] = useState(false)
  const [btnTxt, setBtnTxt] = useState("down")
  const [style, setStyle] = useState({})
  const labelRef = React.createRef()

  useEffect(() => {
    if (labelRef.current.clientHeight >= labelRef.current.scrollHeight - 50) {
      console.log("here")
      setStyle({ display: "none" })
    }
  }, [scroll])

  const vals = {}
  for (let key in nutrientVals) {
    vals[key] = Math.round(nutrientVals[key])
  }

  const handleClick = (e) => {
    e.preventDefault()
    // e.stopPropagation()

    scroll === false
      ? labelRef.current.scrollTo({
          top: 300,
          behavior: "smooth",
          block: "start",
        })
      : labelRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
          block: "start",
        })
    setScroll(!scroll)
  }

  const rVals = (val) => {
  
    return isNaN(val) ? "" : Math.round((val * 100))
  }

  return (
    // this nutrition label was originaly part of my final project at PerScholas, Nov 2018

    <section className="nutrition-label">
      <div className="nutrition-facts" ref={labelRef}>
        {/* <!-- TOP SECTION --> */}

        <h1>Nutrition Facts</h1>
        <div className="serving">
          <span>
            <h6>Serving Size</h6>
            <h6>n/a</h6>
          </span>
          <span>
            <h6>Servings Per Container</h6>
            <h6>n/a</h6>
          </span>
        </div>
        {/* <!-- TOP SUB HEADING --> */}
        <p className="amnt-per-serving">Amount Per Serving</p>
        <div className="primary">
          <h3>Calories {vals.nf_calories}</h3>

          <h3>Calories from Fat n/a</h3>
        </div>

        <p className="perc-daily-val">% Daily Value*</p>

        <div className="primary">
          <h4>Total Fat {vals.nf_total_fat}g</h4>

          <div>
            <h3>{rVals(vals.nf_total_fat / 78)}%</h3>
          </div>
        </div>

        <div className="secondary">
          <h3>Saturated Fat {vals.nf_saturated_fat}g</h3>

          <h3>{rVals(vals.nf_saturated_fat / 20)}%</h3>
        </div>

        <div className="secondary">
          <h3>Trans Fat</h3>
        </div>
        {/* </div> */}
        <div className="primary chol">
          <h4>Cholesterol {vals.nf_cholesterol}mg</h4>
          <h3>{rVals(vals.nf_cholesterol / 300)}%</h3>
        </div>

        <div className="primary">
          <h4>Sodium {vals.nf_sodium}mg</h4>
          <h3>{rVals(vals.nf_sodium / 2300)}%</h3>
        </div>

        <div className="primary">
          <h4>Total Carbohydrate {vals.nf_total_carbohydrate}g</h4>
          <h3>{rVals(vals.nf_total_fat / 78)}%</h3>
        </div>

        <div className="secondary">
          <h3>Dietary Fiber {vals.nf_dietary_fiber}g</h3>
          <h3>{rVals(vals.nf_total_carbohydrate / 275)}%</h3>
        </div>

        <div className="secondary">
          <h3>Sugars {vals.nf_sugars}g</h3>
        </div>
        <div className="protein">
          <h4>Protein {vals.nf_protein}g</h4>
          <h4 id="protein"> </h4>
        </div>
        {/* <!-- BOTTOM SECTION --> */}
        {/* <div className="vitA">
          <h3>Vitamin A</h3>
          <h3>%</h3>
        </div>
        <div className="vitC">
          <h3>Vitamin C</h3>
          <h3>%</h3>
        </div>
        <div className="calcium">
          <h3>Calcium</h3>
          <h3>%</h3>
        </div>
        <div className="iron">
          <h3>Iron</h3>
          <h3>%</h3>
        </div> */}
        <div className="potassium">
          <h3>Potassium {vals.nf_potassium}</h3>
          <h3>%</h3>
        </div>
        <div>
          <h6>*Percent Daily Values are based on a 2,000 calorie diet.</h6>
        </div>
      </div>
      {/* <button className="down-button" onClick={handleClick}>
        DOWN
      </button> */}
      {scroll ? (
        <ion-icon
          style={style}
          name="arrow-up-circle-outline"
          id="arrow"
          onClick={handleClick}
        ></ion-icon>
      ) : (
        <ion-icon
          style={style}
          name="arrow-down-circle-outline"
          id="arrow"
          onClick={handleClick}
        ></ion-icon>
      )}
    </section>
  )
}

export default NutritionalLabel
