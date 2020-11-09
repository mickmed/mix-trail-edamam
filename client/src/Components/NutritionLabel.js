import React, { useState, useEffect } from "react"
import "./NutritionLabel.scss"

const NutritionalLabel = ({
  nutrientVals,
  ingredientNutrientVals,
  servingsPerContainer,
  setServingsPerContainer,
}) => {
  const [scroll, setScroll] = useState(false)
  // const [btnTxt, setBtnTxt] = useState("down")
  const [style, setStyle] = useState({})
  const labelRef = React.createRef()
  const [vals, setVals] = useState({})
  const [background, setBackground] = useState("rgba(251,251,245,1)")

  useEffect(() => {
    if (labelRef.current.clientHeight >= labelRef.current.scrollHeight - 50) {
      setStyle({ display: "none" })
    }
  }, [scroll])

  useEffect(() => {
   
    const values = {}
    if (Object.keys(ingredientNutrientVals).length > 0) {
      for (let key in ingredientNutrientVals) {
        values[key] = Math.round(ingredientNutrientVals[key])
        setBackground("rgba(241,255,245,1)")
      }
      
    } else {
      for (let key in nutrientVals) {
        values[key] = Math.round(nutrientVals[key])
        setBackground("rgba(251,251,245,1)")
      }
    }

    setVals(values)
    
  }, [nutrientVals, ingredientNutrientVals])

  // const values = {}
  // for (let key in nutrientVals) {
  //   vals[key] = Math.round(nutrientVals[key])
  // }

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
    return isNaN(val) ? "" : Math.round(val * 100)
  }

  const divideByServingSize = (value) => {

    return value && (Math.round(value/servingsPerContainer))
    

  }
  // this nutrition label was originaly part of my final project at PerScholas, Nov 2018

  return (
    <section className="nutrition-label">
      <div
        className="nutrition-facts"
        style={{ background: background }}
        ref={labelRef}
      >
        {/* <!-- TOP SECTION --> */}

        <h1>Nutrition Facts</h1>
        <div className="serving">
          <span >
            <h6>Serving Size</h6>
            <h6>
             1
            </h6>
          </span>
          <span className="serving-per-container-wrapper">
            <h6>Servings Per Container</h6>
            <h6>
            <input
                className="serving-per-container"
                type="number"
                min="1"
                onChange={(e)=> setServingsPerContainer(e.target.value)}
                value={servingsPerContainer}
              ></input></h6>
          </span>
        </div>
        {/* <!-- TOP SUB HEADING --> */}
        <p className="amnt-per-serving">Amount Per Serving</p>
        <div className="primary">
          <h3>Calories {(divideByServingSize(vals.nf_calories))}</h3>

          <h3>Calories from Fat {divideByServingSize(vals.nf_total_fat * 9 || "")}</h3>
        </div>

        <p className="perc-daily-val">% Daily Value*</p>

        <div className="primary">
          <h4>Total Fat {divideByServingSize(vals.nf_total_fat)}g</h4>

          <div>
            <h3>{divideByServingSize(rVals(vals.nf_total_fat / 78))}%</h3>
          </div>
        </div>

        <div className="secondary">
          <h3>Saturated Fat {divideByServingSize(vals.nf_saturated_fat)}g</h3>

          <h3>{divideByServingSize(rVals(vals.nf_saturated_fat / 20))}%</h3>
        </div>

        <div className="secondary">
          <h3>Trans Fat</h3>
        </div>
        {/* </div> */}
        <div className="primary chol">
          <h4>Cholesterol {divideByServingSize(vals.nf_cholesterol)}mg</h4>
          <h3>{divideByServingSize(rVals(vals.nf_cholesterol / 300))}%</h3>
        </div>

        <div className="primary">
          <h4>Sodium {divideByServingSize(vals.nf_sodium)}mg</h4>
          <h3>{divideByServingSize(rVals(vals.nf_sodium / 2300))}%</h3>
        </div>

        <div className="primary">
          <h4>Total Carbohydrate {divideByServingSize(vals.nf_total_carbohydrate)}g</h4>
          <h3>{divideByServingSize(rVals(vals.nf_total_fat / 78))}%</h3>
        </div>

        <div className="secondary">
          <h3>Dietary Fiber {divideByServingSize(vals.nf_dietary_fiber)}g</h3>
          <h3>{divideByServingSize(rVals(vals.nf_total_carbohydrate / 275))}%</h3>
        </div>

        <div className="secondary">
          <h3>Sugars {divideByServingSize(vals.nf_sugars/servingsPerContainer)}g</h3>
        </div>
        <div className="protein">
          <h4>Protein {divideByServingSize(vals.nf_protein)}g</h4>
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
          <h3>Potassium {divideByServingSize(vals.nf_potassium)}</h3>
          {/* {console.log((vals.nf_potassium / 4700) * 100)} */}
          <h3>{divideByServingSize(Math.round((vals.nf_potassium / 4700) * 100) || "")}%</h3>
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
